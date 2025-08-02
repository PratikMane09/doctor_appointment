import { Injectable, NotFoundException } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository, Like } from "typeorm";
import { Doctor } from "./entities/doctor.entity";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { PaginationDto } from "../common/dto/pagination.dto";
import { TimeSlotsService } from "../time-slots/time-slots.service";

@Injectable()
export class DoctorsService {
  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>,
    private timeSlotsService: TimeSlotsService
  ) {}

  async create(createDoctorDto: CreateDoctorDto): Promise<Doctor> {
    const doctor = this.doctorsRepository.create(createDoctorDto);
    return await this.doctorsRepository.save(doctor);
  }

  async findAll(paginationDto: PaginationDto) {
    const { page, limit, search, specialization } = paginationDto;
    const skip = (page - 1) * limit;

    const queryBuilder = this.doctorsRepository.createQueryBuilder("doctor");

    if (search) {
      queryBuilder.where(
        "(doctor.firstName ILIKE :search OR doctor.lastName ILIKE :search)",
        { search: `%${search}%` }
      );
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

  async findOne(id: string): Promise<Doctor> {
    const doctor = await this.doctorsRepository.findOne({
      where: { id, isActive: true },
    });

    if (!doctor) {
      throw new NotFoundException(`Doctor with ID ${id} not found`);
    }

    return doctor;
  }

  async getAvailableSlots(doctorId: string, date?: string) {
    await this.findOne(doctorId);
    return this.timeSlotsService.getAvailableSlots(doctorId, date);
  }
}
