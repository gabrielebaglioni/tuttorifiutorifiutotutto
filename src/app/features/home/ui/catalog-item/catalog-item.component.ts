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
  Signal, OnChanges, AfterViewInit
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
export class CatalogItemComponent extends SubscriberComponent implements OnInit,OnChanges,AfterViewInit {
  @Input() item!: CatalogItem;
  isExpanded$: Observable<boolean> | undefined;
  isExpanded = false;
  isLoading$: Signal<boolean>;
  private isScrolling = false;

  private storeService = inject(StoreService);
  private injector = inject(Injector);

  constructor() {
    super();
    runInInjectionContext(this.injector, () => {
      effect(() => {
        if (this.storeService.activeItem().catalog?.id === this.item.id) {

        }
      }, { allowSignalWrites: true });
    });
    this.isLoading$ = this.storeService.isLoading$();
  }

  ngOnInit(): void {
    this.isExpanded$ = this.storeService.expandedItems$.pipe(
      map(items => items[this.item.id])
    );
    // Add a listener for the 'touchmove' event
    fromEvent(document, 'touchmove').subscribe(() => this.isScrolling = true);
    // Add a listener for the 'touchend' event
    fromEvent(document, 'touchend').subscribe(() => {
      // After a brief delay, set isScrolling to false
      setTimeout(() => this.isScrolling = false, 200);
    });
  }
  ngOnChanges(): void {
    if (this.storeService.activeItem().catalog?.id === this.item.id) {
      smoothScrollToTop().then(() => {console.log('smoothScrollToTop On changes')});
    }
  }
ngAfterViewInit() {
  if (this.storeService.activeItem().catalog?.id === this.item.id) {
    smoothScrollToTop().then(() => {console.log('smoothScrollToTop afterviewinit')});
  }
}

  handleToggle(): void {
    if (!this.isScrolling) {
      this.isExpanded = !this.isExpanded;
      this.storeService.toggleItem(this.item.id);
    }
  }

  handleItemClick(itemId: string): void {
      const activeItem = this.storeService.getActiveItem();
      if (activeItem.item?.id !== itemId || activeItem.catalog?.id !== this.item.id) {
        this.storeService.loadItemDetails(this.item.id, itemId);
      }else {
        smoothScrollToTop().then(() => {console.log('smoothScrollToTop activeItem same item')});
      }
  }




  getPreviewImageUrl(url: string): string | undefined {
    const preloadedImage = this.storeService.getPreloadedImage(url);
    return preloadedImage ? preloadedImage.src : undefined;
  }
}
