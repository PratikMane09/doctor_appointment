import { Doctor } from "../../doctors/entities/doctor.entity";
export declare class TimeSlot {
    id: string;
    date: Date;
    startTime: string;
    endTime: string;
    isAvailable: boolean;
    doctorId: string;
    doctor: Doctor;
    createdAt: Date;
}
