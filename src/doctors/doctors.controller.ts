import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse, ApiQuery } from "@nestjs/swagger";
import { DoctorsService } from "./doctors.service";
import { CreateDoctorDto } from "./dto/create-doctor.dto";
import { PaginationDto } from "../common/dto/pagination.dto";

@ApiTags("Doctors")
@Controller("api/v1/doctors")
export class DoctorsController {
  constructor(private readonly doctorsService: DoctorsService) {}

  @Post()
  @ApiOperation({ summary: "Create a new doctor" })
  @ApiResponse({ status: 201, description: "Doctor created successfully" })
  create(@Body() createDoctorDto: CreateDoctorDto) {
    return this.doctorsService.create(createDoctorDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all doctors with pagination and filtering" })
  @ApiQuery({ name: "page", required: false, example: 1 })
  @ApiQuery({ name: "limit", required: false, example: 10 })
  @ApiQuery({ name: "specialization", required: false, example: "Cardiology" })
  @ApiQuery({ name: "search", required: false, example: "John" })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.doctorsService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get doctor by ID" })
  @ApiResponse({ status: 200, description: "Doctor found" })
  @ApiResponse({ status: 404, description: "Doctor not found" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.doctorsService.findOne(id);
  }

  @Get(":id/available-slots")
  @ApiOperation({ summary: "Get available time slots for a doctor" })
  @ApiQuery({ name: "date", required: false, example: "2024-08-15" })
  getAvailableSlots(
    @Param("id", ParseUUIDPipe) doctorId: string,
    @Query("date") date?: string
  ) {
    return this.doctorsService.getAvailableSlots(doctorId, date);
  }
}
