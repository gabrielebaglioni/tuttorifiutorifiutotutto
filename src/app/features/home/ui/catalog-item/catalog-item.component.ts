import {
  Component,
  Input,
  OnInit,
  computed,
  effect,
  inject,
  Injector,
  runInInjectionContext,
  signal,
  Signal
} from '@angular/core';
import { CatalogItem, StoreService } from '../../../../shared/service/store.service';
import { CommonModule } from '@angular/common';
import { SelectedImageDisplayComponent } from '../selected-image-display/selected-image-display.component';
import { ItemPreviewComponent } from '../item-preview/item-preview.component';
import { SubscriberComponent } from "../../../../shared/components/subscriber/subscriber.component";
import { map, Observable } from "rxjs";

@Component({
  selector: 'app-catalog-item',
  templateUrl: './catalog-item.component.html',
  standalone: true,
  imports: [
    CommonModule,
    SelectedImageDisplayComponent,
    ItemPreviewComponent,
  ],
  styleUrls: ['./catalog-item.component.css']
})
export class CatalogItemComponent extends SubscriberComponent implements OnInit {
  @Input() item!: CatalogItem;
  isExpanded$: Observable<boolean> | undefined;
  isExpanded = false;
  isLoading$: Signal<boolean>;

  private storeService = inject(StoreService);
  private injector = inject(Injector);

  constructor() {
    super();
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.storeService.activeItem().catalog?.id === this.item.id) {
          smoothScrollToTop();
        }
      }, { allowSignalWrites: true });
    });
    this.isLoading$ = this.storeService.isLoading$();
  }

  ngOnInit(): void {
    this.isExpanded$ = this.storeService.expandedItems$.pipe(
      map(items => items[this.item.id])
    );
  }

  handleToggle(): void {
    this.isExpanded = !this.isExpanded;
    this.storeService.toggleItem(this.item.id);
  }

  handleItemClick(itemId: string): void {
    const activeItem = this.storeService.getActiveItem();
    if (activeItem.item?.id === itemId && activeItem.catalog?.id === this.item.id) {
      return; // Do not reload the item if it is already active
    }
    this.resetViewportAndLoadItem(this.item.id, itemId);
  }

  resetViewportAndLoadItem(catalogId: string, itemId: string): void {
    // Reset the viewport
    smoothScrollToTop();

    // Delay the item loading to ensure viewport reset
    setTimeout(() => {
      this.storeService.loadItemDetails(catalogId, itemId);
    }, 100); // Adjust the delay as needed
  }

  getPreviewImageUrl(url: string): string | undefined {
    const preloadedImage = this.storeService.getPreloadedImage(url);
    return preloadedImage ? preloadedImage.src : undefined;
  }
}

// Funzione di utilità per lo scrolling fluido
function smoothScrollToTop() {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  });
}
