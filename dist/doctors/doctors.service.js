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
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const doctor_entity_1 = require("./entities/doctor.entity");
const time_slots_service_1 = require("../time-slots/time-slots.service");
let DoctorsService = class DoctorsService {
    constructor(doctorsRepository, timeSlotsService) {
        this.doctorsRepository = doctorsRepository;
        this.timeSlotsService = timeSlotsService;
    }
    async create(createDoctorDto) {
        const doctor = this.doctorsRepository.create(createDoctorDto);
        return await this.doctorsRepository.save(doctor);
    }
    async findAll(paginationDto) {
        const { page, limit, search, specialization } = paginationDto;
        const skip = (page - 1) * limit;
        const queryBuilder = this.doctorsRepository.createQueryBuilder("doctor");
        if (search) {
            queryBuilder.where("(doctor.firstName ILIKE :search OR doctor.lastName ILIKE :search)", { search: `%${search}%` });
        }
        if (specialization) {
            queryBuilder.andWhere("doctor.specialization ILIKE :specialization", {
                specialization: `%${specialization}%`,
            });
        }
        queryBuilder
            .andWhere("doctor.isActive = :isActive", { isActive: true })
            .orderBy("doctor.firstName", "ASC")
            .skip(skip)
            .take(limit);
        const [doctors, total] = await queryBuilder.getManyAndCount();
        return {
            data: doctors,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const doctor = await this.doctorsRepository.findOne({
            where: { id, isActive: true },
        });
        if (!doctor) {
            throw new common_1.NotFoundException(`Doctor with ID ${id} not found`);
        }
        return doctor;
    }
    async getAvailableSlots(doctorId, date) {
        await this.findOne(doctorId);
        return this.timeSlotsService.getAvailableSlots(doctorId, date);
    }
};
exports.DoctorsService = DoctorsService;
exports.DoctorsService = DoctorsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(doctor_entity_1.Doctor)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        time_slots_service_1.TimeSlotsService])
], DoctorsService);
//# sourceMappingURL=doctors.service.js.map