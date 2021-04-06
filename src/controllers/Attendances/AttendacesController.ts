import { AttendanceRepository } from '@repositories/Attendance/implementations/AttendanceRepository';
import { UserRepository } from '@repositories/Users/implementations/UserRepository';
import { CreateAttendanceService } from '@services/Attendances/CreateAttendanceService';
import { Request, Response } from 'express';

class AttendancesController {
  public async create(request: Request, response: Response): Promise<Response> {
    const { services, total_price } = request.body;
    const { user_id } = request.user;

    const attendanceRepository = new AttendanceRepository();
    const userRepository = new UserRepository();
    const createAttendanceService = new CreateAttendanceService(
      attendanceRepository,
      userRepository,
    );

    const attendace = await createAttendanceService.execute({
      user_id,
      services,
      total_price,
    });

    return response.json(attendace);
  }
}

export { AttendancesController };
