import { Router } from 'express';
import AdminsControllers from '../controllers/AdminsControllers';

const adminsControllers = new AdminsControllers();
const adminsRouter = Router();

adminsRouter.post('/', adminsControllers.create);

export default adminsRouter;
