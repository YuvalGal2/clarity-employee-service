import { CACHE_MANAGER, Inject, Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { EmployeeRepository } from './employee.repository';
import { Employee } from './employee.entity';
import { AddEmployeeDto } from '../dto/add-employee.dto';
import { UpdateEmployeeDto } from '../dto/update-employee.dto';
import { Cache } from 'cache-manager';
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
      console.log('Cache:Loaded!');
      return allEmployeesCache;
    }
    console.log('cache not loaded!');
  }
  private async fillCache(key, employees: Employee[]): Promise<void> {
    await this.cacheService.set(String(key), employees);
  }
  private async modifyEmployeeInCache(id: number, newData: any) {
    const { salary, name, assignedRecruiter } = newData;
    const cache: Employee[] = await this.employeeCache();
    if (cache) {
      const newCache: Employee[] = cache.map((employee: Employee) => {
        if (employee.id === id) {
          employee.salary = salary;
          employee.name = name;
          employee.assignedRecruiter = assignedRecruiter;
        }
        return employee;
      });
      await this.cacheService.set('allEmployees', newCache);
    }
  }

  async update(data: UpdateEmployeeDto): Promise<Employee> {
    const updated = await this.employeeRepository.updateFields(data);
    await this.modifyEmployeeInCache(data.id, data);
    return updated;
  }
  async add(data: AddEmployeeDto): Promise<any> {
    return this.employeeRepository.save(data);
  }
  async getAllByFilter(filter: string, value: string): Promise<Employee[]> {
    return this.employeeRepository.getAllBy(filter, value);
  }
}
