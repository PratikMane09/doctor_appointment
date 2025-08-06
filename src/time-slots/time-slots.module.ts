import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { TimeSlotsService } from "./time-slots.service";

import { Appointment } from "../appointments/entities/appointment.entity";

@Module({
  imports: [TypeOrmModule.forFeature([Appointment])],
  providers: [TimeSlotsService],
  exports: [TimeSlotsService],
})
export class TimeSlotsModule {}
