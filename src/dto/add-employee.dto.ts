import { IsInt, IsNumber, IsString, Length } from 'class-validator';
import { Transform, Type } from 'class-transformer';

export class AddEmployeeDto {
  @Length(4)
  name: string;
  @Type(() => Number)
  @IsInt()
  salary: number;
  @IsString()
  recruiterId: number;
}
