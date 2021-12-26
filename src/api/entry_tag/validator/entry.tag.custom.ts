import { DataBase } from "../../../database"

export const existsTagType = async (tag_type:string) => {
    const entryTag = await DataBase.instance.entryTag.findOne({
        where:{
            tag_type
        }
    })
    if(!entryTag)throw new Error(`No existe el tipo de etiqueta ${tag_type}`)
}