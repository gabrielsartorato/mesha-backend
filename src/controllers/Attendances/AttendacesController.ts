import { AttendanceRepository } from '@repositories/Attendance/implementations/AttendanceRepository';
import { UserRepository } from '@repositories/Users/implementations/UserRepository';
import { CreateAttendanceService } from '@services/Attendances/CreateAttendanceService';
import { Request, Response } from 'express';

class AttendancesController {
  public async index(request: Request, response: Response): Promise<Response> {
    const attendanceRepository = new AttendanceRepository();

    const attendances = await attendanceRepository.findAll();

    return response.json(attendances);
  }

  public async create(request: Request, response: Response): Promise<Response> {
    const { services, total_price, professional_id } = request.body;
    const { user_id } = request.user;

    const attendanceRepository = new AttendanceRepository();
    const userRepository = new UserRepository();
    const createAttendanceService = new CreateAttendanceService(
      attendanceRepository,
      userRepository,
    );

    const attendance = await createAttendanceService.execute({
      user_id,
      services,
      total_price,
      professional_id,
    });

    return response.json(attendance);
  }
}

export { AttendancesController };
