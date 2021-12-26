import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface VideoCategoryAttributes {
  id?: number
  category?: string
  created?: Date
  updated?: Date
  created_by?: number
  updated_by?: number
}
export interface VideoCategoryModel
  extends Model<VideoCategoryAttributes>,
    VideoCategoryAttributes {}
export class VideoCategory extends Model<VideoCategory, VideoCategoryAttributes> {}

export type VideoCategoryStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): VideoCategoryModel
}

export function VideoCategoryFactory(sequelize: Sequelize): VideoCategoryStatic {
  return <VideoCategoryStatic>sequelize.define(
    'video_category',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      category: {
        type: DataTypes.STRING(100),
        allowNull: false,
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
    },
    {
      initialAutoIncrement: '1',
      tableName: 'video_category',
      timestamps: false,
      indexes: [
        {
          unique: true,
          fields: ['category'],
        },
      ],
    }
  )
}
