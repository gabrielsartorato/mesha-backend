import { ICreateAttendanceDTO } from '@dtos/ICreateAttendance';
import { Attendance } from '@models/Attedance';
import { getRepository, Repository } from 'typeorm';
import { IAttendanceRepository } from '../IAttendanceRepositories';

class AttendanceRepository implements IAttendanceRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = getRepository(Attendance);
  }

  public async create({ user_id }: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = this.ormRepository.create({
      user: {
        id: user_id,
      },
    });

    return this.ormRepository.save(attendance);
  }
}

export { AttendanceRepository };
