import { BuildOptions, DataTypes, Model, Sequelize } from 'sequelize'

export interface CommentsAttributes {
  id?: number
  coment_text?: string
  direct_map?: string
  id_user?: number
  coment_calificacion?: string
  coment_motivo?: string
  

  /* '$package.id$'?: number */
}
export interface CommentsModel extends Model<CommentsAttributes>, CommentsAttributes {}
export class Comments extends Model<CommentsModel, CommentsAttributes> {}

export type CommentsStatic = typeof Model & {
  new (values?: object, options?: BuildOptions): CommentsModel
}

export function CommentsFactory(sequelize: Sequelize): CommentsStatic {
  return <CommentsStatic>sequelize.define(
    'comments_map',
    {
      id: {
        type: DataTypes.INTEGER,
        allowNull: false,
        primaryKey: true,
        autoIncrement: true,
      },
   
      coment_text: {
        type: DataTypes.TEXT,
        allowNull: false,
      },
      direct_map: {
        type: DataTypes.STRING(500),
        allowNull: false,
      },
      id_user:{
        type: DataTypes.INTEGER,
        allowNull:false,
        
      },
      coment_calificacion: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
      coment_motivo: {
        type: DataTypes.STRING(55),
        allowNull: false,
      },
    },
    {
      initialAutoIncrement: '1',
      tableName: 'comments_map',
      timestamps: false,
    }
  )
}
