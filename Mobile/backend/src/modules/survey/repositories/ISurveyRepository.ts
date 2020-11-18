import ICreateSurveyDTO from '../dtos/ICreateSurveyDTO';
import Survey from '../infra/typeorm/entities/Survey';

export default interface ISurveyRepository {
  createOrUpdate(data: ICreateSurveyDTO): Promise<Survey>;
}
