import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum, IsArray, ValidateNested } from 'class-validator';
import { STATUS } from './tracking.enum';
import { Type } from 'class-transformer';


class MilestoneDto {

  @IsNotEmpty()
  @IsString()
  public name: string;

  @IsEnum(STATUS)
  @IsOptional()
  public status?: STATUS;

  @IsOptional()
  public completionDate?: Date;
}


export class CreateTrackingDto {

  @IsNotEmpty()
  @IsString()
  public siteId: string;

  @IsOptional()
  @IsNumber()
  public progressPercentage?: number;

  @IsArray()
  public milestones: MilestoneDto[];


}
