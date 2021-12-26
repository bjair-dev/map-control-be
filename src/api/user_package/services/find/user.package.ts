import { FindAttributeOptions, Op, Order, WhereOptions } from "sequelize"
import sequelize from "sequelize"
import { DataBase } from "../../../../database"
import { UserAttributes } from "../../../user/models/user.model"
import { UserPackageAttributes, UserPackageModel } from "../../models/user.package.model"

export const findAllUsers = async ({
    page,
    where,
    attributes,
    order,
  }: {
    page: number
    where?: WhereOptions<UserAttributes>
    attributes?: FindAttributeOptions
    order: Order
  }) => {
    try {
      const limit: number = 12
      const offset: number = 0 + (page - 1) * limit
      const { count, rows } = await DataBase.instance.user.findAndCountAll({
        where,
        attributes,
        order,
        limit,
        offset,
      })
      return { page, count, rows }
    } catch (err) {
      throw err
    }
  }
  
  export const SearchLatestPackage = async ({
    userId,
    attributes,
  }: {
    userId?:number
    attributes?: FindAttributeOptions
  }) => {
    try {
     const findPackagePending = await DataBase.instance.userPackage.findOne({
      where:{
            userId
    },
         attributes,
         order:[['created','DESC']],
         limit:1
     })
     if (findPackagePending) return findPackagePending.get({ plain: true })
     return findPackagePending
     
    } catch (err) {
      throw err
    }
  }
  
  
  
  
  export const SearchPackage = async ({
    userId,
    attributes,
    order
  }: {
    userId?:number
    attributes?: FindAttributeOptions
    order?:Order
  }) => {
    try {
     const findPackagePending = await DataBase.instance.userPackage.findOne({
      where:{
        [Op.and]:{
            status:'visto',
            userId
        }
    },
         attributes,
         order
     })
     if (findPackagePending) return findPackagePending.get({ plain: true })
     return findPackagePending
     
    } catch (err) {
      throw err
    }
  }
  
  export const SearchPackageTemporary = async ({
    userId,
    attributes,
    order
  }: {
    userId?:number
    attributes?: FindAttributeOptions
    order?:Order
  }) => {
    try {
     const findPackagePending = await DataBase.instance.temporaryUserPackage.findOne({
      where:{
        [Op.and]:{
            status:'visto',
            userId
        }
    },
         attributes,
         order
     })
     if (findPackagePending) return findPackagePending.get({ plain: true })
     return findPackagePending
     
    } catch (err) {
      throw err
    }
  }
  export const SearchPackageTemporaryStatusFinished = async ({
    userId,
    attributes,
  }: {
    userId?:number
    attributes?: FindAttributeOptions
  }) => {
    try {
     const findPackagePending = await DataBase.instance.temporaryUserPackage.findOne({
      where:{
        [Op.and]:{
            status:'terminado',
            userId
        }
    },
         attributes,
         order:[['created','DESC']],
         limit:1
     })
     if (findPackagePending) return findPackagePending.get({ plain: true })
     return findPackagePending
     
    } catch (err) {
      throw err
    }
  }
  
  
  export const checkDayOnePackageForUser  = async ({
    userId
  }: {
    userId?:number
  }) => {
    try {
     const count = await DataBase.instance.userPackage.count({
       where:{
         userId
       }
     })
    
     return count
     
    } catch (err) {
      throw err
    }
  }
  
  
  export const CountPackageUser  = async ({
    where
  }: {
    where?: WhereOptions<UserAttributes>
    
  }) => {
    try {
     const count = await DataBase.instance.userPackage.count({
       where
     })
    
     return count
     
    } catch (err) {
      throw err
    }
  }
  
  
  export const SearchUserPackagesStatusFinished = async ({
    userId,
    // attributes,
    // order
  }: {
    userId:number
    // attributes?: FindAttributeOptions
    // order?:Order
  }) => {
    try {
     const packages = await DataBase.instance.userPackage.findAll({
      where:{
        userId,
        status:'terminado'
      },
      attributes:['package_header_Id']
    }) 
    
     return packages
     
    } catch (err) {
      throw err
    }
  }
  
  
  
  //Videos
  export const getSixthReportVideos = async (
    {startDate,finishDate}:
  {
      startDate:any,
      finishDate:any,
  }
    ) => {
    try {
      //reportUseRegularUse 
      const reportVideos = await DataBase.instance.userPackage.findAll({
        attributes: [
          [sequelize.col('userId'),'id_user'],
          [sequelize.literal(`sum((
            select count(videoId) from package where package_header_id=user_package.package_header_Id and videoId is not null))`), 'cantidad de recibidos'],
          [sequelize.literal(`sum((select count(videoId) from package where package_header_id=user_package.package_header_Id 
          and user_package.status='terminado' and videoId is not null))`), 'cantidad de terminados'],
          [sequelize.literal(`(select count(*) from metrics where actionId=1 and userId = id_user )`), 'nro videos que comparte'],
          [sequelize.literal(`(select  GROUP_CONCAT(distinct contentId) from metrics where actionId=1 and userId=id_user and contentId!=0)`), 'id de videos'],
          
          // [sequelize.literal(`sec_to_time(sum(TIMESTAMPDIFF(second,start_session, last_session)))`),'usetime'],
          ],
        where:{
          // state:true,
          [Op.and]:[
            sequelize.literal(`DATE_SUB(created , interval 5 hour) between '${startDate}' and '${finishDate}' `)
            ],
          
        },
        group:['userId'],
        // logging:console.log
      })
      
      return reportVideos
    } catch (error) {
      throw error
    }
  }
  
  
   //Tips
   export const getFifthReportTips = async (
    {startDate,finishDate}:
  {
      startDate:any,
      finishDate:any,
  }
    ) => {
    try {
      //reportUseRegularUse 
      const reportTips = await DataBase.instance.userPackage.findAll({
        attributes: [
          [sequelize.col('userId'),'id_user'],
          [sequelize.literal(`sum((
            select count(tipId) from package where package_header_id=user_package.package_header_Id and tipId is not null))`), 'cantidad de recibidos'],
          [sequelize.literal(`sum((select count(tipId) from package where package_header_id=user_package.package_header_Id and user_package.status='terminado' and tipId is not null))`), 'cantidad de terminados'],
          [sequelize.literal(`(select count(*) from metrics where actionId=2 and userId = id_user )`), 'nro videos que comparte'],
          [sequelize.literal(`(select  GROUP_CONCAT(distinct contentId) from metrics where actionId=2 and userId=id_user and contentId!=0)`), 'id de tips'],
          
          // [sequelize.literal(`sec_to_time(sum(TIMESTAMPDIFF(second,start_session, last_session)))`),'usetime'],
          ],
        where:{
          // state:true,
          [Op.and]:[
            sequelize.literal(`DATE_SUB(created , interval 5 hour) between '${startDate}' and '${finishDate}' `)
            ],
          
        },
        group:['userId'],
        // logging:console.log
      })
      
      return reportTips
    } catch (error) {
      throw error
    }
  }
  