import { IsInt, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';
import { Optional } from '@nestjs/common';

export class UpdateEmployeeDto {
  @Type(() => Number)
  @IsInt()
  id: number;
  @Length(4)
  name: string;
  @Type(() => Number)
  @IsInt()
  salary: number;
  @IsString()
  assignedRecruiter: number;
  @Optional() // just because i'm not going to implment JWT now.
  userId: any;
}
