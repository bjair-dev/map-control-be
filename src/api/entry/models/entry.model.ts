import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface EntryAttributes {
  id?          : number
  userId?      : number
  entry_type_id: number   // id(Number) => importe | egreso
  entry_tag_id : number   //id(Number) => etiqueta | sueldo | compras de artefactos | supermercado | deuda | etc
  amount       : string   // monto | importe
  date         : Date
  description? : string
  created?     : Date
  updated?     : Date
  state?       : boolean
  completed?   : boolean  // ¿Ya ingresó el dinero? | ¿Ya pagaste?
  account?     : string   // cuenta de origen | cuenta de destino
}
export interface EntryModel extends Model<EntryAttributes>, EntryAttributes {}
export class Entry extends Model<EntryModel, EntryAttributes> {}

export type EntryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): EntryModel
}

export function EntryFactory(sequelize: Sequelize): EntryStatic {
  return <EntryStatic>sequelize.define(
    'entry',
    {
      id: {
        type         : DataTypes.INTEGER,
        allowNull    : false,
        primaryKey   : true,
        autoIncrement: true,
      },
      amount: {
        type     : DataTypes.STRING(20),
        allowNull: false,
      },
      date: {
        type     : DataTypes.DATE,
        allowNull: false,
      },
      description: {
        type     : DataTypes.STRING(300),
        allowNull: true,
      },

      created: {
        type     : DataTypes.DATE,
        allowNull: true,
      },
      updated: {
        type     : DataTypes.DATE,
        allowNull: true,
      },
      state: {
        type        : DataTypes.BOOLEAN,
        defaultValue: true,
      },
      completed: {
        type        : DataTypes.BOOLEAN,
        defaultValue: true,
      },
      account: {
        type: DataTypes.STRING(200),
      },
    },
    {
      initialAutoIncrement: '1',
      tableName           : 'entry',
      timestamps          : false,
    }
  )
}
