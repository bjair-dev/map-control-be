import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface EntryTagAttributes {
  id?: number
  tag: string  // etiqueta | sueldo | compras de artefactos | supermercado | deuda
  created_by?: number
  updated_by?: number
  created?: Date
  updated?: Date
  state?: boolean //estado  | activo | inactivo 
  tag_type?:string // e => egreso  | i => ingreso
}
export interface EntryTagModel extends Model<EntryTagAttributes>, EntryTagAttributes {}
export class EntryTag extends Model<EntryTagModel, EntryTagAttributes> {}

export type EntryTagStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EntryTagModel
}

export function EntryTagFactory(sequelize: Sequelize): EntryTagStatic {
  return <EntryTagStatic>sequelize.define(
    'entry_tag',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.INTEGER,
      },
      tag: {
        type: DataTypes.STRING(70),
        allowNull: true,
      },
      tag_type:{
        type:DataTypes.STRING(10),
        allowNull:false
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
    },
    {
      initialAutoIncrement: '1',
      tableName: 'entry_tag',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['tag'],
        },
      ],
    }
  )
}
