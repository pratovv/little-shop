import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity({ name: 'Banner' })
export class Banner {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  photo: string;
  @Column()
  photo_id: string;
}
