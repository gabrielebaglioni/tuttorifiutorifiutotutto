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
    this.safePreviewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl));
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
}
