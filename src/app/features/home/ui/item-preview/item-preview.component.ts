import {AfterViewInit, Component, Input, input, OnInit, Renderer2} from '@angular/core';
import {map, Observable} from "rxjs";
import {CatalogItem, Item, StoreService} from "../../../../shared/service/store.service";
import {AsyncPipe, CommonModule, NgSwitch} from "@angular/common";
import {VariableContentComponent} from "../variable-content/variable-content.component";
import {DomSanitizer, SafeResourceUrl} from "@angular/platform-browser";
import {SubscriberComponent} from "../../../../shared/components/subscriber/subscriber.component";

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
export class ItemPreviewComponent extends SubscriberComponent implements OnInit, AfterViewInit {
  @Input() item!: Item;
  fileType: string = '';
  safeUrl!: SafeResourceUrl;
  previewUrl!: SafeResourceUrl;

  constructor(private sanitizer: DomSanitizer, private renderer: Renderer2) {
    super();
  }

  ngOnInit(): void {
    this.safeUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.url);
    this.previewUrl = this.sanitizer.bypassSecurityTrustResourceUrl(this.item.previewUrl);
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


}
