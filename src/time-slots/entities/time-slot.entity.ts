import {
  Entity,
  PrimaryGeneratedColumn,
  Column,
  ManyToOne,
  JoinColumn,
} from "typeorm";
import { Doctor } from "../../doctors/entities/doctor.entity";

@Entity("time_slots")
export class TimeSlot {
  @PrimaryGeneratedColumn("uuid")
  id: string;

  @Column({ type: "date" })
  date: Date;

  @Column({ type: "time" })
  startTime: string;

  @Column({ type: "time" })
  endTime: string;

  @Column({ default: true })
  isAvailable: boolean;

  @Column()
  doctorId: string;

  @ManyToOne(() => Doctor, (doctor) => doctor.timeSlots)
  @JoinColumn({ name: "doctorId" })
  doctor: Doctor;

  @Column({ type: "timestamp", default: () => "CURRENT_TIMESTAMP" })
  createdAt: Date;
}
