import { Router } from 'express';
import EmployeersControllers from '../controllers/EmployeersControllers';

const employeersControllers = new EmployeersControllers();
const employeersRouter = Router();

employeersRouter.get('/', employeersControllers.index);

employeersRouter.post('/', employeersControllers.create);

export default employeersRouter;
