import { Injectable } from '@angular/core';
import { CacheItem } from '../interfaces/cache.interface';
import { StorageService, STORAGE_VALUES } from './storage.service';

enum CACHE_KEYS {
  CACHE = 'cache',
}

@Injectable({
  providedIn: 'root'
})
export class CacheService {

  private _itemsList: Array<CacheItem>;

  constructor(
    private storageService: StorageService,
  ) {
    this.loadAllCacheData();
  }

  loadAllCacheData(): void {
    this._itemsList = this.storageService.getJSONValue(STORAGE_VALUES.LOCAL, CACHE_KEYS.CACHE);
    if (this._itemsList === null) {
      this._itemsList = [];
    }
  }

  addItem(type: string, page: number, data: any ): void {
    const id = this.cacheId(type, page);
    const item: CacheItem = {
      id,
      data,
    };
    this._itemsList.push(item);
    this.storageService.setJSONValue(STORAGE_VALUES.LOCAL, CACHE_KEYS.CACHE, this._itemsList);
  }

  getItem(type: string, page: number): any | null {
    const index = this.searchItem(this.cacheId(type, page));
    if (index > -1) {
      return this._itemsList[index].data;
    }
    return null;
  }

  private cacheId(value: string, page: number): string {
    return `${value.trim().split(' ').join('_').toUpperCase()}_${page}`;
  }

  private searchItem(id: string): number {
    return this._itemsList.findIndex(item => item.id === id);
  }
}
