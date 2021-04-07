import { ICreateAttendanceDTO } from '@dtos/ICreateAttendance';
import { Attendance } from '@models/Attedance';
import { getRepository, Repository } from 'typeorm';
import { IAttendanceRepository } from '../IAttendanceRepositories';

class AttendanceRepository implements IAttendanceRepository {
  private ormRepository: Repository<Attendance>;

  constructor() {
    this.ormRepository = getRepository(Attendance);
  }

  public async create(data: ICreateAttendanceDTO): Promise<Attendance> {
    const attendance = this.ormRepository.create(data);

    return this.ormRepository.save(attendance);
  }

  public async findById(id: string): Promise<Attendance | undefined> {
    const attendace = await this.ormRepository.findOne({
      where: {
        id,
      },
    });

    return attendace;
  }
}

export { AttendanceRepository };
