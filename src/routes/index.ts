import { Router } from 'express';

import { usersRouter } from './Users/users.routes';
import { sessionRouter } from './Users/session.routes';
import { attendaceRouter } from './Attendances/attendances.routes';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/sessions', sessionRouter);

routes.use('/api/attendances', attendaceRouter);

export { routes };
