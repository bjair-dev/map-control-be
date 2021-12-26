import { findUserByEmailWithoutState
  // , findVerifyCodeVerificationUser, findVerifyStatusAndCodeVerificationUser
 } from '../../user/services/find'
import { Request } from 'express'
import { DataBase } from '../../../database'

export const VerifyCodeVerificationUser = async (code_verification: string, { req }: { req: Request | any } ): Promise<void> => {
  
  
  const _email = await findUserByEmailWithoutState({ email:req.body.email })
  if (!_email) throw new Error(`¡No existe el email ${req.body.email}!`)
  if(_email){
      
      // if(_email.state == true )throw new Error(`¡El correo ya se ha confirmado, la cuenta se encuentra activa!`) 
        
      if(_email.code_verification != code_verification )throw new Error(`¡el código de verificación es incorrecto!`)
      // const statusAccout = await  findVerifyStatusAndCodeVerificationUser({ code_verification , email : req.body.email,state:true})
      // if (statusAccout) throw new Error(`¡El correo ya se ha confirmado, la cuenta se encuentra activa!`)       
      //statusaccount = 1
      
      // const verifyCode = await  findVerifyCodeVerificationUser({ email: req.body.email , code_verification})
      // if (!verifyCode) throw new Error(`¡el codigo de verificación es incorrecto!`)
  }
}

export const VerifyEmailUser = async (email: string ): Promise<void> => {
  
  const _email = await findUserByEmailWithoutState({ email })
  if (!_email) throw new Error(`¡No existe el email ${email}!`)
  
}

export const notExistsUserId = async (id: string ): Promise<void> => {
  
  const user = await DataBase.instance.user.findByPk(id)
  if (!user) throw new Error(`¡No existe el id ${id}!`)
  
}
