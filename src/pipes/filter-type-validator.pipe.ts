import {
  ArgumentMetadata,
  BadRequestException,
  Injectable,
  PipeTransform,
} from '@nestjs/common';
import { EmployeeFilters } from '../models/employee-filters.enum';

@Injectable()
export class FilterTypeValidatorPipe implements PipeTransform<number, number> {
  readonly allowedFilters: any = [
    EmployeeFilters.ID,
    EmployeeFilters.NAME,
    EmployeeFilters.SALARY,
    EmployeeFilters.RECRUITERID,
  ];

  private isFilterValid(filterName: string) {
    filterName = filterName.toLowerCase();
    return this.allowedFilters.indexOf(filterName); // will return -1 if not found
  }
  transform(value: any, metadata: ArgumentMetadata) {
    if (!value) {
      throw new BadRequestException('Value is required.');
    }
    if (!isNaN(value)) {
      throw new BadRequestException('Value cannot be a number.');
    }
    if (this.isFilterValid(value) === -1) {
      throw new BadRequestException('Filter type is not correct.');
    }
    return value;
  }
}
