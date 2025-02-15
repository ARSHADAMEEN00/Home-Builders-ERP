import { IsNotEmpty, IsString, IsOptional, IsBoolean, IsNumber, isNotEmpty } from 'class-validator';

export class UploadImageDto {
  @IsNotEmpty()
  @IsString()
  public image: string;
}

export class DeleteImageDto {
  @IsNotEmpty()
  @IsString()
  public public_id: string;
}
