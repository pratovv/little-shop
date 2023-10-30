import { Module } from '@nestjs/common';
import { ItemsModule } from './items/items.module';
import { DB_CONFIG } from './utils/db_config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { CategoryModule } from './category/category.module';
import { AuthModule } from './auth/auth.module';
import { BannersModule } from './banners/banners.module';

@Module({
  imports: [
    TypeOrmModule.forRoot(DB_CONFIG),
    ItemsModule,
    CategoryModule,
    AuthModule,
    BannersModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
