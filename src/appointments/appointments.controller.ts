import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Patch,
  Query,
  ParseUUIDPipe,
} from "@nestjs/common";
import { ApiTags, ApiOperation, ApiResponse } from "@nestjs/swagger";
import { AppointmentsService } from "./appointments.service";
import { CreateAppointmentDto } from "./dto/create-appointment.dto";
import { AppointmentResponseDto } from "./dto/appointment-response.dto";
import { PaginationDto } from "../common/dto/pagination.dto";

@ApiTags("Appointments")
@Controller("api/v1/appointments")
export class AppointmentsController {
  constructor(private readonly appointmentsService: AppointmentsService) {}

  @Post()
  @ApiOperation({ summary: "Book a new appointment" })
  @ApiResponse({
    status: 201,
    description: "Appointment booked successfully",
    type: AppointmentResponseDto,
  })
  @ApiResponse({ status: 400, description: "Bad request - validation errors" })
  @ApiResponse({
    status: 409,
    description: "Conflict - time slot not available",
  })
  create(@Body() createAppointmentDto: CreateAppointmentDto) {
    return this.appointmentsService.create(createAppointmentDto);
  }

  @Get()
  @ApiOperation({ summary: "Get all appointments with pagination" })
  findAll(@Query() paginationDto: PaginationDto) {
    return this.appointmentsService.findAll(paginationDto);
  }

  @Get(":id")
  @ApiOperation({ summary: "Get appointment by ID" })
  @ApiResponse({ status: 200, description: "Appointment found" })
  @ApiResponse({ status: 404, description: "Appointment not found" })
  findOne(@Param("id", ParseUUIDPipe) id: string) {
    return this.appointmentsService.findOne(id);
  }

  @Patch(":id/cancel")
  @ApiOperation({ summary: "Cancel an appointment" })
  @ApiResponse({
    status: 200,
    description: "Appointment cancelled successfully",
  })
  cancel(@Param("id", ParseUUIDPipe) id: string) {
    return this.appointmentsService.cancel(id);
  }
}
