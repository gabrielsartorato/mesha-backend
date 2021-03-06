import { ICreateAttendanceDTO } from '@dtos/ICreateAttendance';
import { Attendance } from '@models/Attedance';

export interface IAttendanceRepository {
  create(data: ICreateAttendanceDTO): Promise<Attendance>;
  findById(id: string): Promise<Attendance | undefined>;
  findAll(): Promise<Attendance[]>;
  save(data: Attendance): Promise<Attendance | undefined>;
}
