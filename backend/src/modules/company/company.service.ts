import { HttpException, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { COMPANIES_REPOSITORY } from 'src/core/constants';
import { Company } from './company.entity';
import { CompanyDto } from './dto/company.dto';
import { CreateCompanyDto } from './dto/createCompany.dto';
import { UpdateCompanyDto } from './dto/updateCompany.dto';

@Injectable()
export class CompanyService {
    constructor(
    @Inject(COMPANIES_REPOSITORY) private readonly companiesRepository: typeof Company
    ){}

    async findAll() {
        const companies = await this.companiesRepository.findAll<Company>();
        return companies.map(company => new CompanyDto(company));
    }
    async getCompany(id: string) {
        const company = await this.companiesRepository.findByPk<Company>(id);
        if(!company){
            throw new HttpException(
                'Company with given id does not exist',
                HttpStatus.NOT_FOUND,
            );
        }
        return new CompanyDto(company);
    }
    async getCompanyByName(name: string) {
        return await this.companiesRepository.findOne<Company>({
            where: { name },
        });
    }
    async create(createCompanyDto: CreateCompanyDto) {
       
            const company = new Company();
            company.name = createCompanyDto.name;
            company.department = createCompanyDto.department;
            company.position = createCompanyDto.position;
            company.salary = createCompanyDto. salary;
            return company.save();
        
    }
    async update(id: string, updateCompanyDto: UpdateCompanyDto){
        const company = await this.companiesRepository.findByPk<Company>(id);
        if(!company){
            throw new HttpException('Company not found', HttpStatus.NOT_FOUND);
        }
        company.name = updateCompanyDto.name || company.name;
        company.department = updateCompanyDto.department || company.department;
        company.position = updateCompanyDto.position || company.position;
        company.salary = updateCompanyDto.salary || company.salary;

        return company.save();
    }
    async delete(id: string){
        const company = await this.companiesRepository.findByPk<Company>(id);
        await company.destroy();
        return company;
    }


}
