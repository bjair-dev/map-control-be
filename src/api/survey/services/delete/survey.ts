import { DataBase } from '../../../../database'

export const deleteSurvey = async (id: number) => {
  try {
    return await DataBase.instance.survey.destroy({
      where: { id },
    })
  } catch (err) {
    throw err
  }
}
