import { Router } from 'express';
import adminsRouter from '@modules/admin/infra/http/routes/admin.routes';
import employeersRouter from '@modules/employeers/infra/http/routes/employeer.routes';
import sessionRouter from '@modules/superusers/infra/http/routes/session.routes';
import superUserRouter from '@modules/superusers/infra/http/routes/superUser.routes';
import sessionAppRouter from '@modules/employeers/infra/http/routes/sessionApp.routes';
import ensureAuthenticated from '../middlewares/ensureAuthenticated';

const routes = Router();

routes.use('/session', sessionRouter);
routes.use('/mobile', sessionAppRouter);
routes.use('/employeers', ensureAuthenticated, employeersRouter);
routes.use('/superusers', superUserRouter);
routes.use('/admins', adminsRouter);

export default routes;
