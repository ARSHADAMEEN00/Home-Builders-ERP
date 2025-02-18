import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { STATUS } from './site.enum';
export class CreateSite {
  @IsNotEmpty()
  @IsString()
  public name: string;


  @IsNotEmpty()
  @IsString()
  public location: string;

  @IsNotEmpty()
  @IsString()
  public clientName: string;

  @IsNotEmpty()
  @IsString()
  public clientContact: string;

  @IsEnum(STATUS)
  // @IsNotEmpty()
  @IsOptional()
  public status?: STATUS;
}
