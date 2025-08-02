import {
  Injectable,
  NotFoundException,
  ConflictException,
  BadRequestException,
} from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Appointment, AppointmentStatus } from "./entities/appointment.entity";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { DoctorsService } from "../doctors/doctors.service";

@Injectable()
export class AppointmentsService {
  constructor(
    @InjectRepository(Appointment)
    private appointmentsRepository: Repository<Appointment>,
    private doctorsService: DoctorsService
  ) {}

  async create(
    createAppointmentDto: CreateAppointmentDto
  ): Promise<Appointment> {
    await this.doctorsService.findOne(createAppointmentDto.doctorId);

    await this.validateAppointmentTime(createAppointmentDto);

    await this.checkForConflicts(createAppointmentDto);

    const appointment =
      this.appointmentsRepository.create(createAppointmentDto);
    return await this.appointmentsRepository.save(appointment);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit } = paginationDto;
    const skip = (page - 1) * limit;

    const [appointments, total] =
      await this.appointmentsRepository.findAndCount({
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

  async findOne(id: string): Promise<Appointment> {
    const appointment = await this.appointmentsRepository.findOne({
      where: { id },
      relations: ["doctor"],
    });

    if (!appointment) {
      throw new NotFoundException(`Appointment with ID ${id} not found`);
    }

    return appointment;
  }

  async cancel(id: string): Promise<Appointment> {
    const appointment = await this.findOne(id);

    if (appointment.status === AppointmentStatus.CANCELLED) {
      throw new BadRequestException("Appointment is already cancelled");
    }

    appointment.status = AppointmentStatus.CANCELLED;
    return await this.appointmentsRepository.save(appointment);
  }

  private async validateAppointmentTime(
    createAppointmentDto: CreateAppointmentDto
  ) {
    const { appointmentDate, startTime, endTime } = createAppointmentDto;

    const appointmentDateTime = new Date(`${appointmentDate}T${startTime}`);
    const endDateTime = new Date(`${appointmentDate}T${endTime}`);
    const now = new Date();

    if (appointmentDateTime <= now) {
      throw new BadRequestException("Cannot book appointments in the past");
    }

    if (endDateTime <= appointmentDateTime) {
      throw new BadRequestException("End time must be after start time");
    }

    const durationMs = endDateTime.getTime() - appointmentDateTime.getTime();
    const durationMinutes = durationMs / (1000 * 60);

    if (durationMinutes < 15 || durationMinutes > 240) {
      throw new BadRequestException(
        "Appointment duration must be between 15 minutes and 4 hours"
      );
    }
  }

  private async checkForConflicts(createAppointmentDto: CreateAppointmentDto) {
    const { doctorId, appointmentDate, startTime, endTime } =
      createAppointmentDto;

    const conflictingAppointment = await this.appointmentsRepository
      .createQueryBuilder("appointment")
      .where("appointment.doctorId = :doctorId", { doctorId })
      .andWhere("appointment.appointmentDate = :appointmentDate", {
        appointmentDate,
      })
      .andWhere("appointment.status != :cancelledStatus", {
        cancelledStatus: AppointmentStatus.CANCELLED,
      })
      .andWhere(
        "(appointment.startTime < :endTime AND appointment.endTime > :startTime)",
        { startTime, endTime }
      )
      .getOne();

    if (conflictingAppointment) {
      throw new ConflictException(
        `Doctor is not available during the requested time slot. Conflicting appointment from ${conflictingAppointment.startTime} to ${conflictingAppointment.endTime}`
      );
    }
  }
}
