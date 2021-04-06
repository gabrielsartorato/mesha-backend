import { Router } from 'express';
import { UserController } from '@controllers/Users/UsersController';
import { celebrate, Joi, Segments } from 'celebrate';

export const usersRouter = Router();

const usersController = new UserController();

usersRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      user_name: Joi.string().required(),
      password: Joi.string().required(),
    },
  }),
  usersController.create,
);
