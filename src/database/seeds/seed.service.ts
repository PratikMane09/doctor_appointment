import { Injectable, Logger } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Doctor } from "../../doctors/entities/doctor.entity";

@Injectable()
export class SeedService {
  private readonly logger = new Logger(SeedService.name);

  constructor(
    @InjectRepository(Doctor)
    private doctorsRepository: Repository<Doctor>
  ) {}

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
        phone: "+911234567890",
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
        phone: "+911234567891",
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
        phone: "+911234567892",
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
        phone: "+911234567893",
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
        phone: "+911234567894",
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
    } catch (error) {
      this.logger.error("Failed to seed doctors", error);
    }
  }
}
