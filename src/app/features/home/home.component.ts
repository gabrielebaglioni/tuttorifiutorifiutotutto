import { Component, OnInit } from '@angular/core';
import { Observable } from 'rxjs';
import {CatalogItem, StoreService} from "../../shared/service/store.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  catalogItems$: Observable<CatalogItem[]>;
  allExpanded$: Observable<boolean>;

  constructor(private storeService: StoreService) {
    this.catalogItems$ = this.storeService.catalogItems$;
    this.allExpanded$ = this.storeService.allExpanded$;
  }

  ngOnInit(): void {}

  toggleAllExpand(): void {
    this.storeService.toggleAllExpand();
  }
}
