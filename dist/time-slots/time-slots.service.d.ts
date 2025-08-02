import { Repository } from "typeorm";
import { TimeSlot } from "./entities/time-slot.entity";
import { Appointment } from "../appointments/entities/appointment.entity";
export declare class TimeSlotsService {
    private timeSlotsRepository;
    private appointmentsRepository;
    constructor(timeSlotsRepository: Repository<TimeSlot>, appointmentsRepository: Repository<Appointment>);
    getAvailableSlots(doctorId: string, date?: string): Promise<{
        date: string;
        doctorId: string;
        availableSlots: any[];
        totalSlots: number;
        availableCount: number;
    }>;
    private generateTimeSlots;
    private isTimeOverlapping;
}
