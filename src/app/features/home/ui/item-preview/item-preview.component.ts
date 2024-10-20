import { AfterViewInit, Component, Input, OnInit, Renderer2, ElementRef, Output, EventEmitter } from '@angular/core';
import { DomSanitizer, SafeResourceUrl } from '@angular/platform-browser';
import { signal } from '@angular/core';

@Component({
  selector: 'app-item-preview',
  standalone: true,
  templateUrl: './item-preview.component.html',
  styleUrls: ['./item-preview.component.css']
})
export class ItemPreviewComponent implements OnInit, AfterViewInit {
  @Input() previewUrl!: string;
  @Input() itemId!: string;
  @Input() catalogId!: string;
  @Output() itemClick = new EventEmitter<string>(); // Nuovo Output EventEmitter

  safePreviewUrl = signal<SafeResourceUrl | null>(null);

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2, private el: ElementRef) {}

  ngOnInit(): void {
    this.convertBase64ToBlobUrl(this.previewUrl).then(blobUrl => {
      this.safePreviewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(blobUrl));
    });
  }

  ngAfterViewInit(): void {
    const imgElement = this.el.nativeElement.querySelector('img');
    if (imgElement) {
      this.renderer.listen(imgElement, 'click', () => this.onClick());
      this.renderer.listen(imgElement, 'touchstart', () => this.onClick());
    }

    if (this.previewUrl.endsWith('.mp3') || this.previewUrl.endsWith('.wav') || this.previewUrl.endsWith('.ogg')) {
      const audioElements = document.querySelectorAll('.audio-element');
      audioElements.forEach(audioElement => {
        this.renderer.setStyle(audioElement, 'backgroundColor', 'transparent');
        this.renderer.setStyle(audioElement, 'border', 'none');
        this.renderer.setStyle(audioElement, 'outline', 'none');
      });
    }
  }

  onClick(): void {
    this.itemClick.emit(this.itemId); // Emetti l'evento di clic
  }
  private async convertBase64ToBlobUrl(base64: string): Promise<string> {
    const response = await fetch(base64);
    const blob = await response.blob();
    return URL.createObjectURL(blob);
  }
}
