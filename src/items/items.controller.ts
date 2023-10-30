import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  Query,
  UseInterceptors,
  UploadedFiles,
  UseGuards,
} from '@nestjs/common';
import { ItemsService } from './items.service';
import { CreateItemDto } from './dto/create-item.dto';
import { UpdateItemDto } from './dto/update-item.dto';
import {
  ApiBearerAuth,
  ApiQuery,
  ApiTags,
} from '@nestjs/swagger';
import { FileFieldsInterceptor } from '@nestjs/platform-express';
import { AdminGuard } from '../auth/guards/admin.guard';
@ApiTags('Items')
@Controller('items')
export class ItemsController {
  constructor(private readonly itemsService: ItemsService) {}
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo_1', maxCount: 1 },
      { name: 'photo_2', maxCount: 1 },
      { name: 'photo_3', maxCount: 1 },
    ]),
  )
  @Post('')
   create(
    @Body() createItemDto: CreateItemDto,
    @UploadedFiles()
    images: {
      photo_1: Express.Multer.File;
      photo_2?: Express.Multer.File;
      photo_3?: Express.Multer.File;
    },
  ) {
    return this.itemsService.create(
      createItemDto,
      images.photo_1,
      images.photo_2,
      images.photo_3,
    );
  }
  @ApiQuery({
    name: 'search',
    description: 'Поиск по названию',
    required: false,
  })
  @Get('')
   findAll(@Query('search') search: string) {
    return  this.itemsService.findAll(search);
  }

  @Get(':id')
   findOne(@Param('id') id: number) {
    return  this.itemsService.findOne({ id: id });
  }
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @UseInterceptors(
    FileFieldsInterceptor([
      { name: 'photo_1', maxCount: 1 },
      { name: 'photo_2', maxCount: 1 },
      { name: 'photo_3', maxCount: 1 },
    ]),
  )
  @Patch(':id')
   update(
    @Param('id') id: number,
    @Body() updateItemDto: UpdateItemDto,
    @UploadedFiles()
    images: {
      photo_1?: Express.Multer.File;
      photo_2?: Express.Multer.File;
      photo_3?: Express.Multer.File;
    },
  ) {
    return  this.itemsService.update(
      id,
      updateItemDto,
      images.photo_1,
      images.photo_2,
      images.photo_3,
    );
  }
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete('delete-item/:id')
   remove(@Param('id') id: number) {
    return  this.itemsService.remove(id);
  }
  @UseGuards(AdminGuard)
  @ApiBearerAuth()
  @Delete('delete-photo/:public_id')
   deletePhoto(@Param('public_id') public_id: string) {
    return  this.itemsService.deletePhoto(public_id);
  }
}
