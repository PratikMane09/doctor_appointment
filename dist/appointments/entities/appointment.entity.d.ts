import { Doctor } from "../../doctors/entities/doctor.entity";
export declare enum AppointmentStatus {
    SCHEDULED = "scheduled",
    CONFIRMED = "confirmed",
    CANCELLED = "cancelled",
    COMPLETED = "completed"
}
export declare class Appointment {
    id: string;
    patientName: string;
    patientPhone: string;
    patientEmail: string;
    appointmentDate: Date;
    startTime: string;
    endTime: string;
    status: AppointmentStatus;
    notes: string;
    doctorId: string;
    doctor: Doctor;
    createdAt: Date;
    updatedAt: Date;
}
