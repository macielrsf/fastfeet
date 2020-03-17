import { Router } from 'express';

import authMiddleware from './app/middlewares/auth';

import SessionController from './app/controllers/session';
import RecipientsController from './app/controllers/recipients';

const routes = new Router();

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('recepients', RecipientsController.store);
routes.put('recepients', RecipientsController.store);
routes.delete('recepients', RecipientsController.destroy);

export default routes;
