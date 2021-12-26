import { findOneSurveyType } from '../services/find/survey.type'
export const existsSurveyType = async (id: number) => {
  const type = await findOneSurveyType({
    where: {
      id,
    },
  })
  if (!type) throw new Error('No existe el tipo ingresado')
}
