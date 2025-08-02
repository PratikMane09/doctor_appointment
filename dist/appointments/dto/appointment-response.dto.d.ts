import { AppointmentStatus } from "../entities/appointment.entity";
export declare class AppointmentResponseDto {
    id: string;
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    notes?: string;
    doctorId: string;
    createdAt: Date;
}
