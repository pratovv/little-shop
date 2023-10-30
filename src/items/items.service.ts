import { Injectable, NotFoundException } from '@nestjs/common';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Item } from './entities/item.entity';
import { Repository } from 'typeorm';
import { CategoryService } from '../category/category.service';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';
import { ItemPhotoEntity } from './entities/item-photo.entity';
import { ItemPhotoDto } from './dto/item-photo.dto';

@Injectable()
export class ItemsService {
  constructor(
    @InjectRepository(Item) private repo: Repository<Item>,
    @InjectRepository(ItemPhotoEntity)
    private photo_repo: Repository<ItemPhotoEntity>,
    private categoryService: CategoryService,
    private cloudinaryService: CloudinaryService,
  ) {}
  async create(createItemDto: CreateItemDto, ...photos): Promise<Item> {
    await this.categoryService.findOne({ id: createItemDto.category });
    const item = await this.repo.save(createItemDto);
    photos.map(async (e) => {
      if (e !== undefined) {
        const photo = await this.upload_photo(e);
        const dto: ItemPhotoDto = {
          photo_url: photo.url,
          public_id: photo.public_id,
          item: item.id,
        };
        await this.photo_repo.save(dto);
      }
    });
    return item;
  }

 findAll(search: string): Promise<Item[]> {
    const options :{search?:string}= {}
    if(search) {
      options.search = search;
    }
    return this.repo.find({
      relations: ['category', 'photo'],
      order:{
        id:'DESC'
      }
    });
  }

  async findOne(options = {}): Promise<Item | NotFoundException> {
    const item = await this.repo.findOne({
      where: options,
      relations: ['category', 'photo'],
    });
    if (!item) {
      throw new NotFoundException()
    };
    return item;
  }

  async update(
    id: number,
    updateItemDto: UpdateItemDto,
    ...photos
  ): Promise<UpdateItemDto> {
    const item = await this.findOne({ id: id });
    if (!item) {
      throw new NotFoundException()
    };
    await this.categoryService.findOne({ id: updateItemDto.category });
    photos.map(async (e) => {
      if (e !== undefined) {
        const photo = await this.upload_photo(e);
        const dto: ItemPhotoDto = {
          photo_url: photo.url,
          public_id: photo.public_id,
          item: id,
        };
        await this.photo_repo.save(dto);
      }
    });
    const updated = Object.assign(item, updateItemDto);
    return this.repo.save(updated);
  }

  async remove(id: number)  {
    const item = await this.findOne({ id: id });
    item['photo'].map(async (e) => {
      await this.cloudinaryService.deleteOne(e.public_id);
    });
    if (!item) {
      throw new NotFoundException();
    }
    return this.repo.delete(id);
  }
  async deletePhoto(public_id: string) {
    await this.cloudinaryService.deleteOne(public_id);
    const photo = await this.photo_repo.findOne({
      where: { public_id: public_id },
    });
    if (!photo) throw new NotFoundException();
    await this.photo_repo.delete(photo.id);
    return {
      response: 'deleted',
    };
  }
  private async upload_photo(file: Express.Multer.File) {
    const photo = await this.cloudinaryService.upload_file(file[0]);
    return {
      url: photo.secure_url,
      public_id: photo.public_id,
    };
  }
}
