import { IsNumber, IsString, Length, MinLength } from 'class-validator';
import { Type } from 'class-transformer';

export class AddEmployeeDto {
  @Length(4)
  name: string;
  @Type(() => Number)
  @IsNumber()
  salary: number;
  @MinLength(1)
  @IsString()
  assignedRecruiter: number;
}
