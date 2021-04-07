import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { ServiceOrder } from './ServiceOrders';
import { User } from './User';

@Entity('attendances')
class Attendance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'user_id' })
  user: User;

  @ManyToOne(() => User, { eager: true })
  @JoinColumn({ name: 'professional_id' })
  professional: User;

  @OneToMany(() => ServiceOrder, (service) => service.attendance, {
    cascade: true,
    eager: true,
  })
  services: ServiceOrder[];

  @Column()
  total_price: number;

  @Column()
  start_service: Date;

  @Column()
  end_service: Date;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Attendance };
