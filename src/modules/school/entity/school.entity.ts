import { Address } from 'src/modules/address/entity/address.entity';
import { Entity, Column, PrimaryGeneratedColumn, ManyToOne } from 'typeorm';
import { Organization } from 'src/modules/organization/entity/organization.entity';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255, unique: true })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  startTime: string;

  @Column({ type: 'varchar', length: 255, })
  endTime: string;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shift: string;

  @Column({ type: 'boolean', nullable: true })
  hasProjector: boolean;

  @Column({ type: 'boolean', nullable: true })
  hasLaptop: boolean;

  @ManyToOne(() => Address, (address) => address.schools)
  address: Address

  @ManyToOne(() => Organization, (organization) => organization.schools)
  organization: Organization
}