"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DatabaseModule = void 0;
const common_1 = require("@nestjs/common");
const typeorm_1 = require("@nestjs/typeorm");
const config_1 = require("@nestjs/config");
const doctor_entity_1 = require("../doctors/entities/doctor.entity");
const appointment_entity_1 = require("../appointments/entities/appointment.entity");
const seed_service_1 = require("./seeds/seed.service");
let DatabaseModule = class DatabaseModule {
};
exports.DatabaseModule = DatabaseModule;
exports.DatabaseModule = DatabaseModule = __decorate([
    (0, common_1.Module)({
        imports: [
            typeorm_1.TypeOrmModule.forRootAsync({
                imports: [config_1.ConfigModule],
                useFactory: (configService) => ({
                    type: "postgres",
                    host: configService.get("DB_HOST", "localhost"),
                    port: configService.get("DB_PORT", 5432),
                    username: configService.get("DB_USERNAME", "postgres"),
                    password: configService.get("DB_PASSWORD", "Pass@123"),
                    database: configService.get("DB_NAME", "doctor_appointment"),
                    entities: [doctor_entity_1.Doctor, appointment_entity_1.Appointment],
                    synchronize: configService.get("NODE_ENV") !== "production",
                    logging: configService.get("NODE_ENV") === "development",
                }),
                inject: [config_1.ConfigService],
            }),
            typeorm_1.TypeOrmModule.forFeature([doctor_entity_1.Doctor, appointment_entity_1.Appointment]),
        ],
        providers: [seed_service_1.SeedService],
        exports: [seed_service_1.SeedService],
    })
], DatabaseModule);
//# sourceMappingURL=database.module.js.map