import { ICreateAttendanceDTO } from '@dtos/ICreateAttendance';
import AppError from '@errors/AppError';
import { Attendance } from '@models/Attedance';
import { IAttendanceRepository } from '@repositories/Attendance/IAttendanceRepositories';
import { IUserRepository } from '@repositories/Users/IUserRepositories';

class CreateAttendanceService {
  private readonly attendanceRepository: IAttendanceRepository;

  private readonly userRepository: IUserRepository;

  constructor(
    attendanceRepository: IAttendanceRepository,
    userRepository: IUserRepository,
  ) {
    this.attendanceRepository = attendanceRepository;
    this.userRepository = userRepository;
  }

  public async execute({ user_id }: ICreateAttendanceDTO): Promise<Attendance> {
    const findUser = await this.userRepository.findById(user_id);

    if (!findUser) {
      throw new AppError('Usuário não encontrado');
    }
    const attendance = await this.attendanceRepository.create({ user_id });

    return attendance;
  }
}

export { CreateAttendanceService };
