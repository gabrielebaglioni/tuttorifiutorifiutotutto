/*
import {computed, Injectable, signal} from '@angular/core';
import {DataService} from './dataService';
import {CatalogItem, Item, PreloadService} from './preload.service';
import {BehaviorSubject} from 'rxjs';

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

  private async loadCatalogMetadata() {
    const metadata = await this.preloadService.getAllCatalogs();
    if (metadata.length > 0) {
      this.catalogItems.set(metadata);
    } else {
      await this.dataService.syncCatalogs();
      const newMetadata = this.dataService.getCatalogMetadata();
      for (const catalog of newMetadata) {
        await this.preloadService.saveCatalog(catalog);
      }
      this.catalogItems.set(newMetadata);
    }
  }

  async loadItemDetails(catalogId: string, itemId: string) {
    const item = this.dataService.getItemDetails(catalogId, itemId);
    if (item) {
      const catalogItems = this.catalogItems();
      const catalog = catalogItems.find(c => c.id === catalogId);
      if (catalog) {
        const itemIndex = catalog.items.findIndex(i => i.id === itemId);
        catalog.items = catalog.items.map(i => i.id === itemId ? item : i);
        this.catalogItems.set(catalogItems);

        const cachedData = await this.preloadService.getFromCache(item.url);
        if (cachedData) {
          this.setActiveItem({ item, catalog, index: itemIndex });
        } else {
          const dbData = await this.preloadService.getFromIndexedDB(item.url);
          if (dbData) {
            this.setActiveItem({ item, catalog, index: itemIndex });
          } else {
            throw new Error('Data not found in cache or IndexedDB');
          }
        }
      }
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
    return this.activeItem();
  }

  async toggleItem(id: string) {
    const expandedItems = this.expandedItemsSubject.value;
    const isExpanded = !expandedItems[id];
    expandedItems[id] = isExpanded;
    this.expandedItemsSubject.next(expandedItems);

    const allExpanded = Object.values(expandedItems).every(expanded => expanded);
    this.allExpandedSubject.next(allExpanded);

    if (isExpanded) {
      const catalog = this.catalogItems().find(catalog => catalog.id === id);
      if (catalog && catalog.items.length > 0) {
        this.setLoading(true);

        // Check if all preview URLs are preloaded
        const preloadPromises = catalog.items.map(async item => {
          const cachedData = await this.preloadService.getFromCache(item.previewUrl);
          return cachedData || await this.preloadService.getFromIndexedDB(item.previewUrl);
        });

        const preloadResults = await Promise.all(preloadPromises);
        const allPreloaded = preloadResults.every(data => data !== undefined);

        if (!allPreloaded) {
          await this.dataService.preloadImagesForCatalog(id);
        }

        await this.loadItemDetails(id, catalog.items[0].id);
        this.setLoading(false);
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

  async getPreloadedImage(url: string): Promise<string | undefined> {
    return await this.preloadService.getFromCache(url) || await this.preloadService.getFromIndexedDB(url);
  }

  isLoading$() {
    return computed(() => this.loading());
  }

  setLoading(isLoading: boolean) {
    this.loading.set(isLoading);
  }
}
*/
