import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { DoctorsService } from "./doctors.service";
import { DoctorsController } from "./doctors.controller";
import { Doctor } from "./entities/doctor.entity";
import { TimeSlotsModule } from "../time-slots/time-slots.module";

@Module({
  imports: [TypeOrmModule.forFeature([Doctor]), TimeSlotsModule],
  controllers: [DoctorsController],
  providers: [DoctorsService],
  exports: [DoctorsService],
})
export class DoctorsModule {}
