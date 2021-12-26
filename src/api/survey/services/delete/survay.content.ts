import { DataBase } from '../../../../database'

export const deleteSurveyContent = async (id: number) => {
  try {
    return await DataBase.instance.surveyContent.destroy({
      where: {
        id,
      },
    })
  } catch (err) {
    throw err
  }
}
