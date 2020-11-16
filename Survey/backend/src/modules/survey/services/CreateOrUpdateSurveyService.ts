/* eslint-disable camelcase */
import { inject, injectable } from 'tsyringe';
import ICreateSurveyDTO from '../dtos/ICreateSurveyDTO';
import Survey from '../infra/typeorm/entities/Survey';
import ISurveyRepository from '../repositories/ISurveyRepository';

@injectable()
class CreateOrUpdateSurveyService {
  constructor(
    @inject('SurveyRepository')
    private surveyRepository: ISurveyRepository,
  ) {}

  public async execute({
    vehicle_id,
    last_survey,
    note,
  }: ICreateSurveyDTO): Promise<Survey> {
    const survey = await this.surveyRepository.createOrUpdate({
      vehicle_id,
      last_survey,
      note,
    });

    return survey;
  }
}

export default CreateOrUpdateSurveyService;
