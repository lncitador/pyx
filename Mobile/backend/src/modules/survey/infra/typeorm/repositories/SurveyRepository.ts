/* eslint-disable camelcase */
import ICreateSurveyDTO from '@modules/survey/dtos/ICreateSurveyDTO';
import ISurveyRepository from '@modules/survey/repositories/ISurveyRepository';
import { getRepository, Repository } from 'typeorm';
import Survey from '../entities/Survey';

export default class SurveyRepository implements ISurveyRepository {
  public ormRepository: Repository<Survey>;

  constructor() {
    this.ormRepository = getRepository(Survey);
  }

  public async createOrUpdate({
    vehicle_id,
    last_survey,
    note,
  }: ICreateSurveyDTO): Promise<Survey> {
    const survey = await this.ormRepository.findOne({
      where: { vehicle_id },
    });

    if (!survey) {
      const createSurvey = this.ormRepository.create({
        vehicle_id,
        last_survey,
        note,
      });

      await this.ormRepository.save(createSurvey);

      return createSurvey;
    }

    survey.last_survey = survey.updated_at;
    survey.note = note;

    await this.ormRepository.save(survey);

    return survey;
  }
}
