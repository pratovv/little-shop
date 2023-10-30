import { ApiProperty } from '@nestjs/swagger';

export class CreateItemDto {
  @ApiProperty()
  description: string;
  @ApiProperty()
  name: string;
  @ApiProperty()
  wb: string;
  @ApiProperty()
  ozon: string;
  @ApiProperty()
  category: number;
}
