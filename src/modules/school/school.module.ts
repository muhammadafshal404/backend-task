import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { School } from './entity/school.entity'; 
import { SchoolService } from './service/school.service';

@Module({
  imports: [
    // TypeOrmModule.forFeature([School]),
  ],
  providers: [SchoolService],
  controllers: [],
  exports: [],
})
export class SchoolModule {}