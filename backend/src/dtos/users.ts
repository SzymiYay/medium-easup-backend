import { IsEmail, IsOptional, IsString } from "class-validator";

export class RegisterUserDto {

    @IsEmail()
    email: string

    @IsString()
    name: string

    @IsString()
    surname: string

    @IsString()
    nickname: string

    @IsString()
    password: string

    @IsString()
    @IsOptional()
    descriptrion: string

    @IsString()
    @IsOptional()
    photo: string
}

export class LoginUserDto {
    @IsEmail()
    email: string

    @IsString()
    password: string
}