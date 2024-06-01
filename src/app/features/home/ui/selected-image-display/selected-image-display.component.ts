import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { map, Observable } from "rxjs";
import { CatalogItem, Item, StoreService } from "../../../../shared/service/store.service";
import { AsyncPipe, CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from "@angular/common";
import { VariableContentComponent } from "../variable-content/variable-content.component";
import { DomSanitizer, SafeResourceUrl } from "@angular/platform-browser";
import { SubscriberComponent } from "../../../../shared/components/subscriber/subscriber.component";
import { HighlightService } from "../../../../shared/utils/highlightService";

@Component({
  selector: 'app-selected-image-display',
  standalone: true,
  imports: [
    AsyncPipe,
    NgSwitch,
    NgSwitchCase,
    NgSwitchDefault,
    VariableContentComponent,
    CommonModule,
  ],
  templateUrl: './selected-image-display.component.html',
  styleUrls: ['./selected-image-display.component.css']
})
export class SelectedImageDisplayComponent extends SubscriberComponent implements OnInit, AfterViewInit {

  @ViewChild('highlightText') highlightText!: ElementRef;

  selectedItem$: Observable<Item | null>;
  parentCatalog$: Observable<CatalogItem | null>;
  safeUrl: SafeResourceUrl | null = null;
  previewUrl: SafeResourceUrl | null = null;

  constructor(
    private storeService: StoreService,
    private sanitizer: DomSanitizer,
    private highlightService: HighlightService,
    private cdr: ChangeDetectorRef
  ) {
    super();
    this.selectedItem$ = this.storeService.activeItem$.pipe(map(active => active.item));
    this.parentCatalog$ = this.storeService.activeItem$.pipe(map(active => active.catalog));
  }

  ngOnInit(): void {
    this.selectedItem$.subscribe(item => {
      if (item) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.url);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.previewUrl);
      } else {
        this.safeUrl = null;
        this.previewUrl = null;
      }
      // Detect changes to ensure ViewChild is available
      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit() {
    if (this.highlightText) {
      this.highlightService.addHighlightEffect(this.highlightText.nativeElement);
    }
  }

  determineFileType(url: string): string {
    const extension = url.split('.').pop()?.toLowerCase();
    if (['mp4', 'webm'].includes(extension!)) {
      return 'video';
    } else if (['mp3', 'wav', 'ogg'].includes(extension!)) {
      return 'audio';
    } else if (['pdf'].includes(extension!)) {
      return 'pdf';
    } else if (['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
      return 'image';
    }
    return 'unknown';
  }
}
