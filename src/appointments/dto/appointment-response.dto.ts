import { ApiProperty } from "@nestjs/swagger";
import { AppointmentStatus } from "../entities/appointment.entity";

export class AppointmentResponseDto {
  @ApiProperty()
  id: string;

  @ApiProperty()
  patientName: string;

  @ApiProperty()
  patientPhone: string;

  @ApiProperty()
  patientEmail: string;

  @ApiProperty()
  appointmentDate: Date;

  @ApiProperty()
  startTime: string;

  @ApiProperty()
  endTime: string;

  @ApiProperty({ enum: AppointmentStatus })
  status: AppointmentStatus;

  @ApiProperty({ required: false })
  notes?: string;

  @ApiProperty()
  doctorId: string;

  @ApiProperty()
  createdAt: Date;
}
