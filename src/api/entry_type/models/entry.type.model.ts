import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface EntryTypeAttributes {
  id?: number
  type: string
  // userId?: number
  created?: Date
  updated?: Date
  state?: boolean
  updated_by?:number
  created_by:number
}
export interface EntryTypeModel extends Model<EntryTypeAttributes>, EntryTypeAttributes {}
export class EntryType extends Model<EntryTypeModel, EntryTypeAttributes> {}

export type EntryTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EntryTypeModel
}

export function EntryTypeFactory(sequelize: Sequelize): EntryTypeStatic {
  return <EntryTypeStatic>sequelize.define(
    'entry_type',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      type: {
        type: DataTypes.STRING(300),
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'entry_type',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['type'],
        },
      ],
    }
  )
}
