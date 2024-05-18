import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

export interface Item {
  id: string;
  url: string;
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
  private catalogItemsSubject = new BehaviorSubject<CatalogItem[]>([
    {
      id: 'nk-0014',
      name: 'Arcadia',
      category: 'Tech/Gaming',
      year: '2023-2024',
      items: [
        { id: 'item1', url: 'https://media.gqitalia.it/photos/5d60131f1c0b03000814bc43/1:1/w_1657,h_1657,c_limit/GettyImages-845711818.jpg' },
        { id: 'item2', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/872px-Banana-Single.jpg' },
      ]
    },
    {
      id: 'nk-0015',
      name: 'Arcadia',
      category: 'Tech/Gaming',
      year: '2023-2024',
      items: [
        { id: 'item3', url: 'https://blog.giallozafferano.it/peperonciniedintorni/wp-content/uploads/2015/12/cachi-o-kaki-Diospyros-kaki_Frutti.jpg' },
        { id: 'item4', url: 'https://www.ortodacoltivare.it/wp-content/uploads/2018/03/cachi.jpg' },
      ]
    }
  ]);

  private allExpandedSubject = new BehaviorSubject<boolean>(false);
  private expandedItemsSubject = new BehaviorSubject<{ [key: string]: boolean }>({});
  private activeItemSubject = new BehaviorSubject<ActiveItem>({ item: null, catalog: null });

  catalogItems$ = this.catalogItemsSubject.asObservable();
  allExpanded$ = this.allExpandedSubject.asObservable();
  expandedItems$ = this.expandedItemsSubject.asObservable();
  activeItem$ = this.activeItemSubject.asObservable();

  toggleItem(id: string) {
    const expandedItems = this.expandedItemsSubject.value;
    expandedItems[id] = !expandedItems[id];
    this.expandedItemsSubject.next(expandedItems);

    if (expandedItems[id]) {
      const catalog = this.catalogItemsSubject.value.find(catalog => catalog.id === id);
      if (catalog && catalog.items.length > 0) {
        this.activeItemSubject.next({ item: catalog.items[0], catalog });
      }
    } else {
      this.activeItemSubject.next({ item: null, catalog: null });
    }
  }

  toggleAllExpand() {
    const allExpanded = !this.allExpandedSubject.value;
    this.allExpandedSubject.next(allExpanded);

    const expandedItems = this.expandedItemsSubject.value;
    const newState = !Object.values(expandedItems).every(Boolean);
    for (let key in expandedItems) {
      expandedItems[key] = newState;
    }
    this.expandedItemsSubject.next(expandedItems);
  }

  setActiveItem(activeItem: ActiveItem) {
    this.activeItemSubject.next(activeItem);
  }
}
