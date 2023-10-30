import { TypeOrmModuleOptions } from '@nestjs/typeorm';
import { config } from 'dotenv';
import { Item } from '../items/entities/item.entity';
import { Category } from '../category/entities/category.entity';
import { Banner } from '../banners/entities/banner.entity';
import { ItemPhotoEntity } from '../items/entities/item-photo.entity';
config();

export const DB_CONFIG: TypeOrmModuleOptions = {
  type: 'postgres',
  host: process.env.POSTGRES_HOST,
  port: +process.env.POSTGRES_PORT,
  username: process.env.POSTGRES_USER,
  password: process.env.POSTGRES_PASSWORD,
  database: process.env.POSTGRES_DATABASE,
  entities: [Item, Category, Banner, ItemPhotoEntity],
  autoLoadEntities: true,
  synchronize: true,
  ssl: {
    rejectUnauthorized: false,
  },
};
