// import AppError from '@errors/AppError';
import AppError from '@errors/AppError';
import { Attendance } from '@models/Attedance';
import { IAttendanceRepository } from '@repositories/Attendance/IAttendanceRepositories';
import { IUserRepository } from '@repositories/Users/IUserRepositories';
import { userResponse } from '@views/Users/UserResponse';

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

    if (attendance.start_service !== null) {
      throw new AppError('Atendimento já iniciado');
    }

    Object.assign(
      attendance,
      { start_service: new Date() },
      { user: userResponse(attendance.user) },
      { professional: userResponse(attendance.professional) },
    );

    await this.attendanceRepository.save(attendance);

    return attendance;
  }
}

export { UpdateAttendanceStartTimeService };
