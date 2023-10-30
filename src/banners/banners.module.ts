import { Module } from '@nestjs/common';
import { BannersService } from './banners.service';
import { BannersController } from './banners.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Banner } from './entities/banner.entity';
import { CloudinaryModule } from '../services/cloudinary/cloudinary.module';
import { JwtModule } from '@nestjs/jwt';

@Module({
  imports: [TypeOrmModule.forFeature([Banner]), CloudinaryModule, JwtModule],
  controllers: [BannersController],
  providers: [BannersService],
})
export class BannersModule {}
