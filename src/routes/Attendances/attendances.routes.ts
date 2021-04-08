import { Router } from 'express';

import ensureAuthenticate from '@middlewares/ensureAuthenticade';

import { AttendancesController } from '@controllers/Attendances/AttendacesController';
import { AttendancesStartTimeController } from '@controllers/Attendances/AttendanceStartTimeController';
import { celebrate, Joi, Segments } from 'celebrate';
import { AttendancesEndTimeController } from '@controllers/Attendances/AttendanceEndTimeController';

const attendanceController = new AttendancesController();
const attendanceStartTimeController = new AttendancesStartTimeController();
const attendanceEndTimeController = new AttendancesEndTimeController();

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

attendaceRouter.get('/', ensureAuthenticate, attendanceController.index);

attendaceRouter.put(
  '/endtime/:attendance_id',
  celebrate({
    [Segments.PARAMS]: {
      attendance_id: Joi.number().required(),
    },
  }),
  ensureAuthenticate,
  attendanceEndTimeController.update,
);
