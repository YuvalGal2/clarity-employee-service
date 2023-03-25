import { BaseEntity, Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity('employees')
export class EmployeeEntity extends BaseEntity {
  @PrimaryGeneratedColumn()
  id: number;
  @Column()
  name: string;
  @Column()
  salary: number;
  @Column()
  assignedRecruiter: number;
}
export default EmployeeEntity;
