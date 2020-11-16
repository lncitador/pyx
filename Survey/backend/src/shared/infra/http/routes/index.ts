import { Router } from 'express';

import carrierRouter from '@modules/carrier/infra/http/routes/carrier.routes';
import vehicleRouter from '@modules/vehicle/infra/http/routes/vehicle.routes';
import surveyRouter from '@modules/survey/infra/http/routes/survey.routes';

const routes = Router();

routes.use('/carrier', carrierRouter);
routes.use('/vehicle', vehicleRouter);
routes.use('/survey', surveyRouter);

export default routes;
