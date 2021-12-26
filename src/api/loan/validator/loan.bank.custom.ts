import { findOneLoanType } from "../services/find/loan.type"

export const existsLoanTypeId = async(id:number) => {
    // console.log("id",id)
    // if(id.toString() == '' || id == null)throw new Error('Se necesita ingresar algun valor')
    const loanType = await findOneLoanType({where:{id}})
    if(!loanType)throw new Error(`No existe el id ${id}`)

}