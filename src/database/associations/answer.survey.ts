import { UserStatic } from '../../api/user/models/user.model'
import { AnswerSurveyStatic } from '../../api/answer_survey/models/answer.survey.model'

export const answerSurveyHasManyUser = ({
  user,
  answerSurvey,
}: {
  user: UserStatic
  answerSurvey: AnswerSurveyStatic
}): void => {
  user.hasMany(answerSurvey, {
    foreignKey: 'userId',
    sourceKey: 'id',
  })
  answerSurvey.belongsTo(user, {
    foreignKey: 'userId',
    targetKey: 'id',
  })
}
