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
import {debounceTime, fromEvent, map, Observable} from "rxjs";
import { smoothScrollToTop } from '../../../../shared/utils/smoothScrollToTop';
import {SubscriberComponent} from "../../../../shared/components/subscriber/subscriber.component";

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
  private clickDebounceTime = 200; // Tempo di ritardo in millisecondi
  private lastTouchTime = 0;
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

    // Aggiungi un listener per l'evento 'touchstart'
    fromEvent(document, 'touchstart').pipe(
      debounceTime(this.clickDebounceTime),
      map(() => new Date().getTime())
    ).subscribe(time => this.lastTouchTime = time);
  }

  handleToggle(): void {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTouchTime > this.clickDebounceTime) {
      this.isExpanded = !this.isExpanded;
      this.storeService.toggleItem(this.item.id);
    }
  }

  handleItemClick(itemId: string): void {
    const currentTime = new Date().getTime();
    if (currentTime - this.lastTouchTime > this.clickDebounceTime) {
      this.resetViewportAndLoadItem(this.item.id, itemId);
      const activeItem = this.storeService.getActiveItem();
      if (activeItem.item?.id !== itemId || activeItem.catalog?.id !== this.item.id) {
        this.storeService.loadItemDetails(this.item.id, itemId);
      }
    }
  }

  resetViewportAndLoadItem(catalogId: string, itemId: string): void {
    // Reset the viewport and load the item simultaneously
    smoothScrollToTop();
  }

  getPreviewImageUrl(url: string): string | undefined {
    const preloadedImage = this.storeService.getPreloadedImage(url);
    return preloadedImage ? preloadedImage.src : undefined;
  }
}
