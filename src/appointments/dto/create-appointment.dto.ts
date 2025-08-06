import {
  IsString,
  IsEmail,
  IsPhoneNumber,
  IsDateString,
  IsUUID,
  IsOptional,
  Matches,
} from "class-validator";
import { ApiProperty } from "@nestjs/swagger";

export class CreateAppointmentDto {
  @ApiProperty({ example: "Pratik Mane" })
  @IsString()
  patientName: string;

  @ApiProperty({ example: "+917038698440" })
  @IsPhoneNumber()
  patientPhone: string;

  @ApiProperty({ example: "pratik.mane@gmail.com" })
  @IsEmail()
  patientEmail: string;

  @ApiProperty({ example: "2025-08-15" })
  @IsDateString()
  appointmentDate: string;

  @ApiProperty({ example: "10:00" })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "startTime must be in HH:MM format",
  })
  startTime: string;

  @ApiProperty({ example: "10:30" })
  @Matches(/^([0-1]?[0-9]|2[0-3]):[0-5][0-9]$/, {
    message: "endTime must be in HH:MM format",
  })
  endTime: string;

  @ApiProperty()
  @IsUUID()
  doctorId: string;

  @ApiProperty({ required: false })
  @IsOptional()
  @IsString()
  notes?: string;
}
