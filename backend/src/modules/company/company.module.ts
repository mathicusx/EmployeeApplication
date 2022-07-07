import { Module } from '@nestjs/common';
import { CompanyService } from './company.service';
import { CompanyController } from './company.controller';
import { companiesProviders } from './company.providers';
import { DatabaseModule } from 'src/core/database/database.module';

@Module({
  imports: [DatabaseModule],
  providers: [CompanyService, ... companiesProviders],
  controllers: [CompanyController],
  exports: [CompanyService]
})
export class CompanyModule {}
