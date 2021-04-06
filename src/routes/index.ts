import { Router } from 'express';

import { usersRouter } from './Users/users.routes';
import { sessionRouter } from './Users/session.routes';

const routes = Router();

routes.use('/api/users', usersRouter);
routes.use('/api/sessions', sessionRouter);

export { routes };
