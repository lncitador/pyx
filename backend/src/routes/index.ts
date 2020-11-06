import { Router } from 'express';
import adminsRouter from './admin.routes';
import employeersRouter from './employeer.routes';

const routes = Router();

routes.use('/employeers', employeersRouter);
routes.use('/admins', adminsRouter);

export default routes;
