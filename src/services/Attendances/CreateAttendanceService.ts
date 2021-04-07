import AppError from '@errors/AppError';
import { Attendance } from '@models/Attedance';
import { IAttendanceRepository } from '@repositories/Attendance/IAttendanceRepositories';
import { IUserRepository } from '@repositories/Users/IUserRepositories';
import { userResponse } from '@views/Users/UserResponse';

interface IServices {
  service_id: number;
  name_service: string;
  price: number;
}
interface IRequest {
  user_id: string;
  services: IServices[];
  total_price: number;
  professional_id: string;
}
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

  public async execute({
    user_id,
    services,
    total_price,
    professional_id,
  }: IRequest): Promise<Attendance> {
    const user = await this.userRepository.findById(user_id);
    const professional = await this.userRepository.findById(professional_id);

    if (!user) {
      throw new AppError('Usuário não encontrado');
    }

    if (!professional || professional.type !== 'PROFISSIONAL') {
      throw new AppError('Professional não encontrado');
    }

    if (services.length === 0) {
      throw new AppError('Não é possivel criar um atendimento sem Serviços');
    }

    const attendance = await this.attendanceRepository.create({
      user,
      services,
      total_price,
      professional,
    });

    Object.assign(attendance, { user: userResponse(attendance.user) });
    Object.assign(attendance, {
      professional: userResponse(attendance.professional),
    });

    return attendance;
  }
}

export { CreateAttendanceService };
