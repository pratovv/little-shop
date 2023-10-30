import {
  BadRequestException,
  Injectable,
  NotFoundException,
} from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Category } from './entities/category.entity';

@Injectable()
export class CategoryService {
  constructor(@InjectRepository(Category) private repo: Repository<Category>) {}

  async create(createCategoryDto: CreateCategoryDto) {
    const category = await this.repo.findOne({
      where:{
        name:createCategoryDto.name
      }
    });
    if (category){
      throw new BadRequestException('Данная категория уже существует');
    }
    return this.repo.save(createCategoryDto);
  }

  findAll(search: string): Promise<Category[]> {
    const options :{name?:string}= {}
    if(search){
        options.name = search;
    }
    return this.repo.find({
      where: {
        ...options
      },
      order: {
        id: 'DESC'
      }
    });
  }

  async findOne(options = {}): Promise<Category> {
    const category = await this.repo.findOne({ where: options });
    if (!category) throw new NotFoundException(`The category is not found`);
    return category;
  }

  async update(
    id: number,
    updateCategoryDto: UpdateCategoryDto,
  ): Promise<Category> {
    const category = await this.findOne({ id: id });
    const registered = await this.repo.findOne({
      where:{
        name:updateCategoryDto.name
      }
    });
    if (registered){
      throw new BadRequestException('Такая категория уже зарегистрирована');
    }
    const updated = Object.assign(category, updateCategoryDto);
    return this.repo.save(updated);
  }

  async remove(id: number) {
    await this.findOne({ id: id });
    return this.repo.delete(id);
  }
}
