import {AfterViewInit, Component, Input, input, OnInit, Renderer2} from '@angular/core';
import {map, Observable} from "rxjs";
import {CatalogItem, Item, StoreService} from "../../../../shared/service/store.service";
import {AsyncPipe, CommonModule, NgSwitch} from "@angular/common";
import {VariableContentComponent} from "../variable-content/variable-content.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";

@Component({
  selector: 'app-item-preview',
  standalone: true,
  imports: [
    NgSwitch,
    AsyncPipe,
    VariableContentComponent,
    CommonModule,

  ],
  templateUrl: './item-preview.component.html',
  styleUrl: './item-preview.component.css'
})
export class ItemPreviewComponent implements OnInit, AfterViewInit {
  @Input() item!: Item;
  fileType: string = '';
  safeUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {}

  ngOnInit(): void {
    this.fileType = this.determineFileType(this.item.url);
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.url);
  }

  ngAfterViewInit(): void {
    if (this.fileType === 'audio') {
      const audioElements = document.querySelectorAll('.audio-element');
      audioElements.forEach(audioElement => {
        this.renderer.setStyle(audioElement, 'backgroundColor', 'transparent');
        this.renderer.setStyle(audioElement, 'border', 'none');
        this.renderer.setStyle(audioElement, 'outline', 'none');
      });
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
