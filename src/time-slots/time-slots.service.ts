import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

import {
  Appointment,
  AppointmentStatus,
} from "../appointments/entities/appointment.entity";

@Injectable()
export class TimeSlotsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>
  ) {}

  async getAvailableSlots(doctorId: string, date?: string) {
    const targetDate = date ? new Date(date) : new Date();

    const slots = this.generateTimeSlots(targetDate);

    const bookedAppointments = await this.appointmentsRepository.find({
      where: {
        doctorId,
        appointmentDate: targetDate,
        status: AppointmentStatus.SCHEDULED || AppointmentStatus.CONFIRMED,
      },
    });

    // Filter out booked slots
    const availableSlots = slots.filter((slot) => {
      return !bookedAppointments.some((appointment) =>
        this.isTimeOverlapping(
          slot.startTime,
          slot.endTime,
          appointment.startTime,
          appointment.endTime
        )
      );
    });

    return {
      date: targetDate.toISOString().split("T")[0],
      doctorId,
      availableSlots,
      totalSlots: slots.length,
      availableCount: availableSlots.length,
    };
  }

  private generateTimeSlots(date: Date) {
    const slots = [];
    const startHour = 9; // 9 AM
    const endHour = 17; // 5 PM
    const slotDuration = 30; // 30 minutes

    for (let hour = startHour; hour < endHour; hour++) {
      for (let minutes = 0; minutes < 60; minutes += slotDuration) {
        const startTime = `${hour.toString().padStart(2, "0")}:${minutes
          .toString()
          .padStart(2, "0")}`;
        const endMinutes = minutes + slotDuration;
        const endHour = endMinutes >= 60 ? hour + 1 : hour;
        const adjustedEndMinutes =
          endMinutes >= 60 ? endMinutes - 60 : endMinutes;
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

  private isTimeOverlapping(
    slot1Start: string,
    slot1End: string,
    slot2Start: string,
    slot2End: string
  ): boolean {
    return slot1Start < slot2End && slot1End > slot2Start;
  }
}
