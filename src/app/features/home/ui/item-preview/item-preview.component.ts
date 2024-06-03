import { AfterViewInit, Component, Input, OnInit, Renderer2 } from '@angular/core';
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

  safePreviewUrl = signal<SafeResourceUrl | null>(null);

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.safePreviewUrl.set(this.sanitizer.bypassSecurityTrustResourceUrl(this.previewUrl));
  }

  ngAfterViewInit(): void {
    if (this.previewUrl.endsWith('.mp3') || this.previewUrl.endsWith('.wav') || this.previewUrl.endsWith('.ogg')) {
      const audioElements = document.querySelectorAll('.audio-element');
      audioElements.forEach(audioElement => {
        this.renderer.setStyle(audioElement, 'backgroundColor', 'transparent');
        this.renderer.setStyle(audioElement, 'border', 'none');
        this.renderer.setStyle(audioElement, 'outline', 'none');
      });
    }
  }
}
