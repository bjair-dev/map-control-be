import { findOneSurvey } from '../services/find/survey'
import { Op } from 'sequelize'
export const existsSurvey = async (id: number) => {
  const survey = await findOneSurvey({
    where: {
      id,
    },
  })
  if (!survey) throw new Error('No existe la encuesta')
}
export const existsSurveyAndType3 = async (id: number) => {
  const survey = await findOneSurvey({
    where: {
      [Op.and]: {
        id,
        survey_type_id: 3,
      },
    },
  })
  if (!survey) throw new Error('No existe la encuesta')
}
