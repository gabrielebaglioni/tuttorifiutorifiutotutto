import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { FeaturesRoutingModule } from './features-routing.module';
import {LoaderComponent} from "./loader/loader.component";


@NgModule({
  declarations: [LoaderComponent],
  imports: [
    CommonModule,
    FeaturesRoutingModule,
  ],
  exports: [LoaderComponent]
})
export class FeaturesModule { }
