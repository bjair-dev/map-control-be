import { findOneSurveyContent } from '../services/find/survey.content'
import { DataBase } from '../../../database'
export const existsSurveyContent = async (id: number) => {
  const content = await findOneSurveyContent({
    where: {
      id,
    },
    include: {
      model: DataBase.instance.survey,
      as: 'survey',
      required: true,
    },
  })
  if (!content) throw new Error('El id no existe')
  if (content.survey?.survey_type_id !== 3) throw new Error('El contenido no es editable')
}

// const f = () => {
//   let y = 10
//   return (x: number) => {
//     return x + y
//   }
// }
// const f1 = f()
// let y = 20
// const n = f1(1)
// console.log(n)
