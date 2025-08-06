"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const typeorm_1 = require("typeorm");
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const doctor_entity_1 = require("../doctors/entities/doctor.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
(0, dotenv_1.config)();
const configService = new config_1.ConfigService();
exports.default = new typeorm_1.DataSource({
    type: "postgres",
    host: configService.get("DB_HOST", "localhost"),
    port: parseInt(configService.get("DB_PORT", "5432")),
    username: configService.get("DB_USERNAME", "postgres"),
    password: configService.get("DB_PASSWORD", "Pass@123"),
    database: configService.get("DB_NAME", "doctor_appointment"),
    entities: [doctor_entity_1.Doctor, appointment_entity_1.Appointment],
    migrations: ["src/database/migrations/*{.ts,.js}"],
    migrationsTableName: "migrations_history",
    synchronize: false,
    logging: true,
});
//# sourceMappingURL=database.config.js.map