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
import { Service } from './Service';
import { User } from './User';

@Entity('attendances')
class Attendance {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @ManyToOne(() => User)
  @JoinColumn({ name: 'user_id' })
  user: User;

  @Column()
  total_price: number;

  @Column()
  start_service: Date;

  @Column()
  end_service: Date;

  @OneToMany(() => Service, (service) => service.attendance)
  attendances_orders: Service[];

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}

export { Attendance };
