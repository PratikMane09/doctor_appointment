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
exports.AppointmentsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const appointment_entity_1 = require("./entities/appointment.entity");
const doctors_service_1 = require("../doctors/doctors.service");
let AppointmentsService = class AppointmentsService {
    constructor(appointmentsRepository, doctorsService) {
        this.appointmentsRepository = appointmentsRepository;
        this.doctorsService = doctorsService;
    }
    async create(createAppointmentDto) {
        await this.doctorsService.findOne(createAppointmentDto.doctorId);
        await this.validateAppointmentTime(createAppointmentDto);
        await this.checkForConflicts(createAppointmentDto);
        const appointment = this.appointmentsRepository.create(createAppointmentDto);
        return await this.appointmentsRepository.save(appointment);
    }
    async findAll(paginationDto) {
        const { page, limit } = paginationDto;
        const skip = (page - 1) * limit;
        const [appointments, total] = await this.appointmentsRepository.findAndCount({
            relations: ["doctor"],
            order: { appointmentDate: "ASC", startTime: "ASC" },
            skip,
            take: limit,
        });
        return {
            data: appointments,
            pagination: {
                page,
                limit,
                total,
                totalPages: Math.ceil(total / limit),
            },
        };
    }
    async findOne(id) {
        const appointment = await this.appointmentsRepository.findOne({
            where: { id },
            relations: ["doctor"],
        });
        if (!appointment) {
            throw new common_1.NotFoundException(`Appointment with ID ${id} not found`);
        }
        return appointment;
    }
    async cancel(id) {
        const appointment = await this.findOne(id);
        if (appointment.status === appointment_entity_1.AppointmentStatus.CANCELLED) {
            throw new common_1.BadRequestException("Appointment is already cancelled");
        }
        appointment.status = appointment_entity_1.AppointmentStatus.CANCELLED;
        return await this.appointmentsRepository.save(appointment);
    }
    async validateAppointmentTime(createAppointmentDto) {
        const { appointmentDate, startTime, endTime } = createAppointmentDto;
        const appointmentDateTime = new Date(`${appointmentDate}T${startTime}`);
        const endDateTime = new Date(`${appointmentDate}T${endTime}`);
        const now = new Date();
        if (appointmentDateTime <= now) {
            throw new common_1.BadRequestException("Cannot book appointments in the past");
        }
        if (endDateTime <= appointmentDateTime) {
            throw new common_1.BadRequestException("End time must be after start time");
        }
        const durationMs = endDateTime.getTime() - appointmentDateTime.getTime();
        const durationMinutes = durationMs / (1000 * 60);
        if (durationMinutes < 15 || durationMinutes > 240) {
            throw new common_1.BadRequestException("Appointment duration must be between 15 minutes and 4 hours");
        }
    }
    async checkForConflicts(createAppointmentDto) {
        const { doctorId, appointmentDate, startTime, endTime } = createAppointmentDto;
        const conflictingAppointment = await this.appointmentsRepository
            .createQueryBuilder("appointment")
            .where("appointment.doctorId = :doctorId", { doctorId })
            .andWhere("appointment.appointmentDate = :appointmentDate", {
            appointmentDate,
        })
            .andWhere("appointment.status != :cancelledStatus", {
            cancelledStatus: appointment_entity_1.AppointmentStatus.CANCELLED,
        })
            .andWhere("(appointment.startTime < :endTime AND appointment.endTime > :startTime)", { startTime, endTime })
            .getOne();
        if (conflictingAppointment) {
            throw new common_1.ConflictException(`Doctor is not available during the requested time slot. Conflicting appointment from ${conflictingAppointment.startTime} to ${conflictingAppointment.endTime}`);
        }
    }
};
exports.AppointmentsService = AppointmentsService;
exports.AppointmentsService = AppointmentsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        doctors_service_1.DoctorsService])
], AppointmentsService);
//# sourceMappingURL=appointments.service.js.map