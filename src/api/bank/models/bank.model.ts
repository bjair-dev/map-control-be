import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface BankAttributes {
  id?: number
  name?: string
  title?: string
  path?: string
  key?: string
  size?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number,
  num_whatsapp?:string,
  num_atc?:string
}
export interface BankModel extends Model<BankAttributes>, BankAttributes {}
export class BankCategory extends Model<BankModel, BankAttributes> {}

export type BankStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BankModel
}

export function BankFactory(sequelize: Sequelize): BankStatic {
  return <BankStatic>sequelize.define(
    'bank',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(100),
        allowNull: false,
      },
      title: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      path: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      key: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      size: {
        type: DataTypes.STRING(30),
        allowNull: true,
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
      },
      updated: {
        type: DataTypes.DATE,
        allowNull: true,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull: false,
      },
      updated_by: {
        type: DataTypes.INTEGER,
        allowNull: true,
      },
      num_whatsapp: {
        type: DataTypes.STRING(15),
        allowNull: true,
      },
      num_atc:{
        type: DataTypes.STRING(15),
        allowNull: true,
      }
      
    },
    {
      initialAutoIncrement: '1',
      tableName: 'bank',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['name'],
        },
      ],
    }
  )
}
