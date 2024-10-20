import {
  AfterViewInit,
  Component,
  effect,
  inject,
  Injector,
  Input,
  OnChanges,
  OnDestroy,
  OnInit,
  runInInjectionContext,
  Signal
} from '@angular/core';
import { CommonModule } from '@angular/common';
import { SelectedImageDisplayComponent } from '../selected-image-display/selected-image-display.component';
import { ItemPreviewComponent } from '../item-preview/item-preview.component';
import { debounceTime, fromEvent, map, Observable, Subject, Subscription } from 'rxjs';
import { smoothScrollToTop } from '../../../../shared/utils/smoothScrollToTop';
import { SubscriberComponent } from '../../../../shared/components/subscriber/subscriber.component';

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
export class CatalogItemComponent extends SubscriberComponent  {
  

  constructor() {
    super();
   
  }


}
