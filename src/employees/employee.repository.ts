import { HttpException, Injectable, NotFoundException } from '@nestjs/common';
import { DataSource, Repository } from 'typeorm';
import { EmployeeEntity } from '../entities/employee.entity';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';

@Injectable() // here
export class EmployeeRepository extends Repository<EmployeeEntity> {
  constructor(private dataSource: DataSource) {
    super(EmployeeEntity, dataSource.createEntityManager());
  }

  async updateFields(fields: UpdateEmployeeDto): Promise<any> {
    // needs to check if recruiter has access to this id. probably using some kind of auth service. - out of scope.
    const { salary, id, name } = fields;
    const ack = await this.update({ id }, { salary, name });
    if (ack.affected > 0) {
      return ack;
    }
    throw new HttpException(`Could not update employee ${id}`, 500);
  }
  async getAllBy(filter: string, filterValue: any): Promise<EmployeeEntity[]> {
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
