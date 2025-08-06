import { Appointment } from "../../appointments/entities/appointment.entity";
export declare class Doctor {
    id: string;
    firstName: string;
    lastName: string;
    specialization: string;
    phone: string;
    email: string;
    isActive: boolean;
    workingHours: {
        start: string;
        end: string;
        days: string[];
    };
    appointments: Appointment[];
    createdAt: Date;
    updatedAt: Date;
}
