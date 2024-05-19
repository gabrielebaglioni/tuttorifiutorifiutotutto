import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { CatalogItem, StoreService } from '../../shared/service/store.service';
import { SubscriberComponent } from '../../shared/components/subscriber/subscriber.component';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends SubscriberComponent implements OnInit {
  catalogItems$: Observable<CatalogItem[]>;
  allExpanded$: Observable<boolean>;
  clickedInside = false; // Aggiungi questo flag

  constructor(private storeService: StoreService) {
    super();
    this.catalogItems$ = this.storeService.catalogItems$;
    this.allExpanded$ = this.storeService.allExpanded$;
  }

  ngOnInit(): void {}

  toggleAllExpand(): void {
    this.storeService.toggleAllExpand();
  }

  @HostListener('document:click', ['$event'])
  onDocumentClick(event: MouseEvent): void {
    if (this.clickedInside) {
      this.clickedInside = false; // Resetta il flag
      return;
    }
    this.storeService.closeAll();
  }

  onClickedInside() {
    this.clickedInside = true;
  }
}
