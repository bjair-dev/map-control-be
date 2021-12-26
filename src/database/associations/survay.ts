import { SurveyTypeStatic } from '../../api/survey/models/survey.type.mode'
import { SurveyContentStatic } from '../../api/survey/models/survey.content.model'
import { SurveyStatic } from '../../api/survey/models/survay.model'

export const surveyTypeHasManySurvey = ({
  surveyType,
  survey,
}: {
  surveyType: SurveyTypeStatic
  survey: SurveyStatic
}): void => {
  surveyType.hasMany(survey, {
    foreignKey: { allowNull: true, name: 'survey_type_id' },
    sourceKey: 'id',
  })
  survey.belongsTo(surveyType, {
    foreignKey: { allowNull: true, name: 'survey_type_id' },
    targetKey: 'id',
  })
}

export const surveyHasManySurveyContent = ({
  survey,
  surveyContent,
}: {
  surveyContent: SurveyContentStatic
  survey: SurveyStatic
}): void => {
  survey.hasMany(surveyContent, {
    foreignKey: { allowNull: false, name: 'surveyId' },
    sourceKey: 'id',
  })
  surveyContent.belongsTo(survey, {
    foreignKey: { allowNull: false, name: 'surveyId' },
    targetKey: 'id',
  })
}
