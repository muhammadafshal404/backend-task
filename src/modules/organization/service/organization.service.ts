import { Injectable } from '@nestjs/common';
import { Organization } from '../entity/organization.entity';
@Injectable()
export class OrganizationService {
  constructor() {}

  async createOrganization(organization, queryRunner) {
    return await queryRunner.manager.upsert(Organization, organization, [
      'name',
    ]);
  }
}
