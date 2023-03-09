import { IsOptional, IsString } from 'class-validator';

export class CreateProjectDto {
  @IsString()
  organizationId: string;

  @IsString()
  name: string;

  @IsString()
  @IsOptional()
  description: string;

  @IsString()
  @IsOptional()
  details: string;
}
