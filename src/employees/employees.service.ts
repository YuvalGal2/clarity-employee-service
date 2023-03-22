import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './employee.entity';
import { AddEmployeeDto } from '../dto/add-employee.dto';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
  ) {}

  async all(): Promise<any> {
    return this.employeeRepository.find();
  }

  async add(data: AddEmployeeDto): Promise<any> {
    return this.employeeRepository.save(data);
  }
  async getAllByFilter(filter: string, value: string): Promise<Employee[]> {
    return this.employeeRepository.getAllBy(filter, value);
  }
}
