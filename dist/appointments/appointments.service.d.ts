import { Repository } from "typeorm";
import { Appointment } from "./entities/appointment.entity";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { DoctorsService } from "../doctors/doctors.service";
export declare class AppointmentsService {
    private appointmentsRepository;
    private doctorsService;
    constructor(appointmentsRepository: Repository<Appointment>, doctorsService: DoctorsService);
    create(createAppointmentDto: CreateAppointmentDto): Promise<Appointment>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Appointment[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<Appointment>;
    cancel(id: string): Promise<Appointment>;
    private validateAppointmentTime;
    private checkForConflicts;
}
