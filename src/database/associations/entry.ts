import { EntryTypeStatic } from '../../api/entry_type/models/entry.type.model'
import { EntryStatic } from '../../api/entry/models/entry.model'
import { EntryTagStatic } from '../../api/entry_tag/models/entry.tag.model'
export const entryTypeHasManyEntry = ({
  entry_type,
  entry,
}: {
  entry_type: EntryTypeStatic
  entry: EntryStatic
}): void => {
  entry_type.hasMany(entry, {
    foreignKey: 'entry_type_id',
    sourceKey: 'id',
  })
  entry.belongsTo(entry_type, {
    foreignKey: 'entry_type_id',
    targetKey: 'id',
  })
}


export const entryTagHasManyEntry = ({
  entry_tag,
  entry,
}: {
  entry_tag: EntryTagStatic
  entry: EntryStatic
}): void => {
  entry_tag.hasMany(entry, {
    foreignKey: 'entry_tag_id',
    sourceKey: 'id',
  })
  entry.belongsTo(entry_tag, {
    foreignKey: 'entry_tag_id',
    targetKey: 'id',
  })
}
