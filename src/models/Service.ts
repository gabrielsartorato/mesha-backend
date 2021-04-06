import {
  Column,
  CreateDateColumn,
  Entity,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('services')
class Service {
  @PrimaryGeneratedColumn('increment')
  id: number;

  @Column()
  name_service: string;

  @Column()
  price: number;

  @Column()
  minutes: number;

  @CreateDateColumn()
  created_at: Date;

  @UpdateDateColumn()
  updated_at: Date;
}
export { Service };
