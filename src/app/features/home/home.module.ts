import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import {RouterModule} from "@angular/router";
import {HomeComponent} from "./home.component";
import {LogoComponent} from "./ui/logo/logo.component";
import {SelectedImageDisplayComponent} from "./ui/selected-image-display/selected-image-display.component";
import {CatalogItemComponent} from "./ui/catalog-item/catalog-item.component";


@NgModule({
  declarations: [
    HomeComponent
  ],
  imports: [
    CommonModule,
    RouterModule.forChild([
      {path: '', component: HomeComponent}
    ]),
    LogoComponent,
    SelectedImageDisplayComponent,
    CatalogItemComponent,
  ]
})
export class HomeModule { }
