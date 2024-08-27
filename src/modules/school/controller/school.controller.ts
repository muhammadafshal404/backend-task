import {
  Controller,
  Get,
  Delete,
  Post,
  Param,
  UseInterceptors,
  UploadedFile,
  FileTypeValidator,
  ParseFilePipe,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { SchoolService } from '../service/school.service';
import { AddressService } from 'src/modules/address/service/address.service';
import { OrganizationService } from 'src/modules/organization/service/organization.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { DataSource, Repository } from 'typeorm';
import { InjectRepository } from '@nestjs/typeorm';
import { School } from '../entity/school.entity';
import { RESPONSE_MESSAGES } from 'utils/constants';

@Controller('school')
export class SchoolController {
  constructor(
    private readonly schoolService: SchoolService,
    private readonly addressService: AddressService,
    private readonly organizationService: OrganizationService,
    private dataSource: DataSource,
    @InjectRepository(School)
    private schoolRepository: Repository<School>,
  ) {}

  @Post('/')
  @UseInterceptors(FileInterceptor('file'))
  async uploadSchoolsFile(
    @UploadedFile(
      new ParseFilePipe({
        validators: [new FileTypeValidator({ fileType: 'json' })],
      }),
    )
    file: Express.Multer.File,
  ) {
    const queryRunner = this.dataSource.createQueryRunner();
    await queryRunner.connect();
    await queryRunner.startTransaction();
    try {
      const jsonData = JSON.parse(file?.buffer?.toString());

      const result = await Promise.all(
        await jsonData.map(async (data) => {
          await this.organizationService.createOrganization(
            data?.organization,
            queryRunner,
          );

          await this.addressService.createAddress(data?.address, queryRunner);

          return await this.schoolService.createSchool(data, queryRunner);
        }),
      );
      await queryRunner.commitTransaction();
      return result;
    } catch (err) {
      await queryRunner.rollbackTransaction();
      throw err;
    } finally {
      await queryRunner.release();
    }
  }

  @Get('/')
  async getAllSchools() {
    try {
      const schools = await this.schoolRepository
        .createQueryBuilder('school')
        .leftJoinAndSelect('school.address', 'address')
        .leftJoinAndSelect('school.organization', 'organization')
        .select([
          'school.id',
          'school.name',
          'school.status',
          'school.startTime',
          'school.endTime',
          'school.shift',
          'school.hasProjector',
          'school.hasLaptop',
          'organization.name',
          'address.town',
          'address.tehsil',
          'address.district',
          'address.state',
          'address.address',
          'address.longitude',
          'address.latitude',
        ])
        .getMany();

      if (schools?.length) {
        return schools;
      } else {
        throw new HttpException(
          RESPONSE_MESSAGES.NO_SCHOOLS_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      throw err;
    }
  }

  @Get('/:id')
  async getSchool(@Param() { id }) {
    try {
      const school = await this.schoolRepository
        .createQueryBuilder('school')
        .leftJoinAndSelect('school.address', 'address')
        .leftJoinAndSelect('school.organization', 'organization')
        .where('school.id = :id', { id })
        .select([
          'school.id',
          'school.name',
          'school.status',
          'school.startTime',
          'school.endTime',
          'school.shift',
          'school.hasProjector',
          'school.hasLaptop',
          'organization.name',
          'address.town',
          'address.tehsil',
          'address.district',
          'address.state',
          'address.address',
          'address.longitude',
          'address.latitude',
        ])
        .getOne();

      if (school) {
        return school;
      } else {
        throw new HttpException(
          RESPONSE_MESSAGES.NO_SCHOOL_FOUND,
          HttpStatus.NOT_FOUND,
        );
      }
    } catch (err) {
      throw err;
    }
  }

  @Delete('/:id')
  async deleteSchool(@Param() { id }) {
    try {
      return this.schoolRepository.softDelete(id);
    } catch (err) {
      throw err;
    }
  }
}
