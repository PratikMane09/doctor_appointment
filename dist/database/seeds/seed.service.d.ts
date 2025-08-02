import { Repository } from "typeorm";
import { Doctor } from "../../doctors/entities/doctor.entity";
export declare class SeedService {
    private doctorsRepository;
    private readonly logger;
    constructor(doctorsRepository: Repository<Doctor>);
    seedDoctors(): Promise<void>;
}
