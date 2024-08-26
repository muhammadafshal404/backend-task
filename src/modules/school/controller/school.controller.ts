import {Body, Controller, Get,Put,Delete,Post, Param, Query, UseInterceptors, UploadedFile } from '@nestjs/common';
import { SchoolService } from '../service/school.service';
import { AddressService } from 'src/modules/address/service/address.service';
import { OrganizationService } from 'src/modules/organization/service/organization.service';
import { FileInterceptor } from '@nestjs/platform-express';


@Controller('school')
export class CarController {
  constructor(
    private readonly schoolService: SchoolService, 
    private readonly addressService: AddressService,
    private readonly organizationService: OrganizationService
  ) {}

  @Post("/")
  @UseInterceptors(FileInterceptor('file'))
  uploadSchoolsFile(@UploadedFile() file: Express.Multer.File){
    console.log(file);
  }

}