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
  constructor() {}

  async ngOnInit(): Promise<void> {

  /*  try {
      // Sincronizza le immagini di anteprima
      await this.dataService.preloadAllPreviews();
      console.log('Preview images synchronized and cached.');

      // Carica tutti gli altri tipi di file
      await this.dataService.preloadAllItems();
      console.log('All other items synchronized and cached.');
    } catch (error) {
      console.error('Error during preload:', error);
    }*/
  }
}
