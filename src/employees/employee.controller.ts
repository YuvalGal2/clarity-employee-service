import { Body, Controller, Get, Param, Patch, Post } from '@nestjs/common';
import { EmployeesService } from './employees.service';
import { AddEmployeeDto } from '../dto/add-employee.dto';
import { FilterTypeValidatorPipe } from '../pipes/filter-type-validator.pipe';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Controller('employees')
export class EmployeeController {
  constructor(private employeesService: EmployeesService) {}

  @Get()
  all() {
    return this.employeesService.all();
  }

  @Post()
  add(@Body() data: AddEmployeeDto) {
    return this.employeesService.add(data);
  }

  @Patch()
  update(@Body() data: UpdateEmployeeDto) {
    return this.employeesService.update(data);
  }

  @Get(':filter/:value')
  async getEmployeesByFilter(
    @Param('filter', FilterTypeValidatorPipe) filterName: string,
    @Param('value') value: string,
  ) {
    return this.employeesService.getAllByFilter(filterName, value);
  }
}
