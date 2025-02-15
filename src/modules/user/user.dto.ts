import { IsOptional, IsString, IsBoolean, IsNumber, IsNotEmpty, IsEnum } from 'class-validator';
import { ROLE } from './user.enum';

export class SignupUser {
  @IsNotEmpty()
  @IsString()
  public name: string;

  // @IsNotEmpty()
  // @IsString()
  // public username: string;

  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;

  @IsEnum(ROLE)
  @IsOptional()
  public role?: ROLE;
}

export class LoginUser {
  @IsNotEmpty()
  @IsString()
  public email: string;

  @IsNotEmpty()
  @IsString()
  public password: string;
}

export class userId {
  @IsNotEmpty()
  @IsString()
  public userId: string;
}

export class UpdateUser {
  // @IsNotEmpty()
  // @IsString()
  // public _id:string;

  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public username: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;
}

export class UpdateUserDto {
  @IsOptional()
  @IsString()
  public name: string;

  @IsOptional()
  @IsString()
  public username: string;

  @IsOptional()
  @IsString()
  public email: string;

  @IsOptional()
  @IsString()
  public password: string;
}
