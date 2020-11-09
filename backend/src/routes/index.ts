import { Router } from 'express';
import adminsRouter from './admin.routes';
import employeersRouter from './employeer.routes';
import superUserRouter from './superUser.routes';

const routes = Router();

routes.use('/employeers', employeersRouter);
routes.use('/superusers', superUserRouter);
routes.use('/admins', adminsRouter);

export default routes;
