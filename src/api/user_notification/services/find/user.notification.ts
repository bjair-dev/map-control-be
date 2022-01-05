// import { DataBase } from "../../../../database"

import { DataBase } from "../../../../database"

// export const SearchUserPackagesStatusFinished = async ({
//     userId,
//     // attributes,
//     // order
//   }: {
//     userId:number
//     // attributes?: FindAttributeOptions
//     // order?:Order
//   }) => {
//     try {
//      const packages = await DataBase.instance.userNotification.findAll({
//       where:{
//         userId,
//         status:'terminado'
//       },
//       attributes:['package_header_Id']
//     }) 
    
//      return packages
     
//     } catch (err) {
//       throw err
//     }
//   }

export const SearchHistoryContentNotification = async ({
    userId,
    content_type
  }: {
    userId:number
    content_type:number
  }) => {
    try {
        const content:any = await DataBase.instance.userNotification.findAll({
            where:{
              userId,
              state:true,
              status:'terminado',
              // date:moment().local().format('YYYY-MM-DD'),
              "$notification.content_type$":content_type
            },
            include:[{
              model:DataBase.instance.notification,
              attributes:["content_id"],
              // attributes:[],
              required:true
            }]
            // logging:console.log
          })
    
     return content
     
    } catch (err) {
      throw err
    }
  }