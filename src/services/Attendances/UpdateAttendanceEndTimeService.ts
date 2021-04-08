import { addMinutes, isAfter, differenceInMinutes } from 'date-fns';

import AppError from '@errors/AppError';
import { Attendance } from '@models/Attedance';
import { IAttendanceRepository } from '@repositories/Attendance/IAttendanceRepositories';
import { IUserRepository } from '@repositories/Users/IUserRepositories';
import { userResponse } from '@views/Users/UserResponse';

interface IRequest {
  attendant_id: string;
  attendance_id: string;
}

class UpdateAttendanceEndTimeService {
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

    const { services, start_service, end_service } = attendance;

    if (start_service === null) {
      throw new AppError('Atendimento não iniciado');
    }

    if (end_service !== null) {
      throw new AppError('Atendimento já finalizado');
    }

    const time = services.reduce((acc, array) => {
      const { service_id } = array;
      const service: any = service_id;
      const { minutes } = service;

      const soma = acc + minutes;

      return soma;
    }, 0);

    const expectedEndTime = addMinutes(start_service, time);

    const price = services.reduce((acc, array) => {
      const { service_id } = array;
      const service: any = service_id;
      const { price } = service;

      const soma = acc + Number(price);

      return soma;
    }, 0);

    const duration = differenceInMinutes(new Date(), attendance.start_service);

    Object.assign(
      attendance,
      { end_service: new Date() },
      { user: userResponse(attendance.user) },
      { professional: userResponse(attendance.professional) },
      { total_price: price },
      { commission: (price / 100) * 10 },
      { duration },
    );

    if (isAfter(attendance.end_service, expectedEndTime)) {
      throw new AppError('Horário final ultrapassou limite pré estabelecido');
    }

    await this.attendanceRepository.save(attendance);

    return attendance;
  }
}

export { UpdateAttendanceEndTimeService };
