import {
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { Attendance } from './Attedance';
import { Service } from './Service';

@Entity('services_order')
class ServiceOrder {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => Attendance, (attendance) => attendance.services)
  @JoinColumn({ name: 'id_attendance' })
  attendance: Attendance;

  @ManyToOne(() => Service, { eager: true })
  @JoinColumn({ name: 'id_service' })
  service_id: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { ServiceOrder };
