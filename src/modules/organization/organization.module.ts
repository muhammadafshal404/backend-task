import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Organization } from './entity/organization.entity';
import { OrganizationService } from './service/organization.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([Organization]),
  ],
  providers: [OrganizationService],
  exports: [OrganizationService],
})
export class OrganizationModule {}