import { Router } from 'express';

import { usersRouter } from './Users/users.routes';

const routes = Router();

routes.use('/api/users', usersRouter);

export { routes };
