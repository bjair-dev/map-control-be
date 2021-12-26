// import { findOneQuestion } from '../services/find/question'
// export const existsQuestion = async (questionId: any) => {
//   const question = await findOneQuestion({ id: questionId })
//   if (!question) throw new Error('¡No existe la pregunta!')
// }

import { findOneLoanType } from "../services/find/loan.type"
import { findOneLoan } from "../services/find/loan"


export const ExistsLoanType = async (loan_type_id: number) => {
    const loanType = await await findOneLoanType({
        where: {
            id:loan_type_id,
        },
      })
    if (!loanType) throw new Error('¡El tipo de prestamo no existe!')
  }
  
  export const ExistsLoan = async (id: number) => {
    const loan = await await findOneLoan({
        where: {
            id:id,
        },
      })
    if (!loan) throw new Error(`¡El id ${id} no se encuentra en prestamo !`)
  }
  
export const VerifyLoanState = async (state: number) => {
   
    if (!(state == 0 || state == 1) ) throw new Error('¡Solo hay 2 opciones 1 o 0 !')
  }
  
//   export const ExistsBank = async (bankId: string) => {
//     const bank = await await findOneBank({
//         where: {
//           id:bankId,
//         },
//       })
//     if (!bank) throw new Error('¡El banco no existe!')
//   }
//   if (ExistsBank?.name) throw Error(`El banco ${name} ya existe`)