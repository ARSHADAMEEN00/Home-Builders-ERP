import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { PAYMENTMETHOD } from './payments.enum';

export class CreatePaymentDto {
  @IsNotEmpty()
  @IsString()
  public siteId: string;

  @IsNotEmpty()
  @IsNumber()
  public amount: number;

  @IsEnum(PAYMENTMETHOD)
  @IsOptional()
  public paymentMethod?: PAYMENTMETHOD;

  @IsOptional()
  public date?: Date;

  @IsOptional()
  @IsString()
  public receivedFrom?: string;

  @IsOptional()
  @IsString()
  public notes?: string;
}
