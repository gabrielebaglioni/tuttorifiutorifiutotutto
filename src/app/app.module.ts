import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { NgModule } from "@angular/core";
import { AppComponent } from "./app.component";
import { CoreModule } from "./core/core.module";
import { AppRoutingModule } from "./app-routing.module";
import {RouterModule} from "@angular/router";

import {FaIconLibrary, FontAwesomeModule} from "@fortawesome/angular-fontawesome";
import {faDownload} from "@fortawesome/free-solid-svg-icons";
import {FeaturesModule} from "./features/features.module";

@NgModule({
  declarations: [AppComponent],
  imports: [
    CoreModule,
    BrowserModule,
    BrowserAnimationsModule,
    AppRoutingModule,
    RouterModule,
    FontAwesomeModule,
    FeaturesModule,
  ],
  providers: [

  ],
  bootstrap: [AppComponent],
})
export class AppModule {
  constructor(library: FaIconLibrary) {
    library.addIcons(faDownload);
  }
}
