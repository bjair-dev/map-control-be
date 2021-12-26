import { saveImageInServer } from '../../../shared/save.file'
import { findOneGlobalVar } from '../../global/services/find/global'
import config from '../../../config/environments'
import { createBank } from './create/bank'
import { BankAttributes } from '../models/bank.model'
import { findOneBank } from './find/bank'
import { removeFile } from '../../../shared/remove.file'
import path from 'path'
import { updateBank } from './update/bank'

export const createBankService = async ({
  bank,
  created_by,
  image,
}: {
  bank: BankAttributes
  created_by: number
  image: Buffer
}) => {
  try {
    let _key: string | undefined = undefined
    let _path: string | undefined = undefined
    let _size: string | undefined = undefined
    if (image) {
      const { key, path, size } = await saveImageInServer({ buffer: image })
      _key = key
      _path = config.PROY_BEURL + '/api/render-image/' + key
      _size = size
    } else {
      _path = (await findOneGlobalVar('tip_image_default'))?.value
    }
    return await createBank({
      created_by,
      name: bank.name,
      title: bank.title,
      num_atc: bank.num_atc,
      num_whatsapp: bank.num_whatsapp,
      key: _key,
      path: _path,
      size: _size,
    })
  } catch (err) {
    throw err
  }
}

export const updateBankImageService = async ({
  updated_by,
  image,
  id,
}: {
  updated_by: number
  image: Buffer
  id: number
}) => {
  let _key: string | undefined = undefined
  let _path: string | undefined = undefined
  let _size: string | undefined = undefined

  try {
    if (image?.byteLength) {
      console.log(image.byteLength)
      let findkey = (await findOneBank({ where: { id: id } }))?.key
      let [_, { key, size }] = await Promise.all([
        removeFile({ path: path.join(config.DIR_ASSETS!, findkey || '') }),
        saveImageInServer({ buffer: image }),
      ])
      _path = config.PROY_BEURL + '/api/render-image/' + key
      _key = key
      _size = size
    }

    // console.log(_key, _path, _size)
    await updateBank({
      bank: {
        updated_by,
        key: _key,
        size: _size,
        path: _path,
      },
      where: {
        id,
      },
    })
    return { path : _path }
  } catch (error) {
    throw error
  }
}

// export const updateBankService = async ({
//     bank,
//     updated_by,
//     image,
//     id
// }:{
//     bank: BankAttributes
//     updated_by: number
//     image?: Buffer,
//     id:number
// }) => {
//     let _key: string | undefined = undefined
//     let _path: string | undefined = undefined
//     let _size: string | undefined = undefined

//     try {

//         if(image?.byteLength){
//             console.log(image.byteLength)
//         let findkey = (await findOneBank({ where:{ id: id} }))?.key
//         let [_, { key, size }] = await Promise.all([
//            removeFile({ path: path.join(config.DIR_ASSETS!, findkey || '') }),
//            saveImageInServer({ buffer: image })
//         ])
//          _path = config.PROY_BEURL + '/api/render-image/' + key
//         _key=key
//         _size=size
//     }
//     console.log(_key,_path,_size)
//            await updateBank({
//             bank: {
//               name:bank.name,
//               title:bank.title,
//               num_whatsapp:bank.num_whatsapp,
//               num_atc:bank.num_atc,
//               updated_by,
//               key:_key,
//               size:_size,
//               path:_path
//             },
//             where: {
//               id,
//             },
//           })
//     } catch (error) {
//         throw error
//     }
// }
