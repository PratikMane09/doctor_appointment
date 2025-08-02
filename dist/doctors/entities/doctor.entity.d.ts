import { Appointment } from "../../appointments/entities/appointment.entity";
import { TimeSlot } from "../../time-slots/entities/time-slot.entity";
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
    timeSlots: TimeSlot[];
    createdAt: Date;
    updatedAt: Date;
}
