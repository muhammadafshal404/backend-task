import { Entity, Column, PrimaryGeneratedColumn } from 'typeorm';

@Entity('schools')
export class School {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  name: string;

  @Column({ type: 'varchar', length: 50 })
  status: string;

  @Column({ type: 'datetime', nullable: true })
  startTime: Date;

  @Column({ type: 'datetime', nullable: true })
  endTime: Date;

  @Column({ type: 'varchar', length: 255, nullable: true })
  shift: string;

  @Column({ type: 'boolean', nullable: true })
  hasProjector: boolean;

  @Column({ type: 'boolean', nullable: true })
  hasLaptop: boolean;
}