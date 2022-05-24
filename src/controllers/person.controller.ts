import { Body, Controller, Delete, Get, NotFoundException, Param, ParseIntPipe, Post, Put, ValidationPipe } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { PersonModel } from "src/models/person.model";
import { Repository } from "typeorm";
import { PersonSchema } from "src/schemas/person.schema";

@Controller('/person')

export class PersonController{
    constructor(
        @InjectRepository(PersonModel) private model: Repository<PersonModel>
        ) {}

    @Post()
    public async create(@Body(ValidationPipe) body: PersonSchema
    ): Promise<{ data : PersonModel }> {
        const personCreated = await this.model.save(body);
        return { data : personCreated};
    }

    @Get(':id')
    public async getOne(@Param('id', ParseIntPipe) id:number,
    ): Promise<{ data:PersonModel }> {
        const person = await this.model.findOne({ where: { id } });
        if (!person) {
            throw new NotFoundException(`Error 404!`);
        }
        return { data : person };
    }

    @Get()
    public async getAll(): Promise<{ data: PersonModel[]}> {
        const list = await this.model.find();
        return { data : list};
    }

    @Put(':id')
    public async update(
        @Param(`id`, ParseIntPipe) id: number,
        @Body() body: PersonSchema,
    ): Promise<{ data: PersonModel }> {
        const person = await this.model.findOne({ where: {id} });

        if(!person) {
            throw new NotFoundException(`Error 404`);
        }

        await this.model.update({ id }, body);

        return { data : await this.model.findOne({ where: {id} })};
    }

    @Delete(':id')
    public async delete(
        @Param(`id`, ParseIntPipe) id: number,
    ): Promise<{ data: string }> {
        const person = await this.model.findOne({ where: {id} });

        if(!person){
            throw new NotFoundException(`Eror 404!`);
        }

        await this.model.delete(id);

        return { data : `Deletado a pessoa com ID ${id}`};
    }
}