import { Component, HostListener, OnInit, computed } from '@angular/core';
import { CatalogItem, StoreService } from '../../shared/service/store.service';
import { SubscriberComponent } from '../../shared/components/subscriber/subscriber.component';
import {map, Observable} from "rxjs";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent extends SubscriberComponent implements OnInit {
  catalogItems = this.storeService.catalogItems;
  allExpanded$: Observable<boolean>;
  expandAllText$: Observable<string>; // Aggiungi questa proprietà
  clickedInside = false; // Aggiungi questo flag

  constructor(private storeService: StoreService) {
    super();
    this.allExpanded$ = this.storeService.allExpanded$;
    this.expandAllText$ = this.allExpanded$.pipe(
      map(allExpanded => allExpanded ? 'Collapse All [-]' : 'Expand All [+]')
    );
  }

  ngOnInit(): void {
    this._subscriptions.push(
      this.allExpanded$.subscribe()
    );
  }

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
