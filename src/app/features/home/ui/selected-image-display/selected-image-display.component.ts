import {Component, OnInit} from '@angular/core';
import {map, Observable} from "rxjs";
import {CatalogItem, Item, StoreService} from "../../../../shared/service/store.service";
import {AsyncPipe, CommonModule, NgSwitch, NgSwitchCase, NgSwitchDefault} from "@angular/common";
import {VariableContentComponent} from "../variable-content/variable-content.component";

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
  styleUrl: './selected-image-display.component.css'
})
export class SelectedImageDisplayComponent implements OnInit {
  selectedItem$: Observable<Item | null>;
  parentCatalog$: Observable<CatalogItem | null>;

  constructor(private storeService: StoreService) {
    this.selectedItem$ = this.storeService.activeItem$.pipe(map(active => active.item));
    this.parentCatalog$ = this.storeService.activeItem$.pipe(map(active => active.catalog));
  }

  ngOnInit(): void {}

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
