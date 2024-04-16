import { IsEmail, IsNumber, IsString } from 'class-validator';

export class ReportDto {
  @IsNumber()
  price: number;

  @IsEmail()
  email:string;
}
