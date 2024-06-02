import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private cache = new Map<string, any>();

  preload(url: string): Promise<void> {
    if (this.cache.has(url)) {
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      fetch(url)
        .then(response => response.blob())
        .then(blob => {
          this.cache.set(url, URL.createObjectURL(blob));
          resolve();
        })
        .catch(error => {
          console.error(`Failed to preload ${url}:`, error);
          reject(error);
        });
    });
  }

  getFromCache(url: string): string | undefined {
    return this.cache.get(url);
  }
}
