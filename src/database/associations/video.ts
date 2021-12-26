import { VideoCategoryStatic } from '../../api/videos/models/video.category.model'
import { VideoStatic } from '../../api/videos/models/video.model'
export const videoCategoryHasManyVideo = ({
  videoCategory,
  video,
}: {
  videoCategory: VideoCategoryStatic
  video: VideoStatic
}): void => {
  videoCategory.hasMany(video, {
    foreignKey: { allowNull: true, name: 'video_category_id' },
    sourceKey: 'id',
  })
  video.belongsTo(videoCategory, {
    foreignKey: { allowNull: true, name: 'video_category_id' },
    targetKey: 'id',
  })
}
