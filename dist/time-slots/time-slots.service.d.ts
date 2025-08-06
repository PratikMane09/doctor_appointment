import { Repository } from "typeorm";
import { Appointment } from "../appointments/entities/appointment.entity";
export declare class TimeSlotsService {
    private appointmentsRepository;
    constructor(appointmentsRepository: Repository<Appointment>);
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
