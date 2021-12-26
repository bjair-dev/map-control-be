import { createSurvey } from './create/survey'
import { SurveyContentAttributes } from '../models/survey.content.model'
import { createSurveyContent } from './create/survey.content'
import { saveImageInServer, saveImageInServerV2 } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import { SurveyAttributes } from '../models/survay.model'
import { updateSurvey } from './update/survay'
import { removeFile } from '../../../shared/remove.file'
import config from '../../../config/environments'
import path from 'path'

export const createSurveyService = async ({
  survey,
  contents,
  image,
}: {
  survey: SurveyAttributes
  contents: Array<string>
  image: Buffer
}) => {
  try {
    if (image) {
      const { key, path, size } = await saveImageInServer({ buffer: image })
      survey.key = key
      survey.path = config.PROY_BEURL + '/api/render-image/' + key
      survey.size = size
    } else {
      survey.path = (await findOneGlobalVar('tip_image_default'))?.value
    }
    const _survey = await createSurvey({ survey })

    const surveyContent: SurveyContentAttributes[] = []
    if (_survey.survey_type_id === 2) {
      for (let index = 0; index < 2; index++) {
        const _content = await createSurveyContent({
          survey_content: {
            created_by: survey.created_by,
            content: index == 0 ? 'SI' : 'NO',
            surveyId: _survey.id,
          },
        })
        surveyContent.push(_content)
      }
    } else if (_survey.survey_type_id === 3) {
      for (const content of contents) {
        const _content = await createSurveyContent({
          survey_content: {
            created_by: survey.created_by,
            content: content,
            surveyId: _survey.id,
          },
        })
        surveyContent.push(_content)
      }
    }

    return {
      survey: _survey,
      content: surveyContent,
    }
  } catch (err) {
    throw err
  }
}
export const updateSurveyService = async ({
  survey,
  image,
}: {
  survey: SurveyAttributes
  image: Buffer
}) => {
  try {
    if (image) {
      const [result, { key, size, path: _path }] = await Promise.all([
        removeFile({
          path: path.join(config.DIR_ASSETS!, survey.key || ''),
        }),
        saveImageInServerV2({
          buffer: image,
        }),
      ])
      survey.key = key
      survey.size = size
      survey.path = _path
    }
    await updateSurvey({
      survey,
      where: {
        id: survey.id,
      },
    })
  } catch (err) {
    throw err
  }
}
