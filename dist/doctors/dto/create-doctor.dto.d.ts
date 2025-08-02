export declare class CreateDoctorDto {
    firstName: string;
    lastName: string;
    specialization: string;
    phone: string;
    email: string;
    isActive?: boolean;
    workingHours?: {
        start: string;
        end: string;
        days: string[];
    };
}
