import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface MotivationalPhraseAttributes {
  id?: number
  phrase: string  // Frase motivadora
  created_by?: number
  updated_by?: number
  created?: Date
  updated?: Date
  state?: boolean //estado  | activo | inactivo 
}
export interface MotivationalPhraseModel extends Model<MotivationalPhraseAttributes>, MotivationalPhraseAttributes {}
export class MotivationalPhrase extends Model<MotivationalPhraseModel, MotivationalPhraseAttributes> {}

export type MotivationalPhraseStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): MotivationalPhraseModel
}

export function MotivationalPhraseFactory(sequelize: Sequelize): MotivationalPhraseStatic {
  return <MotivationalPhraseStatic>sequelize.define(
    'motivational_phrase',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      phrase: {
        type: DataTypes.STRING(600),
        allowNull: true,
      },
      updated_by: {
        type: DataTypes.INTEGER,
      },
      created_by: {
        type: DataTypes.INTEGER,
        allowNull:false
      },
      created: {
        type: DataTypes.DATE,
        allowNull: false,
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
      tableName: 'motivational_phrase',
      timestamps: false
    }
  )
}
