import { AfterViewInit, Component, ElementRef, OnInit, ViewChild, ChangeDetectorRef, computed, effect, inject, Injector, runInInjectionContext, signal } from '@angular/core';
import { ActiveItem, CatalogItem, Item, StoreService } from '../../../../shared/service/store.service';
import { AsyncPipe, CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault } from '@angular/common';
import { VariableContentComponent } from '../variable-content/variable-content.component';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
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
export class SelectedImageDisplayComponent implements OnInit, AfterViewInit {
  @ViewChild('highlightText') highlightText!: ElementRef;
  @ViewChild('videoPlayer') videoPlayer!: ElementRef<HTMLVideoElement>;
  @ViewChild('imageElement') imageElement!: ElementRef<HTMLImageElement>;

  selectedItem = signal<Item | null>(null);
  parentCatalog = signal<CatalogItem | null>(null);
  safeUrl = signal<SafeResourceUrl | null>(null);
  previewUrl = signal<SafeResourceUrl | null>(null);
  selectedItemIndex = signal<number | null>(null);
  faDownload = faDownload;
  faPlay = faPlay;
  isMobile: boolean;
  pdfUrl = signal<string | null>(null);
  pdfPreviewUrl = signal<string | null>(null);
  audioPlaying = signal(false);
  videoStarted = signal(false);

  private storeService = inject(StoreService);
  private sanitizer = inject(DomSanitizer);
  private highlightService = inject(HighlightService);
  private cdr = inject(ChangeDetectorRef);
  private library = inject(FaIconLibrary);
  private injector = inject(Injector);

  constructor() {
    this.library.addIcons(faDownload, faPlay);
    this.isMobile = /iPhone|iPad|iPod|Android/i.test(navigator.userAgent);

    runInInjectionContext(this.injector, () => {
      effect(() => {
        const activeItem = this.storeService.activeItem();
        this.updateSignals(activeItem);
      }, { allowSignalWrites: true });
    });
  }

  private updateSignals(activeItem: ActiveItem) {
    this.selectedItem.set(activeItem.item);
    this.parentCatalog.set(activeItem.catalog);
    this.selectedItemIndex.set(activeItem.index);

    if (activeItem.item) {
      this.safeUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(activeItem.item.url));
      this.previewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(activeItem.item.previewUrl));
      this.pdfUrl.set(activeItem.item.url);
      this.pdfPreviewUrl.set(activeItem.item.previewUrl);
      if (this.determineFileType(activeItem.item.url) === 'audio') {
        this.audioPlaying.set(false);
        setTimeout(() => this.audioPlaying.set(true), 0);
      }
      this.videoStarted.set(false);
    } else {
      this.safeUrl.set(null);
      this.previewUrl.set(null);
      this.pdfUrl.set(null);
      this.pdfPreviewUrl.set(null);
      this.audioPlaying.set(false);
      this.videoStarted.set(false);
    }

    this.cdr.detectChanges();
  }

  ngOnInit(): void {}

  ngAfterViewInit(): void {
    if (this.highlightText) {
      this.highlightService.addHighlightEffect(this.highlightText.nativeElement);
    }
  }

  playVideo(): void {
    this.videoStarted.set(true);
    setTimeout(() => {
      const videoElement = this.videoPlayer.nativeElement;
      videoElement.play();
    }, 0);
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

  toggleFullScreen(): void {
    if (!document.fullscreenElement) {
      this.imageElement.nativeElement.requestFullscreen();
    } else {
      if (document.exitFullscreen) {
        document.exitFullscreen();
      }
    }
  }
}
