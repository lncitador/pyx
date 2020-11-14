import { Router } from 'express';
import SurveyController from '../controllers/SurveyController';

const surveyController = new SurveyController();
const surveyRouter = Router();

surveyRouter.post('/', surveyController.create);

export default surveyRouter;
