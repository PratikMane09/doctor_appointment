import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
export declare class DoctorsController {
    private readonly doctorsService;
    constructor(doctorsService: DoctorsService);
    create(createDoctorDto: CreateDoctorDto): Promise<import("./entities/doctor.entity").Doctor>;
    findAll(paginationDto: PaginationDto): Promise<{
        data: import("./entities/doctor.entity").Doctor[];
        pagination: {
            page: number;
            limit: number;
            total: number;
            totalPages: number;
        };
    }>;
    findOne(id: string): Promise<import("./entities/doctor.entity").Doctor>;
    getAvailableSlots(doctorId: string, date?: string): Promise<{
        date: string;
        doctorId: string;
        availableSlots: any[];
        totalSlots: number;
        availableCount: number;
    }>;
}
