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
exports.TimeSlotsService = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const typeorm_2 = require("typeorm");
const time_slot_entity_1 = require("./entities/time-slot.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
let TimeSlotsService = class TimeSlotsService {
    constructor(timeSlotsRepository, appointmentsRepository) {
        this.timeSlotsRepository = timeSlotsRepository;
        this.appointmentsRepository = appointmentsRepository;
    }
    async getAvailableSlots(doctorId, date) {
        const targetDate = date ? new Date(date) : new Date();
        const slots = this.generateTimeSlots(targetDate);
        const bookedAppointments = await this.appointmentsRepository.find({
            where: {
                doctorId,
                appointmentDate: targetDate,
                status: appointment_entity_1.AppointmentStatus.SCHEDULED || appointment_entity_1.AppointmentStatus.CONFIRMED,
            },
        });
        const availableSlots = slots.filter((slot) => {
            return !bookedAppointments.some((appointment) => this.isTimeOverlapping(slot.startTime, slot.endTime, appointment.startTime, appointment.endTime));
        });
        return {
            date: targetDate.toISOString().split("T")[0],
            doctorId,
            availableSlots,
            totalSlots: slots.length,
            availableCount: availableSlots.length,
        };
    }
    generateTimeSlots(date) {
        const slots = [];
        const startHour = 9;
        const endHour = 17;
        const slotDuration = 30;
        for (let hour = startHour; hour < endHour; hour++) {
            for (let minutes = 0; minutes < 60; minutes += slotDuration) {
                const startTime = `${hour.toString().padStart(2, "0")}:${minutes
                    .toString()
                    .padStart(2, "0")}`;
                const endMinutes = minutes + slotDuration;
                const endHour = endMinutes >= 60 ? hour + 1 : hour;
                const adjustedEndMinutes = endMinutes >= 60 ? endMinutes - 60 : endMinutes;
                const endTime = `${endHour
                    .toString()
                    .padStart(2, "0")}:${adjustedEndMinutes.toString().padStart(2, "0")}`;
                if (endHour <= endHour) {
                    slots.push({
                        startTime,
                        endTime,
                        date: date.toISOString().split("T")[0],
                    });
                }
            }
        }
        return slots;
    }
    isTimeOverlapping(slot1Start, slot1End, slot2Start, slot2End) {
        return slot1Start < slot2End && slot1End > slot2Start;
    }
};
exports.TimeSlotsService = TimeSlotsService;
exports.TimeSlotsService = TimeSlotsService = __decorate([
    (0, common_1.Injectable)(),
    __param(0, (0, typeorm_1.InjectRepository)(time_slot_entity_1.TimeSlot)),
    __param(1, (0, typeorm_1.InjectRepository)(appointment_entity_1.Appointment)),
    __metadata("design:paramtypes", [typeorm_2.Repository,
        typeorm_2.Repository])
], TimeSlotsService);
//# sourceMappingURL=time-slots.service.js.map