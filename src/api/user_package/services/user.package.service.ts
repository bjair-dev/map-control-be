import { DataBase } from "../../../database"

export const getPackagePendingServices = async ({
    package_header_Id,
    packagePending,
    option,
  }: {
    package_header_Id: number | null
    packagePending?:any
    option?:string
  }) => {

     const getContentPending = await DataBase.instance.package.findAll({
            
        where:{
            package_header_Id:package_header_Id,
            state:true,
        },
        attributes:{
            exclude:['tipId','created'
            ,'created_by','package_header_Id'
            ,'videoId','questionId','challengeId','package_content_type_id']
        },
        
        include:[{
          model:DataBase.instance.tip,
         
          attributes:{
              exclude:['created','updated','updated_by','key','size'],
         }
         
      },
      {
          model:DataBase.instance.packageContentType,
          attributes:{
            exclude:['id']
          }
      },
      {
          model:DataBase.instance.question,
          include:[{
            model:DataBase.instance.questionType,
            attributes:{
              exclude:['created','updated','state'],
         },
          }],
          attributes:{
              exclude:['created','updated','updated_by','key','size','question_type_id'],
         },
          
      },
      {
          model:DataBase.instance.challenge,
          attributes:{
               exclude:['created','updated','updated_by','key','size','created_by'],
          },
      },
      {
          model:DataBase.instance.video,
          include:[{
              model:DataBase.instance.videoCategory,
              attributes:{
                  exclude:['updated','created_by','updated_by','created']
              }
          }],
          attributes:{
              exclude:['created_by','updated_by','key_video','updated','key','size','id','size_video','video_category_id'],
          },
        },
        {
            model:DataBase.instance.packageHeader,
            attributes:[],
            include:[{
                model:DataBase.instance.packageType
              }]
        }
      ]
    })
      //Convert Object without copy or without reference
      const data:Array<any> = JSON.parse(JSON.stringify(getContentPending)) 
          
      //filter only state true 
      const newData = data.filter(item=>{
          if( item?.video?.state == true)return true
          if( item?.tip?.state == true)return true
          if( item?.challenge?.state == true)return true
          if( item?.question?.state == true)return true
        })
        
        
        let questions_egress:any = []
        let questions_entry:any = []
        let video:any = []
        let tips:any = []
        let challenge:any = []
        
        newData.forEach((item,index,arr)=>{
      //delete nulls

        if(item?.question == null )delete(item.question)
        if(item?.tip == null )delete(item.tip)
        if(item?.video == null )delete(item.video)
        if(item?.challenge == null )delete(item.challenge)
        
        // start order
        if(item?.question?.question_type?.type == 'Ingreso')questions_entry.push(item)
        if(item?.question?.question_type?.type == 'Egreso' )questions_egress.push(item)
        if(item?.video )video.push(item)
        if(item?.tip )tips.push(item)
        if(item?.challenge )challenge.push(item)
      })
      
      
      const result_package = Object.assign({},{
        total:data.length,
        index:packagePending.index,
        id:packagePending.id,
        status:packagePending.status,
        day_session : packagePending.user_session_day,
        data:[...questions_entry,...questions_egress,...video,...tips,...challenge]
      })
    
    return result_package
  }


