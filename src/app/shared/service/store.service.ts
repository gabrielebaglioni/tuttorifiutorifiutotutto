import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { DataService } from './dataService';

export interface Item {
  id: string;
  url: string;
  previewUrl: string;
  alt?: string;
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
}

@Injectable({
  providedIn: 'root'
})
export class StoreService {
  private catalogItemsSubject = new BehaviorSubject<CatalogItem[]>([]);
  private allExpandedSubject = new BehaviorSubject<boolean>(false);
  private expandedItemsSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  private activeItemSubject = new BehaviorSubject<ActiveItem>({ item: null, catalog: null });

  catalogItems$ = this.catalogItemsSubject.asObservable();
  allExpanded$ = this.allExpandedSubject.asObservable();
  expandedItems$ = this.expandedItemsSubject.asObservable();
  activeItem$ = this.activeItemSubject.asObservable();

  constructor(private dataService: DataService) {
    this.loadCatalogMetadata();
  }

  private loadCatalogMetadata() {
    this.dataService.getCatalogMetadata().subscribe((metadata: CatalogItem[]) => {
      this.catalogItemsSubject.next(metadata);
      this.dataService.preloadItems(); // Preload items after metadata is loaded
    });
  }

  loadItemDetails(catalogId: string, itemId: string) {
    this.dataService.getItemDetails(catalogId, itemId).subscribe((item: any) => {
      const catalogItems = this.catalogItemsSubject.value;
      const catalog = catalogItems.find(c => c.id === catalogId);
      if (catalog && item) {
        catalog.items = catalog.items.map(i => i.id === itemId ? item : i);
        this.catalogItemsSubject.next(catalogItems);
        this.setActiveItem({ item, catalog });
      }
    });
  }

  setActiveItem(activeItem: ActiveItem) {
    const currentActiveItem = this.activeItemSubject.value;
    if (
      currentActiveItem.item?.id === activeItem.item?.id &&
      currentActiveItem.catalog?.id === activeItem.catalog?.id
    ) {
      return; // Do not set the active item if it is already active
    }
    this.activeItemSubject.next(activeItem);
  }

  getActiveItem() {
    return this.activeItemSubject.value;
  }

  getActiveItem$() {
    return this.activeItemSubject.asObservable();
  }

  toggleItem(id: string) {
    const expandedItems = this.expandedItemsSubject.value;

    // Close all items before opening the selected one
    Object.keys(expandedItems).forEach(key => expandedItems[key] = false);

    expandedItems[id] = !expandedItems[id];
    this.expandedItemsSubject.next(expandedItems);

    if (expandedItems[id]) {
      const catalog = this.catalogItemsSubject.value.find(catalog => catalog.id === id);
      if (catalog && catalog.items.length > 0) {
        this.loadItemDetails(id, catalog.items[0].id);
      }
    } else {
      const activeItem = this.activeItemSubject.value;
      if (activeItem.catalog && activeItem.catalog.id === id) {
        this.activeItemSubject.next({ item: null, catalog: null });
      }
    }
  }

  closeAll() {
    const expandedItems = this.expandedItemsSubject.value;
    Object.keys(expandedItems).forEach(key => expandedItems[key] = false);
    this.expandedItemsSubject.next(expandedItems);
    this.activeItemSubject.next({ item: null, catalog: null });
  }

  toggleAllExpand() {
    const allExpanded = !this.allExpandedSubject.value;
    this.allExpandedSubject.next(allExpanded);

    const expandedItems = this.expandedItemsSubject.value;
    if (allExpanded) {
      // Expand all items
      Object.keys(expandedItems).forEach(key => expandedItems[key] = true);
      const catalog = this.catalogItemsSubject.value;
      if (catalog.length > 0) {
        this.loadItemDetails(catalog[0].id, catalog[0].items[0].id);
      }
    } else {
      // Collapse all items
      Object.keys(expandedItems).forEach(key => expandedItems[key] = false);
      this.activeItemSubject.next({ item: null, catalog: null });
    }
    this.expandedItemsSubject.next(expandedItems);
  }
}
