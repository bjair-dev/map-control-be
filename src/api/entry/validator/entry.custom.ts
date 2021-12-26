import { DataBase } from "../../../database"

export const notExistsEntry = async (id: number) => {
  const obj = await DataBase.instance.entry.findByPk(id)
  if (!obj) throw new Error(`No existe el id ${id}`)
}


export const notExistsEntryTagbyId = async (id: number) => {
    const obj = await DataBase.instance.entryTag.findByPk(id)
    if (!obj) throw new Error(`No existe el id ${id}`)
  }
  