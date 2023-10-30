import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateBannerDto } from './dto/create-banner.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Banner } from './entities/banner.entity';
import { CloudinaryService } from '../services/cloudinary/cloudinary.service';

@Injectable()
export class BannersService {
  constructor(
    @InjectRepository(Banner) private repo: Repository<Banner>,
    private cloudinaryService: CloudinaryService,
  ) {}

  async create(createBannerDto: CreateBannerDto, image: Express.Multer.File) {
    if (!image) throw new BadRequestException('Выгрузите фото');
    const photo = await this.cloudinaryService.upload_file(image);
    createBannerDto.photo = await photo.secure_url;
    createBannerDto.photo_id = await photo.public_id;
    return await this.repo.save(createBannerDto);
  }

  findAll() {
    return this.repo.find({
        order: {
            id: 'DESC'
        }
    });
  }

  async remove(id: number) {
    const banner = await this.repo.findOne({ where: { id: id } });
    if (!banner) throw new NotFoundException();
    await this.cloudinaryService.deleteOne(banner.photo_id);
    await this.repo.delete(id);
    return {
      status: 'successfully deleted',
    };
  }
}
