import { Component, OnInit } from '@angular/core';
/*
import { DataService } from './shared/service/dataService';
*/

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent implements OnInit {
  isLoading = true;

  ngOnInit() {
    this.checkResourcesLoaded();
  }

  checkResourcesLoaded() {
    const images = Array.from(document.images);
    const imagePromises = images.map(img => {
      return new Promise(resolve => {
        if (img.complete) {
          resolve(true);
        } else {
          img.addEventListener('load', () => resolve(true));
          img.addEventListener('error', () => resolve(true));
        }
      });
    });

    const fontPromise = document.fonts.ready;

    Promise.all([...imagePromises, fontPromise]).then(() => {
      this.isLoading = false;
    });
  }

}
