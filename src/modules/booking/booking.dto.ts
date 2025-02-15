import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { BOOKING_STATUS } from './booking.enum';


export class CreateBookingDto {
    @IsOptional()
    @IsString()
    public booking_code?: string;
  
    @IsNotEmpty()
    @IsString()
    public user: string;
  
    @IsNotEmpty()
    @IsNumber()
    public booking_amount: number;
  
    @IsOptional()
    @IsString()
    public rental_start_date: Date;
  
    @IsOptional()
    @IsString()
    public rental_end_date: Date;
  
    @IsOptional()
    @IsEnum(BOOKING_STATUS)
    public status: BOOKING_STATUS;
  
    @IsOptional()
    @IsString()
    public latest_status_updated_date: Date;
  
    @IsOptional()
    @IsBoolean()
    public is_payment_returned: boolean;
  
    @IsOptional()
    @IsString()
    public payment_returned_date: Date;
  
    @IsOptional()
    @IsString()
    public remarks: string;
  
    @IsOptional()
    @IsBoolean()
    public is_deleted: boolean;
  }

  export class ConfirmBookingDto {
    @IsNotEmpty()
    @IsString()
    public id: string;
  
    @IsNotEmpty()
    @IsEnum(BOOKING_STATUS)
    public status: BOOKING_STATUS;
  }