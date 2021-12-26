// import DataBase from '../../../database/index/'
// export const notExistsQuestionId = async (id:number) =>{
    
//     // createAnswer
    
// }

import { DataBase } from '../../../database'

export const notExistsQuestion = async(id:number) => {
    const question = await DataBase.instance.question.findOne({
        where:{
            id
        }
    })
    if(!question) throw new Error(`No existe el id ${id}`)
}