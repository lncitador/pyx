import { Router } from 'express';
import SessionAppController from '../controllers/SessionAppControllers';

const sessionAppController = new SessionAppController();

const sessionAppRouter = Router();

sessionAppRouter.post('/', sessionAppController.create);

export default sessionAppRouter;
