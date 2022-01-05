// import { WhereOptions } from "sequelize"
import sequelize from 'sequelize'
import { DataBase } from '../../../../database'
import { AnswerSurveyAttributes } from '../../models/answer.survey.model'

export const findAnswerSurveyBySurveyId = async ({ surveyId }: { surveyId?: number }) => {
  try {
    const answerSurvey = await DataBase.instance.answerSurvey.findAll({
      where: {
        surveyId: Number(surveyId),
      },

      include: [
        {
          model: DataBase.instance.user,
          attributes: [],
          // attributes:['name','lastname']
        },
      ],
      attributes: [
        'userId',
        'answer',
        [sequelize.literal("concat(user.name,' ',user.lastname)"), 'full_name'],
      ],
      // attributes:['id','answer',[sequelize.literal("user.name ||' '||user.lastname"),'full_name']],

      // logging:console.log
    })

    return answerSurvey
  } catch (err) {
    throw err
  }
}
export const countAnswerSurveyBySurveyId = async ({ surveyId }: { surveyId?: number }) => {
  try {
    const countAnswerSurvey = await DataBase.instance.answerSurvey.findAll({
      where: {
        surveyId: Number(surveyId),
      },
      attributes: ['answer', [sequelize.literal(`count(*)`), 'quantity']],
      group: ['answer'],
      //   logging:console.log
    })

    return countAnswerSurvey
  } catch (err) {
    throw err
  }
}
