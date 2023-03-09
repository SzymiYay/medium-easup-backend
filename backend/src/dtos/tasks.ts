import { IsOptional, IsString } from "class-validator"

export class CreateTaskDto {

    @IsString()
    sectionId: string

    @IsString()
    name: string

    @IsString()
    @IsOptional()
    description: string

    @IsString()
    @IsOptional()
    deadline: string
}