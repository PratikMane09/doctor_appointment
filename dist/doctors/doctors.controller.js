"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};
var __param = (this && this.__param) || function (paramIndex, decorator) {
    return function (target, key) { decorator(target, key, paramIndex); }
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.DoctorsController = void 0;
const common_1 = require("@nestjs/common");
const swagger_1 = require("@nestjs/swagger");
const doctors_service_1 = require("./doctors.service");
const create_doctor_dto_1 = require("./dto/create-doctor.dto");
const pagination_dto_1 = require("../common/dto/pagination.dto");
let DoctorsController = class DoctorsController {
    constructor(doctorsService) {
        this.doctorsService = doctorsService;
    }
    create(createDoctorDto) {
        return this.doctorsService.create(createDoctorDto);
    }
    findAll(paginationDto) {
        return this.doctorsService.findAll(paginationDto);
    }
    findOne(id) {
        return this.doctorsService.findOne(id);
    }
    getAvailableSlots(doctorId, date) {
        return this.doctorsService.getAvailableSlots(doctorId, date);
    }
};
exports.DoctorsController = DoctorsController;
__decorate([
    (0, common_1.Post)(),
    (0, swagger_1.ApiOperation)({ summary: "Create a new doctor" }),
    (0, swagger_1.ApiResponse)({ status: 201, description: "Doctor created successfully" }),
    __param(0, (0, common_1.Body)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [create_doctor_dto_1.CreateDoctorDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "create", null);
__decorate([
    (0, common_1.Get)(),
    (0, swagger_1.ApiOperation)({ summary: "Get all doctors with pagination and filtering" }),
    (0, swagger_1.ApiQuery)({ name: "page", required: false, example: 1 }),
    (0, swagger_1.ApiQuery)({ name: "limit", required: false, example: 10 }),
    (0, swagger_1.ApiQuery)({ name: "specialization", required: false, example: "Cardiology" }),
    (0, swagger_1.ApiQuery)({ name: "search", required: false, example: "John" }),
    __param(0, (0, common_1.Query)()),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [pagination_dto_1.PaginationDto]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findAll", null);
__decorate([
    (0, common_1.Get)(":id"),
    (0, swagger_1.ApiOperation)({ summary: "Get doctor by ID" }),
    (0, swagger_1.ApiResponse)({ status: 200, description: "Doctor found" }),
    (0, swagger_1.ApiResponse)({ status: 404, description: "Doctor not found" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "findOne", null);
__decorate([
    (0, common_1.Get)(":id/available-slots"),
    (0, swagger_1.ApiOperation)({ summary: "Get available time slots for a doctor" }),
    (0, swagger_1.ApiQuery)({ name: "date", required: false, example: "2024-08-15" }),
    __param(0, (0, common_1.Param)("id", common_1.ParseUUIDPipe)),
    __param(1, (0, common_1.Query)("date")),
    __metadata("design:type", Function),
    __metadata("design:paramtypes", [String, String]),
    __metadata("design:returntype", void 0)
], DoctorsController.prototype, "getAvailableSlots", null);
exports.DoctorsController = DoctorsController = __decorate([
    (0, swagger_1.ApiTags)("Doctors"),
    (0, common_1.Controller)("api/v1/doctors"),
    __metadata("design:paramtypes", [doctors_service_1.DoctorsService])
], DoctorsController);
//# sourceMappingURL=doctors.controller.js.map