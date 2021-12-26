// import { DataBase } from "../../../../database"

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