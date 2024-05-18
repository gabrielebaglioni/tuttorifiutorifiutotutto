import { Injectable } from '@angular/core';
import { of } from 'rxjs';
import { delay } from 'rxjs/operators';
import {CatalogItem, Item} from './store.service'; // Importa l'interfaccia CatalogItem
import { PreloadService } from './preload.service';

@Injectable({
  providedIn: 'root'
})
export class DataService {
  private catalogData: CatalogItem[] = [
    {
      id: 'nk-0014',
      name: 'Arcadia',
      category: 'Tech/Gaming',
      year: '2023-2024',
      items: [
        { id: 'item1', url: 'https://media.gqitalia.it/photos/5d60131f1c0b03000814bc43/1:1/w_1657,h_1657,c_limit/GettyImages-845711818.jpg' },
        { id: 'item2', url: 'https://upload.wikimedia.org/wikipedia/commons/thumb/8/8a/Banana-Single.jpg/872px-Banana-Single.jpg' },
        { id: 'item3', url: 'assets/img/photo_5927090164977484088_y.jpg' }
      ]
    },
    {
      id: 'nk-0015',
      name: 'Arcadia',
      category: 'Tech/Gaming',
      year: '2023-2024',
      items: [
        { id: 'item3', url: 'https://blog.giallozafferano.it/peperonciniedintorni/wp-content/uploads/2015/12/cachi-o-kaki-Diospyros-kaki_Frutti.jpg' },
        { id: 'item4', url: 'assets/video/INTERMEZZO.mp4' },
      ]
    }
  ];

  constructor(private preloadService: PreloadService) {}

  getCatalogMetadata() {
    const metadata = this.catalogData.map(({ id, name, category, year, items }) => ({
      id, name, category, year, items: items.map(({ id, url }: { id: string; url: string }) => ({ id, url }))
    }));
    return of(metadata).pipe(); // Simulated delay
  }

  getItemDetails(catalogId: string, itemId: string) {
    const catalog = this.catalogData.find(catalog => catalog.id === catalogId);
    const item = catalog?.items.find((item: any) => item.id === itemId);
    return of(item).pipe(); // Simulated delay
  }

  preloadItems() {
    this.catalogData.forEach(catalog => {
      catalog.items.forEach((item: any) => {
        this.preloadService.preload(item.url).catch(err => console.error(`Failed to preload ${item.url}:`, err));
      });
    });
  }
}
