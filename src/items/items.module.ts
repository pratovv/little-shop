import { Module } from '@nestjs/common';
import { ItemsService } from './items.service';
import { ItemsController } from './items.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { CategoryModule } from '../category/category.module';
import { CloudinaryModule } from '../services/cloudinary/cloudinary.module';
import { ItemPhotoEntity } from './entities/item-photo.entity';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [
    TypeOrmModule.forFeature([Item, ItemPhotoEntity]),
    JwtModule,
    CategoryModule,
    CloudinaryModule,
  ],
  controllers: [ItemsController],
  providers: [ItemsService],
})
export class ItemsModule {}
