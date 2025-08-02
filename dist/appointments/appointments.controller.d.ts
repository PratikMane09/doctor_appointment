import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class AppointmentsController {
    private readonly appointmentsService;
    constructor(appointmentsService: AppointmentsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<import("./entities/appointment.entity").Appointment>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: import("./entities/appointment.entity").Appointment[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/appointment.entity").Appointment>;
    cancel(id: string): Promise<import("./entities/appointment.entity").Appointment>;
}
