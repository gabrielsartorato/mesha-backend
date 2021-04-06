import { ICreateAttendanceDTO } from '@dtos/ICreateAttendance';
import { Attendance } from '@models/Attedance';

export interface IAttendanceRepository {
  create(data: ICreateAttendanceDTO): Promise<Attendance>;
}
