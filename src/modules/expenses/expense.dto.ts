import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { CATEGORY } from './expense.enum';
export class CreateExpenseDto {
  @IsNotEmpty()
  @IsString()
  public siteId: string;

  @IsEnum(CATEGORY)
  @IsNotEmpty()
  // @IsOptional()
  public category?: CATEGORY;

  @IsNotEmpty()
  @IsString()
  public item: string;

  @IsNotEmpty()
  @IsNumber()
  public amount: number;

  @IsOptional()
  public date?: Date;

  @IsNotEmpty()
  @IsString()
  public description: string;
}
