import { Router } from 'express';

import ensureAuthenticate from '@middlewares/ensureAuthenticade';

import { AttendancesController } from '@controllers/Attendances/AttendacesController';

const attendanceController = new AttendancesController();

export const attendaceRouter = Router();

attendaceRouter.post('/', ensureAuthenticate, attendanceController.create);
