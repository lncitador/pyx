import { Router } from 'express';

import carrierRouter from '@modules/carrier/infra/http/routes/carrier.routes';
import vehicleRouter from '@modules/vehicle/infra/http/routes/vehicle.routes';

const routes = Router();

routes.use('/carrier', carrierRouter);
routes.use('/vehicle', vehicleRouter);

export default routes;
