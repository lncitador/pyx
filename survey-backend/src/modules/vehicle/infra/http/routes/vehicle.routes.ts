import { Router } from 'express';
import VehicleController from '../controllers/VehicleController';

const vehicleController = new VehicleController();
const vehicleRouter = Router();

vehicleRouter.post('/', vehicleController.create);
vehicleRouter.get('/', vehicleController.show);
vehicleRouter.get('/:plate', vehicleController.index);

export default vehicleRouter;
