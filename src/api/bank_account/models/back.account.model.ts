import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface BankAccountAttributes {
  id?: number
  type: string
  created?: Date
  updated?: Date
  state?: boolean
}
export interface BankAccountModel
  extends Model<BankAccountAttributes>,
    BankAccountAttributes {}
export class BankAccount extends Model<BankAccountModel, BankAccountAttributes> {}

export type BankAccountStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): BankAccountModel
}

export function BankAccountFactory(sequelize: Sequelize): BankAccountStatic {
  return <BankAccountStatic>sequelize.define(
    'bank_account',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      account: {
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
    },
    {
      initialAutoIncrement: '1',
      tableName: 'bank_account',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['account'],
        },
      ],
    }
  )
}
