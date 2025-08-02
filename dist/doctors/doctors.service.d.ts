import { Repository } from "typeorm";
import { Doctor } from "./entities/doctor.entity";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { TimeSlotsService } from "../time-slots/time-slots.service";
export declare class DoctorsService {
    private doctorsRepository;
    private timeSlotsService;
    constructor(doctorsRepository: Repository<Doctor>, timeSlotsService: TimeSlotsService);
    create(createDoctorDto: CreateDoctorDto): Promise<Doctor>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: Doctor[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<Doctor>;
    getAvailableSlots(doctorId: string, date?: string): Promise<{
        date: string;
        doctorId: string;
        availableSlots: any[];
        totalSlots: number;
        availableCount: number;
    }>;
}
