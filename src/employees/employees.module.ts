import { Module } from '@nestjs/common';
import { EmployeeController } from './employee.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { EmployeesService } from './employees.service';
import { EmployeeEntity } from '../entities/employee.entity';
import { EmployeeRepository } from './employee.repository';
import { CachingModule } from '../cache/caching.module';

@Module({
  imports: [CachingModule, TypeOrmModule.forFeature([EmployeeEntity])],
  controllers: [EmployeeController],
  providers: [EmployeesService, EmployeeRepository],
})
export class EmployeesModule {}
