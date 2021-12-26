// import DataBase from '../../../database/index/'
// export const notExistsQuestionId = async (id:number) =>{
    
//     // createAnswer
    
// }

import { DataBase } from '../../../database'

export const notExistsSurvey = async(id:number) => {
    const survey = await DataBase.instance.survey.findOne({
        where:{
            id
        }
    })
    if(!survey) throw new Error(`No existe el id ${id}`)
}