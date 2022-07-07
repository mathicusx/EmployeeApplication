import { Body, Controller, Delete, Get, Param, Post, Put, UseGuards } from '@nestjs/common';
import { AuthGuard } from '@nestjs/passport';
import { CompanyService } from './company.service';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { Company as CompanyEntity } from './company.entity';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Controller('companies')
export class CompanyController {
    constructor(private readonly companyService: CompanyService){}

    @Get()
    @UseGuards(AuthGuard('jwt'))
    findAll(): Promise<CompanyDto[]> {
        return this.companyService.findAll();
    }

    @Get(':id')
    @UseGuards(AuthGuard('jwt'))
    async getCompany(@Param('id') id: string): Promise<CompanyDto> {
        return this.companyService.getCompany(id);
    }

    @Post()
    @UseGuards(AuthGuard('jwt'))
    create(
        @Body() createCompanyDto: CreateCompanyDto,
        ): Promise<CompanyEntity> {
            return this.companyService.create(createCompanyDto);
        }
    
    @Put('id')
    @UseGuards(AuthGuard('jwt'))
    update(
        @Param('id') id:string,
        @Body() updateCompanyDto: UpdateCompanyDto
    ): Promise<CompanyEntity>{
        return this.companyService.update(id, updateCompanyDto);
    }

    @Delete('id')
    @UseGuards(AuthGuard('jwt'))
    delete(@Param('id') id: string): Promise<CompanyEntity> {
        return this.companyService.delete(id);
    }

}
