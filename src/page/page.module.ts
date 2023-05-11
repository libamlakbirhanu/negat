import { Module } from '@nestjs/common';
import { PageService } from './page.service';
import { PageResolver } from './page.resolver';

@Module({
  providers: [PageService, PageResolver]
})
export class PageModule {}
