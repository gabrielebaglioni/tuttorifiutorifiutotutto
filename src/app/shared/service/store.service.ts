import { Injectable, signal, computed } from '@angular/core';
import { DataService } from './dataService';
import { BehaviorSubject } from 'rxjs';
import { PreloadService } from './preload.service';
import {smoothScrollToTop} from "../utils/smoothScrollToTop";

export interface Item {
  id: string;
  url: string;
  previewUrl: string;
  alt?: string;
  description?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  year: string;
  items: Item[];
}

export interface ActiveItem {
  item: Item | null;
  catalog: CatalogItem | null;
  index: number | null;
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  catalogItems = signal<CatalogItem[]>([]);
  activeItem = signal<ActiveItem>({ item: null, catalog: null, index: null });
  loading = signal<boolean>(false);

  private allExpandedSubject = new BehaviorSubject<boolean>(false);
  private expandedItemsSubject = new BehaviorSubject<{ [key: string]: boolean }>({});

  allExpanded$ = this.allExpandedSubject.asObservable();
  expandedItems$ = this.expandedItemsSubject.asObservable();

  constructor(private dataService: DataService, private preloadService: PreloadService) {
    this.loadCatalogMetadata();
  }

  private loadCatalogMetadata() {
    const metadata = this.dataService.getCatalogMetadata();
    this.catalogItems.set(metadata);
  }

  loadItemDetails(catalogId: string, itemId: string) {
    const item = this.dataService.getItemDetails(catalogId, itemId);
    const catalogItems = this.catalogItems();
    const catalog = catalogItems.find(c => c.id === catalogId);
    if (catalog && item) {
      const itemIndex = catalog.items.findIndex(i => i.id === itemId);
      catalog.items = catalog.items.map(i => i.id === itemId ? item : i);
      this.catalogItems.set(catalogItems);
      this.setActiveItem({ item, catalog, index: itemIndex });
    }
  }

  setActiveItem(activeItem: ActiveItem) {
    const currentActiveItem = this.activeItem();
    if (
      currentActiveItem.item?.id === activeItem.item?.id &&
      currentActiveItem.catalog?.id === activeItem.catalog?.id
    ) {
      return; // Do not set the active item if it is already active
    }
    this.activeItem.set(activeItem);
  }

  getActiveItem() {

    smoothScrollToTop().then(() => {console.log('smoothScrollToTop activeItem get')});
    return this.activeItem();
  }

  toggleItem(id: string) {
    const expandedItems = this.expandedItemsSubject.value;
    const isExpanded = !expandedItems[id];
    expandedItems[id] = isExpanded;
    this.expandedItemsSubject.next(expandedItems);

    const allExpanded = Object.values(expandedItems).every(expanded => expanded);
    this.allExpandedSubject.next(allExpanded);

    if (isExpanded) {
      const catalog = this.catalogItems().find(catalog => catalog.id === id);
      if (catalog && catalog.items.length > 0) {
        this.loading.set(true);
        this.dataService.preloadImagesForCatalog(id).then(() => {
          this.loadItemDetails(id, catalog.items[0].id);
          this.loading.set(false);
        });
      }
    } else {
      const activeItem = this.activeItem();
      if (activeItem.catalog && activeItem.catalog.id === id) {
        this.activeItem.set({ item: null, catalog: null, index: null });
      }
    }
  }

  toggleAllExpand() {
    const allExpanded = !this.allExpandedSubject.value;
    this.allExpandedSubject.next(allExpanded);

    const expandedItems = this.expandedItemsSubject.value;
    if (allExpanded) {
      Object.keys(expandedItems).forEach(key => expandedItems[key] = true);

      // Set the active item to the first item of the first catalog
      const catalogItems = this.catalogItems();
      if (catalogItems.length > 0 && catalogItems[0].items.length > 0) {
        this.setActiveItem({
          catalog: catalogItems[0],
          item: catalogItems[0].items[0],
          index: 0
        });
      }

    } else {
      Object.keys(expandedItems).forEach(key => expandedItems[key] = false);
      this.activeItem.set({ item: null, catalog: null, index: null });
    }
    this.expandedItemsSubject.next(expandedItems);
  }

  closeAll() {
    const expandedItems = this.expandedItemsSubject.value;
    Object.keys(expandedItems).forEach(key => expandedItems[key] = false);
    this.expandedItemsSubject.next(expandedItems);
    this.allExpandedSubject.next(false);
    this.activeItem.set({ item: null, catalog: null, index: null });
  }

  getPreloadedImage(url: string): HTMLImageElement | undefined {
    return this.preloadService.getFromCache(url);
  }

  isLoading$() {
    return computed(() => this.loading());
  }
}
