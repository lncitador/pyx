import { Router } from 'express';
import SessionController from '../controllers/SessionControllers';

const sessionController = new SessionController();

const sessionRouter = Router();

sessionRouter.post('/', sessionController.create);

export default sessionRouter;
