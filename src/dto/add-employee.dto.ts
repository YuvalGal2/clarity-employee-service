import { IsNumber, IsString, Length } from 'class-validator';
import { Type } from 'class-transformer';

export class AddEmployeeDto {
  @Length(4)
  name: string;
  @Type(() => Number)
  @IsNumber()
  salary: number;
  @IsString()
  assignedRecruiter: number;
}
