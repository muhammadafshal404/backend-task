import { Injectable } from '@nestjs/common';
import { School } from '../entity/school.entity';
@Injectable()
export class SchoolService {
  constructor() {}

  async createSchool(school, queryRunner) {
    return await queryRunner.manager.upsert(School, school, ['name']);
  }
}
