import { Component, Input, OnInit } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CatalogItem, StoreService } from '../../../../shared/service/store.service';
import {AsyncPipe, CommonModule} from '@angular/common';
import {SelectedImageDisplayComponent} from "../selected-image-display/selected-image-display.component";
import {ItemPreviewComponent} from "../item-preview/item-preview.component";

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  standalone: true,
  imports: [
    AsyncPipe,
    SelectedImageDisplayComponent,
    ItemPreviewComponent,
    CommonModule,

  ],
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent implements OnInit {
  @Input() item!: CatalogItem;
  isExpanded$: Observable<boolean> | undefined;

  constructor(private storeService: StoreService) {}

  ngOnInit(): void {
    this.isExpanded$ = this.storeService.expandedItems$.pipe(
      map(items => items[this.item.id])
    );
  }

  handleToggle(): void {
    this.storeService.toggleItem(this.item.id);
  }

  handleItemClick(itemId: string): void {
    const selectedItem = this.item.items.find(_item => _item.id === itemId);
    if (selectedItem) {
      this.storeService.setActiveItem({ item: selectedItem, catalog: this.item });
    }
  }
}
