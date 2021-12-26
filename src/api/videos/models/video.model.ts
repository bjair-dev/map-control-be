import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface VideoAttributes {
  id?: number
  created?: Date
  updated?: Date
  title?: string
  path?: string
  key?: string
  size?: string
  path_video?: string
  key_video?: string
  size_video?: string
  created_by?: number
  updated_by?: number
  state?: number
  description?: string
  video_category_id?: number
}
export interface VideoModel extends Model<VideoAttributes>, VideoAttributes {}
export class Video extends Model<VideoModel, VideoAttributes> {}

export type VideoStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): VideoModel
}

export function VideoFactory(sequelize: Sequelize): VideoStatic {
  return <VideoStatic>sequelize.define(
    'video',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
      title: {
        type: DataTypes.STRING(200),
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
      path_video: {
        type: DataTypes.STRING(500),
        allowNull: true,
      },
      key_video: {
        type: DataTypes.STRING(150),
        allowNull: true,
      },
      size_video: {
        type: DataTypes.STRING(30),
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
      description: {
        type: DataTypes.STRING(200),
        allowNull: true,
      },
      state: {
        type: DataTypes.BOOLEAN,
        defaultValue: true,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'video',
      timestamps: false,
    }
  )
}
