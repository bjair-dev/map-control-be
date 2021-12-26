import { DataBase } from '../../../../database'
import { VideoAttributes } from '../../models/video.model'
import { FindAttributeOptions } from 'sequelize/types'
import {Op} from 'sequelize'
export const findAllVideos = async ({
  where,
  page,
  attributes,
}: {
  where?: VideoAttributes
  page: number
  attributes?: FindAttributeOptions
}) => {
  try {
    const limit: number = 12
    const offset: number = 0 + (page - 1) * limit
    const { count, rows } = await DataBase.instance.video.findAndCountAll({
      where,
      limit,
      offset,
      order: [['id', 'DESC']],
      attributes,
      include: [
        {
          model: DataBase.instance.videoCategory,
          as: 'video_category',
          required: true,
          attributes: ['id', 'category'],
        },
      ],
    })
    return { page, count, rows }
  } catch (err) {
    throw err
  }
}
export const findOneVideo = async ({
  where,
  attributes,
}: {
  where?: VideoAttributes
  attributes?: FindAttributeOptions
}): Promise<VideoAttributes | null> => {
  try {
    const video = await DataBase.instance.video.findOne({
      where,
      attributes,
    })
    if (video) return video.get({ plain: true })
    return video
  } catch (err) {
    throw err
  }
}


export const FilterVideos = async (
  id_videos:Array<number > 
  ) => {
    try {
      
      const videos = await DataBase.instance.video.findAll({
        where:{
          state:true,
          id:{
            [Op.in]:id_videos
          }
        },
        include:[{
          model:DataBase.instance.videoCategory,
          attributes:{
            exclude:['updated_by','created_by','updated','created']
          }
        }],
        attributes:{
          exclude:['size','created_by','updated_by','updated','created','key_video','size_video','key','video_category_id']
        }
      })
      return videos
      
    } catch (error) {
      throw error
    }
}

export const getFindIdsVideosd = async ({
  map_content_id_metrics,
  video_category_id
}:{
  
  map_content_id_metrics:any
  video_category_id:number
}
  ):Promise<VideoAttributes[]> => {
    try {
      
      const findIdsVideos:VideoAttributes[] = await DataBase.instance.video.findAll({
        where:{
          id:{
            [Op.in]:map_content_id_metrics
          },
          video_category_id
        },
        attributes:['id']
      })
      return findIdsVideos
      
    } catch (error) {
      throw error
    }
}

