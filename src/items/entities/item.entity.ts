import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { ApiProperty } from '@nestjs/swagger';
import { Category } from '../../category/entities/category.entity';
import { ItemPhotoEntity } from './item-photo.entity';

@Entity({ name: 'Items' })
export class Item {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  description: string;
  @Column()
  wb: string;
  @Column()
  ozon: string;
  @ApiProperty()
  @ManyToOne(() => Category, (category) => category.id, {
    onDelete: 'SET NULL',
  })
  category: number;
  @OneToMany(() => ItemPhotoEntity, (photo) => photo.item, {
    onDelete: 'SET NULL',
  })
  photo: number;
}
