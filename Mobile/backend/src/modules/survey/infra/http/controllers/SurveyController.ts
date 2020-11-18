/* eslint-disable camelcase */
import CreateOrUpdateSurveyService from '@modules/survey/services/CreateOrUpdateSurveyService';
import { Request, Response } from 'express';
import { container } from 'tsyringe';

export default class SurveyController {
  public async create(request: Request, response: Response): Promise<Response> {
    const surveyRepository = container.resolve(CreateOrUpdateSurveyService);

    const { vehicle_id, last_survey, note } = request.body;

    const survey = await surveyRepository.execute({
      vehicle_id,
      last_survey,
      note,
    });

    return response.json(survey);
  }
}
