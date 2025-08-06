import { DataSource } from "typeorm";
import { ConfigService } from "@nestjs/config";
import { config } from "dotenv";

import { Doctor } from "../doctors/entities/doctor.entity";
import { Appointment } from "../appointments/entities/appointment.entity";

config();

const configService = new ConfigService();

export default new DataSource({
  type: "postgres",
  host: configService.get("DB_HOST", "localhost"),
  port: parseInt(configService.get("DB_PORT", "5432")),
  username: configService.get("DB_USERNAME", "postgres"),
  password: configService.get("DB_PASSWORD", "Pass@123"),
  database: configService.get("DB_NAME", "doctor_appointment"),
  entities: [Doctor, Appointment],
  migrations: ["src/database/migrations/*{.ts,.js}"],
  migrationsTableName: "migrations_history",
  synchronize: false,
  logging: true,
});
