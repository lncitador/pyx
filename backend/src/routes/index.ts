import { Router } from 'express';
import employeersRouter from './employeer.routes';

const routes = Router();

routes.use('/employeers', employeersRouter);

export default routes;
