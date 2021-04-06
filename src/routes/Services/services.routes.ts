import { Router } from 'express';
import { celebrate, Joi, Segments } from 'celebrate';

import ensureAuthenticate from '@middlewares/ensureAuthenticade';

import { ServiceController } from '@controllers/Services/ServiceController';

const serviceController = new ServiceController();

export const serivceRouter = Router();

serivceRouter.post(
  '/',
  celebrate({
    [Segments.BODY]: {
      name_service: Joi.string().required(),
      minutes: Joi.number().required(),
      price: Joi.number().required(),
    },
  }),
  ensureAuthenticate,
  serviceController.create,
);
