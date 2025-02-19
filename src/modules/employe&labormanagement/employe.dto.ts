import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { ROLE, WORKSTATUS } from './employe.enum';

export class Create_employe_laborDto {
  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsEnum(ROLE)
  @IsOptional()
  public role?: ROLE;

  @IsNotEmpty()
  @IsString()
  public contact: string;

  @IsNotEmpty()
  @IsString()
  public assignedSite: string;

  @IsEnum(WORKSTATUS)
  @IsOptional()
  public workStatus?: WORKSTATUS;

}
