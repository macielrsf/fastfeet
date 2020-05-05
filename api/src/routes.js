import { Router } from 'express';
import multer from 'multer';

import multerConfig from './config/multer';

import authMiddleware from './app/middlewares/auth';
import isAdmin from './app/middlewares/admin';

import SessionController from './app/controllers/SessionController';
import RecipientController from './app/controllers/RecipientController';
import DeliverymanController from './app/controllers/DeliverymanController';
import FileController from './app/controllers/FileController';

const routes = new Router();
const upload = multer(multerConfig);

routes.post('/sessions', SessionController.store);

routes.use(authMiddleware);

routes.post('/recipient', RecipientController.store);
routes.get('/recipient/:id', RecipientController.show);
routes.put('/recipient/:id', RecipientController.update);
routes.delete('/recipient/:id', RecipientController.destroy);

routes.get('/deliveryman', isAdmin, DeliverymanController.index);
routes.post('/deliveryman', isAdmin, DeliverymanController.store);
routes.put('/deliveryman/:id', isAdmin, DeliverymanController.update);
routes.delete('/deliveryman/:id', isAdmin, DeliverymanController.destroy);

routes.post('/files', upload.single('file'), FileController.store);

export default routes;
