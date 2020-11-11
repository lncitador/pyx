import { Router } from 'express';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';
import adminsRouter from './admin.routes';
import employeersRouter from './employeer.routes';
import sessionRouter from './session.routes';
import superUserRouter from './superUser.routes';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/employeers', ensureAuthenticated, employeersRouter);
routes.use('/superusers', superUserRouter);
routes.use('/admins', adminsRouter);

export default routes;
