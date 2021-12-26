import { DataBase } from '../../../../database'

export const deletePackageHeader = async (id: number) => {
  try {
    return await DataBase.instance.packageHeader.destroy({
      where: {
        id,
      },
    })
  } catch (err) {
    throw err
  }
}
