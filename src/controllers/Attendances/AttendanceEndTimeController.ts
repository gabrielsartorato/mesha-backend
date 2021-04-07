import { AttendanceRepository } from '@repositories/Attendance/implementations/AttendanceRepository';
import { UserRepository } from '@repositories/Users/implementations/UserRepository';
import { UpdateAttendanceEndTimeService } from '@services/Attendances/UpdateAttendanceEndTimeService';
import { Request, Response } from 'express';

class AttendancesEndTimeController {
  public async update(request: Request, response: Response): Promise<Response> {
    const { attendance_id } = request.params;
    const { user_id } = request.user;

    const attendanceRepository = new AttendanceRepository();
    const userRepository = new UserRepository();
    const updatedAttendanceStartTime = new UpdateAttendanceEndTimeService(
      attendanceRepository,
      userRepository,
    );

    const attendance = await updatedAttendanceStartTime.execute({
      attendance_id,
      attendant_id: user_id,
    });

    return response.json(attendance);
  }
}

export { AttendancesEndTimeController };
