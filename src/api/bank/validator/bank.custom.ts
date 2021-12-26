// import { findOneQuestion } from '../services/find/question'
// export const existsQuestion = async (questionId: any) => {
//   const question = await findOneQuestion({ id: questionId })
//   if (!question) throw new Error('¡No existe la pregunta!')
// }

import { findOneBank } from "../services/find/bank"


export const ExistsBank = async (id: number) => {
    const bank = await await findOneBank({
        where: {
          id,
        },
      })
    if (!bank) throw new Error('¡El banco no existe!')
  }
  
  export const ExistsNameBank = async (name: string) => {
    const bank = await await findOneBank({
        where: {
          name,
        },
      })
    if (bank) throw new Error('¡Ya existe el banco!')
  }
//   if (ExistsBank?.name) throw Error(`El banco ${name} ya existe`)