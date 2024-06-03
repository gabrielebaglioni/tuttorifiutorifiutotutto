import { Component, HostListener, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import { map } from 'rxjs/operators'; // Importa map per le operazioni RxJS
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
  expandAllText$: Observable<string>; // Aggiungi questa proprietà
  clickedInside = false; // Aggiungi questo flag

  constructor(private storeService: StoreService) {
    super();
    this.catalogItems$ = this.storeService.catalogItems$;
    this.allExpanded$ = this.storeService.allExpanded$;
    this.expandAllText$ = this.allExpanded$.pipe(
      map(allExpanded => allExpanded ? 'Collapse All [-]' : 'Expand All [+]')
    ); // Crea un Observable per il testo del pulsante
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
