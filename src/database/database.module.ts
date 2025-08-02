import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { Doctor } from "../doctors/entities/doctor.entity";
import { Appointment } from "../appointments/entities/appointment.entity";
import { TimeSlot } from "../time-slots/entities/time-slot.entity";
import { SeedService } from "./seeds/seed.service";

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("DB_HOST", "localhost"),
        port: configService.get("DB_PORT", 5432),
        username: configService.get("DB_USERNAME", "postgres"),
        password: configService.get("DB_PASSWORD", "password"),
        database: configService.get("DB_NAME", "doctor_appointment"),
        entities: [Doctor, Appointment, TimeSlot],
        synchronize: configService.get("NODE_ENV") !== "production",
        logging: configService.get("NODE_ENV") === "development",
      }),
      inject: [ConfigService],
    }),
    TypeOrmModule.forFeature([Doctor, Appointment, TimeSlot]),
  ],
  providers: [SeedService],
  exports: [SeedService],
})
export class DatabaseModule {}
