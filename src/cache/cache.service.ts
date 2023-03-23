import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { Cache } from 'cache-manager';
@Injectable()
export class CacheService {
  constructor(@Inject(CACHE_MANAGER) private cacheManager: Cache) {}

  async getIfExisting(key: string): Promise<any> {
    const res = await this.cacheManager.get(key);
    if (res) {
      return res;
    }
  }
  async set(key: string, value: any): Promise<void> {
    console.log('cache updated!');
    return await this.cacheManager.set(key, value);
  }
}
