import { Router } from 'express';

import ensureAuthenticate from '@middlewares/ensureAuthenticade';

import { AttendancesController } from '@controllers/Attendances/AttendacesController';
import { AttendancesStartTimeController } from '@controllers/Attendances/AttendanceStartTimeController';
import { celebrate, Joi, Segments } from 'celebrate';

const attendanceController = new AttendancesController();
const attendanceStartTimeController = new AttendancesStartTimeController();

export const attendaceRouter = Router();

attendaceRouter.post('/', ensureAuthenticate, attendanceController.create);
attendaceRouter.put(
  '/starttime/:attendance_id',
  celebrate({
    [Segments.PARAMS]: {
      attendance_id: Joi.number().required(),
    },
  }),
  ensureAuthenticate,
  attendanceStartTimeController.update,
);
