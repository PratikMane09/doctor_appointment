import { Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_FILTER } from "@nestjs/core";
import { DatabaseModule } from "./database/database.module";
import { DoctorsModule } from "./doctors/doctors.module";
import { AppointmentsModule } from "./appointments/appointments.module";
import { TimeSlotsModule } from "./time-slots/time-slots.module";
import { HttpExceptionFilter } from "./common/filters/http-exception.filter";

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    DatabaseModule,
    DoctorsModule,
    AppointmentsModule,
    TimeSlotsModule,
  ],
  providers: [
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
  ],
})
export class AppModule {}
