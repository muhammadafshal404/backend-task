import {Body, Controller, Get,Put,Delete,Post, Param, Query, UseInterceptors, UploadedFile, MaxFileSizeValidator, FileTypeValidator, ParseFilePipe } from '@nestjs/common';
import { SchoolService } from '../service/school.service';
import { AddressService } from 'src/modules/address/service/address.service';
import { OrganizationService } from 'src/modules/organization/service/organization.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from '../entity/school.entity';


@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService, 
    private readonly addressService: AddressService,
    private readonly organizationService: OrganizationService,
    private dataSource: DataSource,
    @InjectRepository(School)
    private schoolRepository: Repository<School>
  ) {}

  @Post("/")
  @UseInterceptors(FileInterceptor('file'))
  async uploadSchoolsFile(@UploadedFile(
    new ParseFilePipe({
      validators: [
        new FileTypeValidator({ fileType: 'json' }),
      ],
    })) file: Express.Multer.File){
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const jsonData = JSON.parse(file?.buffer?.toString())

      const result = await Promise.all(await jsonData.map(async (data) => {
        

        const organization = await this.organizationService.createOrganization(data?.organization, queryRunner)
        console.log("organization", organization)

        const address = await this.addressService.createAddress(data?.address, queryRunner)
        console.log("address", address)

        return await this.schoolService.createSchool(data, queryRunner)
      }))
      // throw "error"
      await queryRunner.commitTransaction();
      return result

    } catch(err) {
      console.log("Error", err)
      await queryRunner.rollbackTransaction();
      throw err
    } finally {
      await queryRunner.release();
    }
  }


  @Get('/')
  async getAllSchools() {
    return await this.schoolRepository.find({
      select: {
        organization: {
          id: false,
          name: true
        },
        address: {
          id: false,
          town: true,
          tehsil: true,
          district: true,
          state: true,
          address: true,
          // latitude: true,
          // longitude: true
        }
      },
      relations: {
        organization: true,
        address: true,
      }
    })
  }

  @Get('/:id')
  async getSchool(@Param() { id }) {
    return await this.schoolRepository.findOne({
      where: { id },
      select: {
        organization: {
          id: false,
          name: true
        },
        address: {
          id: false,
          town: true,
          tehsil: true,
          district: true,
          state: true,
          address: true,
          // latitude: true,
          // longitude: true
        }
      },
      relations: {
        organization: true,
        address: true,
      }
    })
  }
}

