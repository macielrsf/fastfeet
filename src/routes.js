import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/session';
import RecipientController from './app/controllers/recipient';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);
routes.put('/recipient', RecipientController.update);
routes.delete('/recipient', RecipientController.destroy);

export default routes;
