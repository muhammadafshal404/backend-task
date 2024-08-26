import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/school.entity'; 
import { SchoolService } from './service/school.service';
import { SchoolController } from './controller/school.controller';
import { AddressModule } from '../address/address.module';
import { OrganizationModule } from '../organization/organization.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([School]),
    AddressModule,
    OrganizationModule
  ],
  providers: [SchoolService],
  controllers: [SchoolController],
  exports: [],
})
export class SchoolModule {}