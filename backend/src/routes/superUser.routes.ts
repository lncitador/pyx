import { Router } from 'express';
import SuperUserController from '../controllers/SuperUsersControllers';

const superUserController = new SuperUserController();

const superUserRouter = Router();

superUserRouter.post('/', superUserController.create);

export default superUserRouter;
