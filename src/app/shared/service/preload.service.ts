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
      const extension = url.split('.').pop()?.toLowerCase();
      let element: HTMLImageElement | HTMLVideoElement | HTMLAudioElement | HTMLIFrameElement;

      if (['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
        element = new Image();
      } else if (['mp4', 'webm'].includes(extension!)) {
        element = document.createElement('video');
      } else if (['mp3', 'wav', 'ogg'].includes(extension!)) {
        element = document.createElement('audio');
      } else if (['pdf'].includes(extension!)) {
        element = document.createElement('iframe');
      } else {
        return reject(new Error(`Unsupported file type: ${extension}`));
      }

      element.src = url;
      element.onload = () => {
        this.cache.set(url, element);
        resolve();
      };
      element.onerror = (event) => {
        console.error(`Failed to preload ${url}:`, event);
        reject(event);
      };

      // Append the element to the body for video and audio to trigger load
      if (element instanceof HTMLVideoElement || element instanceof HTMLAudioElement || element instanceof HTMLIFrameElement) {
        element.style.display = 'none';
        document.body.appendChild(element);
      }
    });
  }

  getFromCache(url: string): any {
    return this.cache.get(url);
  }
}
