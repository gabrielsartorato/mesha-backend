import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';
import { SessionController } from '@controllers/Users/SessionController';

const sessionController = new SessionController();

export const sessionRouter = Router();

sessionRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  sessionController.create,
);
