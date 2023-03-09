import { IsOptional, IsString } from "class-validator"

export class CreateSectionDto {
    
    @IsString()
    boardId: string
    
    @IsString()
    name: string

    @IsString()
    @IsOptional()
    description: string
}