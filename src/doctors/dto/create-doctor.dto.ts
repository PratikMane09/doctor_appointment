import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsOptional,
  IsObject,
  IsArray,
  IsBoolean,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateDoctorDto {
  @ApiProperty({ example: "Pratik" })
  @IsString()
  firstName: string;

  @ApiProperty({ example: "Mane" })
  @IsString()
  lastName: string;

  @ApiProperty({ example: "Cardiology" })
  @IsString()
  specialization: string;

  @ApiProperty({ example: "+917038698440" })
  @IsPhoneNumber()
  phone: string;

  @ApiProperty({ example: "pratik.mane@hospital.com" })
  @IsEmail()
  email: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsBoolean()
  isActive?: boolean;

  @ApiProperty({
    required: false,
    example: {
      start: "09:00",
      end: "17:00",
      days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
    },
  })
  @IsOptional()
  @IsObject()
  workingHours?: {
    start: string;
    end: string;
    days: string[];
  };
}
