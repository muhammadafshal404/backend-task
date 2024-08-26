import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Address } from './entity/address.entity';
import { AddressService } from './service/address.service';

@Module({
  imports: [
    TypeOrmModule.forFeature([Address]),
  ],
  providers: [AddressService],
  exports: [AddressService],
})
export class AddressModule {}