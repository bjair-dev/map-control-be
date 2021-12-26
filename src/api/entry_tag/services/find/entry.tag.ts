import { FindAttributeOptions, WhereOptions } from "sequelize/types"
import { DataBase } from "../../../../database"
import { EntryTagAttributes } from "../../models/entry.tag.model"

export const findAllEntryTag = async ({
    where,
    attributes
  }: {
    where?: WhereOptions<EntryTagAttributes>
    attributes:FindAttributeOptions
  }): Promise<EntryTagAttributes[] | null>  => {
    try {
      const entryTag = await DataBase.instance.entryTag.findAll({
        where,
        attributes
      })
      
      return entryTag
    } catch (err) {
      throw err
    }
  }
  