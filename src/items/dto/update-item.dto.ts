import { ApiProperty, PartialType } from '@nestjs/swagger';
import { CreateItemDto } from './create-item.dto';

export class UpdateItemDto extends PartialType(CreateItemDto) {
  @ApiProperty()
  description: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  wb: string;
  @ApiProperty()
  ozon: string;
}
