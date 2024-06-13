import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private cache = new Map<string, HTMLImageElement>();

  preload(url: string): Promise<void> {
    if (this.cache.has(url)) {
      console.log(`Image already cached: ${url}`);
      return Promise.resolve();
    }

    return new Promise((resolve, reject) => {
      const extension = url.split('.').pop()?.toLowerCase();
      if (!['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
        return reject(new Error(`Unsupported file type for preload: ${extension}`));
      }

      const element = new Image();
      element.src = url;
      element.onload = () => {
        this.cache.set(url, element);
        console.log(`Image preloaded: ${url}`);
        resolve();
      };
      element.onerror = (event) => {
        console.error(`Failed to preload ${url}:`, event);
        reject(event);
      };
    });
  }

  getFromCache(url: string): HTMLImageElement | undefined {
    return this.cache.get(url);
  }
}
