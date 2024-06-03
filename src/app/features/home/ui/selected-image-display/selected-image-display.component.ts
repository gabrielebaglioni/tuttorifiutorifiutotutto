import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef } from '@angular/core';
import { map, Observable } from 'rxjs';
import { CatalogItem, Item, StoreService } from '../../../../shared/service/store.service';
import { AsyncPipe, CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { VariableContentComponent } from '../variable-content/variable-content.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { SubscriberComponent } from '../../../../shared/components/subscriber/subscriber.component';
import { HighlightService } from '../../../../shared/utils/highlightService';
import { faDownload, faPlay } from '@fortawesome/free-solid-svg-icons';
import { FaIconComponent, FaIconLibrary } from '@fortawesome/angular-fontawesome';
import { PdfPlaceholderComponent } from '../pdf-placeholder/pdf-placeholder.component';

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
    FaIconComponent,
    PdfPlaceholderComponent
  ],
  templateUrl: './selected-image-display.component.html',
  styleUrls: ['./selected-image-display.component.css']
})
export class SelectedImageDisplayComponent extends SubscriberComponent implements OnInit, AfterViewInit {

  @ViewChild('highlightText') highlightText!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;

  selectedItem$: Observable<Item | null>;
  parentCatalog$: Observable<CatalogItem | null>;
  safeUrl: SafeResourceUrl | null = null;
  previewUrl: SafeResourceUrl | null = null;
  selectedItemIndex$: Observable<number | null>;
  faDownload = faDownload;
  faPlay = faPlay;
  isMobile: boolean;
  pdfUrl: string | null = null;
  pdfPreviewUrl: string | null = null;
  audioPlaying: boolean = false;
  videoStarted: boolean = false; // Variabile per controllare se il video è iniziato

  constructor(
    private storeService: StoreService,
    private sanitizer: DomSanitizer,
    private highlightService: HighlightService,
    private cdr: ChangeDetectorRef,
    private library: FaIconLibrary
  ) {
    super();
    this.selectedItem$ = this.storeService.activeItem$.pipe(map(active => active.item));
    this.selectedItemIndex$ = this.storeService.activeItem$.pipe(map(active => active.index));
    this.parentCatalog$ = this.storeService.activeItem$.pipe(map(active => active.catalog));

    this.library.addIcons(faDownload, faPlay);

    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);
  }

  ngOnInit(): void {
    this.selectedItem$.subscribe(item => {
      if (item) {
        this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.url);
        this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(item.previewUrl);
        this.pdfUrl = item.url;
        this.pdfPreviewUrl = item.previewUrl;
        if (this.determineFileType(item.url) === 'audio') {
          this.audioPlaying = false;
          setTimeout(() => this.audioPlaying = true, 0);
        }
        this.videoStarted = false; // Reset videoStarted quando cambia l'elemento
      } else {
        this.safeUrl = null;
        this.previewUrl = null;
        this.pdfUrl = null;
        this.pdfPreviewUrl = null;
        this.audioPlaying = false;
        this.videoStarted = false;
      }

      this.cdr.detectChanges();
    });
  }

  ngAfterViewInit(): void {
    if (this.highlightText) {
      this.highlightService.addHighlightEffect(this.highlightText.nativeElement);
    }
  }

  playVideo(): void {
    this.videoStarted = true; // Mostra il video e nasconde l'immagine di anteprima
    const videoElement = this.videoPlayer.nativeElement;
    videoElement.play();
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
