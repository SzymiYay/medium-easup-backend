import { IsOptional, IsString } from 'class-validator';

export class CreateOrganizationDto {
  @IsString()
  ownerId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  mission: string;

  @IsString()
  @IsOptional()
  webpage: string;

  @IsOptional()
  @IsString()
  logo: string;

  @IsOptional()
  @IsString()
  details: string;
}
