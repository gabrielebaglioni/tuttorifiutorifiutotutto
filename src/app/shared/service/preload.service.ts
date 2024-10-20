/*
import { Injectable } from '@angular/core';
import { openDB, DBSchema, IDBPDatabase } from 'idb';

interface MyDB extends DBSchema {
  catalogs: {
    key: string;
    value: CatalogItem;
  };
  files: {
    key: string;
    value: {
      url: string;
      data: string;
      size: number;
    };
  };
}

export interface Item {
  id: string;
  url: string;
  previewUrl: string;
  alt?: string;
  description?: string;
}

export interface CatalogItem {
  id: string;
  name: string;
  category: string;
  year: string;
  items: Item[];
}

@Injectable({
  providedIn: 'root'
})
export class PreloadService {
  private dbPromise: Promise<IDBPDatabase<MyDB>>;
  private cache = new Map<string, string>();

  constructor() {
    this.dbPromise = openDB<MyDB>('preload-db', 1, {
      upgrade(db) {
        db.createObjectStore('catalogs', {
          keyPath: 'id'
        });
        db.createObjectStore('files', {
          keyPath: 'url'
        });
      }
    });
  }

  async preload(url: string): Promise<void> {
    if (this.cache.has(url)) {
      return;
    }

    const db = await this.dbPromise;
    const cachedFile = await db.get('files', url);
    if (cachedFile) {
      this.cache.set(url, cachedFile.data);
      return;
    }

    const extension = url.split('.').pop()?.toLowerCase();
    if (!['jpg', 'jpeg', 'png', 'gif', 'mp4', 'mp3', 'pdf'].includes(extension!)) {
      throw new Error(`Unsupported file type for preload: ${extension}`);
    }

    const response = await fetch(url);
    if (!response.ok) {
      throw new Error(`Failed to preload ${url}`);
    }

    const blob = await response.blob();
    const size = blob.size;
    const reader = new FileReader();
    reader.onloadend = async () => {
      const base64data = reader.result as string;
      if (['jpg', 'jpeg', 'png', 'gif'].includes(extension!)) {
        this.cache.set(url, base64data);
      }
      await db.put('files', { url, data: base64data, size });
    };
    reader.readAsDataURL(blob);
  }

  async getFromCache(url: string): Promise<string | undefined> {
    if (this.cache.has(url)) {
      return this.cache.get(url);
    }

    const db = await this.dbPromise;
    const cachedFile = await db.get('files', url);
    if (cachedFile && ['jpg', 'jpeg', 'png', 'gif'].includes(url.split('.').pop()?.toLowerCase()!)) {
      this.cache.set(url, cachedFile.data);
      return cachedFile.data;
    }

    return undefined;
  }

  async saveToIndexedDB(url: string, data: string, size: number): Promise<void> {
    const db = await this.dbPromise;
    await db.put('files', { url, data, size });
  }

  async getFromIndexedDB(url: string): Promise<string | undefined> {
    const db = await this.dbPromise;
    const cachedFile = await db.get('files', url);
    return cachedFile ? cachedFile.data : undefined;
  }

  async convertUrlToBase64(url: string): Promise<string> {
    const response = await fetch(url);
    const blob = await response.blob();
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.onloadend = () => resolve(reader.result as string);
      reader.onerror = reject;
      reader.readAsDataURL(blob);
    });
  }

  async saveCatalog(catalog: CatalogItem): Promise<void> {
    const db = await this.dbPromise;
    await db.put('catalogs', catalog);
  }

  async getCatalog(catalogId: string): Promise<CatalogItem | undefined> {
    const db = await this.dbPromise;
    return await db.get('catalogs', catalogId);
  }

  async getAllCatalogs(): Promise<CatalogItem[]> {
    const db = await this.dbPromise;
    return await db.getAll('catalogs');
  }

  async clearCatalogs(): Promise<void> {
    const db = await this.dbPromise;
    await db.clear('catalogs');
  }
}
*/
