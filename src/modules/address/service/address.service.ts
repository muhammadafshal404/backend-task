import { Injectable } from '@nestjs/common';
import { Address } from '../entity/address.entity';
@Injectable()
export class AddressService {
  constructor() {}

  async createAddress(address, queryRunner) {
    return await queryRunner.manager.upsert(Address, address, ['address']);
  }
}
