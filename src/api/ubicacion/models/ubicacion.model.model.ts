import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface UbicacionTypeAttributes {
  id?: number
  name: string
}
export interface UbicacionTypeModel extends Model<UbicacionTypeAttributes>, UbicacionTypeAttributes {}
export class UbicacionType extends Model<UbicacionTypeModel, UbicacionTypeAttributes> {}

export type UbicacionTypeStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): UbicacionTypeModel
}

export function UbicacionTypeFactory(sequelize: Sequelize): UbicacionTypeStatic {
  return <UbicacionTypeStatic>sequelize.define(
    'departamento',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      name: {
        type: DataTypes.STRING(45),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'departamento',
      timestamps: false,
    }
  )
}
