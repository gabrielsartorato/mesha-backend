// import AppError from '@errors/AppError';
import AppError from '@errors/AppError';
import { Attendance } from '@models/Attedance';
import { IAttendanceRepository } from '@repositories/Attendance/IAttendanceRepositories';
import { IUserRepository } from '@repositories/Users/IUserRepositories';

interface IRequest {
  attendant_id: string;
  attendance_id: string;
}

class UpdateAttendanceStartTimeService {
  private readonly attendanceRepository: IAttendanceRepository;

  private readonly userRepository: IUserRepository;

  constructor(
    attendanceRepository: IAttendanceRepository,
    userRepository: IUserRepository,
  ) {
    this.attendanceRepository = attendanceRepository;
    this.userRepository = userRepository;
  }

  public async execute({
    attendance_id,
    attendant_id,
  }: IRequest): Promise<Attendance> {
    const attendant = await this.userRepository.findById(attendant_id);
    const attendance = await this.attendanceRepository.findById(attendance_id);

    if (!attendant || attendant.type !== 'ATENDENTE') {
      throw new AppError('Atendente não encontrada');
    }

    if (!attendance) {
      throw new AppError('Atendimento não encontrado');
    }

    Object.assign(attendance, { start_service: new Date() });

    return attendance;
  }
}

export { UpdateAttendanceStartTimeService };
