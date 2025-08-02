"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
var SeedService_1;
Object.defineProperty(exports, "__esModule", { value: true });
exports.SeedService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("../../doctors/entities/doctor.entity");
let SeedService = SeedService_1 = class SeedService {
    constructor(doctorsRepository) {
        this.doctorsRepository = doctorsRepository;
        this.logger = new common_1.Logger(SeedService_1.name);
    }
    async seedDoctors() {
        const existingDoctors = await this.doctorsRepository.count();
        if (existingDoctors > 0) {
            this.logger.log("Doctors already exist, skipping seed");
            return;
        }
        const doctorsData = [
            {
                firstName: "John",
                lastName: "Smith",
                specialization: "Cardiology",
                phone: "+1234567890",
                email: "john.smith@hospital.com",
                workingHours: {
                    start: "09:00",
                    end: "17:00",
                    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
                },
            },
            {
                firstName: "Sarah",
                lastName: "Johnson",
                specialization: "Dermatology",
                phone: "+1234567891",
                email: "sarah.johnson@hospital.com",
                workingHours: {
                    start: "08:00",
                    end: "16:00",
                    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
                },
            },
            {
                firstName: "Michael",
                lastName: "Brown",
                specialization: "Orthopedics",
                phone: "+1234567892",
                email: "michael.brown@hospital.com",
                workingHours: {
                    start: "10:00",
                    end: "18:00",
                    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
                },
            },
            {
                firstName: "Emily",
                lastName: "Davis",
                specialization: "Pediatrics",
                phone: "+1234567893",
                email: "emily.davis@hospital.com",
                workingHours: {
                    start: "09:00",
                    end: "17:00",
                    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
                },
            },
            {
                firstName: "David",
                lastName: "Wilson",
                specialization: "Neurology",
                phone: "+1234567894",
                email: "david.wilson@hospital.com",
                workingHours: {
                    start: "08:30",
                    end: "16:30",
                    days: ["monday", "tuesday", "wednesday", "thursday", "friday"],
                },
            },
        ];
        try {
            await this.doctorsRepository.save(doctorsData);
            this.logger.log(`Seeded ${doctorsData.length} doctors successfully`);
        }
        catch (error) {
            this.logger.error("Failed to seed doctors", error);
        }
    }
};
exports.SeedService = SeedService;
exports.SeedService = SeedService = SeedService_1 = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository])
], SeedService);
//# sourceMappingURL=seed.service.js.map