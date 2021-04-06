import { Router } from 'express';
import { UserController } from '@controllers/Users/UsersController';
// import { celebrate, Joi, Segments } from 'celebrate';
// import ensureAuthenticate from '@middlewares/ensureAuthenticade';
// import { SessionController } from '@controllers/SessionsController';

export const usersRouter = Router();

const usersController = new UserController();
// const sessionController = new SessionController();

usersRouter.post(
  '/',
  // celebrate({
  //   [Segments.BODY]: {
  //     user_name: Joi.string().required(),
  //     password: Joi.string().required(),
  //   },
  // }),
  usersController.create,
);

// usersRouter.patch(
//   '/',
//   celebrate({
//     [Segments.BODY]: {
//       password: Joi.string().required(),
//     },
//   }),
//   ensureAuthenticate,
//   sessionController.update,
// );
