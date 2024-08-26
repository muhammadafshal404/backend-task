import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AddressModule } from './modules/address/address.module';
import { SchoolModule } from './modules/school/school.module';
import { OrganizationModule } from './modules/organization/organization.module';


@Module({
  imports: [
    // TypeOrmModule.forRoot({
    //   type:"postgres",
    //   host: process.env.POSTGRES_HOST,
    //   port: parseInt(<string>process.env.POSTGRES_PORT),
    //   username: process.env.POSTGRES_USERNAME,
    //   password: process.env.POSTGRES_PASSWORD,
    //   database: process.env.POSTGRES_DATABASE,
    //   autoLoadEntities: true,
    //   synchronize: true,
    // }), 
    AddressModule, SchoolModule, OrganizationModule
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
