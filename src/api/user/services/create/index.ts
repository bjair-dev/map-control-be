import CryptoJS from 'crypto-js'
import { DataBase } from '../../../../database/index'
import moment from 'moment'

export const createUser = async ({
  name,
  lastname,
  email,
  cellphone,
  sexo,
  password,
  dni,
  date_of_birth,
  code_verification,
  state,
  origin
}: {
  name?: string
  lastname?: string
  email?: string
  cellphone?: number
  sexo?: string
  password?: string
  dni?: number
  date_of_birth?: string
  code_verification?: string
  state?: boolean 
  origin?: string
}) => {
  try {
    const salt = CryptoJS.lib.WordArray.random(30)
    const hashpwd = CryptoJS.PBKDF2(password!, salt.toString(), {
      iterations: 10000,
      keySize: 10,
    })
    return await DataBase.instance.user.create({
      name,
      lastname,
      email,
      password: hashpwd.toString(),
      salt: salt.toString(),
      cellphone,
      created: moment.utc().toDate(),
      sexo,
      dni,
      date_of_birth,
      code_verification,
      state,
      origin
    })
  } catch (err) {
    throw err
  }
}
