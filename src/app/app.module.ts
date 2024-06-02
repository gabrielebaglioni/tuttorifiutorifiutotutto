import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import {RouterModule} from "@angular/router";
import {PreloadService} from "./shared/service/preload.service";
import {DataService} from "./shared/service/dataService";
import {StoreService} from "./shared/service/store.service";
import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {LazyLoadImageModule} from "ng-lazyload-image";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
  ],
  providers: [
    StoreService,
    DataService,
    PreloadService
  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDownload);
  }
}
