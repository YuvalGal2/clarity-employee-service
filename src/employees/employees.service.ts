import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { EmployeeEntity } from '../entities/employee.entity';
import { AddEmployeeDto } from '../dto/add-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { CacheService } from '../cache/cache.service';

@Injectable()
export class EmployeesService {
  constructor(
    @InjectRepository(EmployeeRepository)
    private readonly employeeRepository: EmployeeRepository,
    private readonly cacheService: CacheService,
  ) {}

  async all(): Promise<any> {
    if (await this.employeeCache()) {
      return await this.cacheService.getIfExisting('allEmployees');
    } else {
      const allEmployees = await this.employeeRepository.find();
      await this.fillCache('allEmployees', allEmployees);
      return allEmployees;
    }
  }

  private async employeeCache(): Promise<any> {
    const allEmployeesCache = await this.cacheService.getIfExisting(
      'allEmployees',
    );
    if (allEmployeesCache) {
      // console.log('Cache:Loaded!');
      return allEmployeesCache;
    }
    // console.log('cache not loaded! - probably ttl');
  }
  private async fillCache(key, employees: EmployeeEntity[]): Promise<void> {
    await this.cacheService.set(String(key), employees);
  }
  private async modifyEmployeeInCache(id: number, newData: any) {
    const { salary, name, assignedRecruiter } = newData;
    const cache: EmployeeEntity[] = await this.employeeCache();
    if (cache) {
      const newCache: EmployeeEntity[] = cache.map(
        (employee: EmployeeEntity) => {
          if (employee.id === id) {
            employee.salary = salary;
            employee.name = name;
            employee.assignedRecruiter = assignedRecruiter;
          }
          return employee;
        },
      );
      await this.cacheService.set('allEmployees', newCache);
    }
  }

  async update(data: UpdateEmployeeDto): Promise<EmployeeEntity> {
    const updated = await this.employeeRepository.updateFields(data);
    await this.modifyEmployeeInCache(data.id, data);
    return updated;
  }
  async add(data: AddEmployeeDto): Promise<any> {
    const saved = await this.employeeRepository.save(data);
    await this.modifyEmployeeInCache(saved.id, data);
    return saved;
  }
  async getAllByFilter(
    filter: string,
    value: string,
  ): Promise<EmployeeEntity[]> {
    return this.employeeRepository.getAllBy(filter, value);
  }
}
