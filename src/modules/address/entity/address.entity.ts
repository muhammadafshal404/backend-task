import { Entity, Column, PrimaryGeneratedColumn, OneToMany } from 'typeorm';
import { School } from 'src/modules/school/entity/school.entity';

@Entity('addresses')
export class Address {
  @PrimaryGeneratedColumn()
  id: number;

  @Column({ type: 'varchar', length: 255 })
  town: string;

  @Column({ type: 'varchar', length: 255 })
  tehsil: string;

  @Column({ type: 'varchar', length: 255 })
  district: Date;

  @Column({ type: 'varchar', length: 255 })
  state: Date;

  @Column({ type: 'varchar', length: 255, nullable: false, unique: true })
  address: string;

  @Column({ type: 'float', nullable: true })
  latitude: Float32Array;

  @Column({ type: 'float', nullable: true })
  longitude: Float32Array;

  @OneToMany(() => School, (school) => school.address)
  schools: School[]
}