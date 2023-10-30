import { Column, Entity, ManyToOne, PrimaryGeneratedColumn } from 'typeorm';
import { Item } from './item.entity';

@Entity({ name: 'item-photo' })
export class ItemPhotoEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  photo_url: string;
  @Column()
  public_id: string;
  @ManyToOne(() => Item, (item) => item.id, { onDelete: 'CASCADE' })
  item: number;
}
