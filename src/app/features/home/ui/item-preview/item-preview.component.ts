import {Component, Input, input, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {CatalogItem, Item, StoreService} from "../../../../shared/service/store.service";
import {AsyncPipe, CommonModule, NgSwitch} from "@angular/common";
import {VariableContentComponent} from "../variable-content/variable-content.component";

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
export class ItemPreviewComponent implements OnInit {
  @Input() item!: Item;
  fileType: string = '';

  ngOnInit(): void {
    this.fileType = this.determineFileType(this.item.url);
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
