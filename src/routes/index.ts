import { Router } from 'express';

import { usersRouter } from './Users/users.routes';
import { sessionRouter } from './Users/session.routes';
import { attendaceRouter } from './Attendances/attendances.routes';
import { serivceRouter } from './Services/services.routes';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/sessions', sessionRouter);

routes.use('/api/attendances', attendaceRouter);
routes.use('/api/services', serivceRouter);

export { routes };
