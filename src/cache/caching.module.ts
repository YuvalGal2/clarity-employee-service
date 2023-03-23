import { CacheModule, Module } from '@nestjs/common';
import { CacheService } from './cache.service';

@Module({
  imports: [
    CacheModule.register({
      ttl: 360000,
    }),
  ],
  providers: [CacheService],
  exports: [CacheService, CacheModule],
})
export class CachingModule {}
