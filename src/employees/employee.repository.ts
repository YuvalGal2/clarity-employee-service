import { Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { Employee } from './employee.entity';

@Injectable() // here
export class EmployeeRepository extends Repository<Employee> {
  constructor(private dataSource: DataSource) {
    super(Employee, dataSource.createEntityManager());
  }

  async updateFields(fieldsArr) {}
  async getAllBy(filter: string, filterValue: any): Promise<Employee[]> {
    const res = await this.createQueryBuilder()
      .where(`${filter} = :filterValue`, { filterValue: filterValue })
      .getMany();
    if (res.length === 0) {
      throw new NotFoundException(
        `No matching records for the filter ${filter} = ${filterValue}`,
      );
    }
    return res;
  }
}
