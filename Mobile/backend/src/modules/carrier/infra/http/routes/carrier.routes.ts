import { Router } from 'express';
import CarrierControllers from '../controllers/CarrierController';

const carrierControllers = new CarrierControllers();
const carrierRouter = Router();

carrierRouter.post('/', carrierControllers.create);
carrierRouter.get('/:id', carrierControllers.index);
carrierRouter.get('/', carrierControllers.show);

export default carrierRouter;
