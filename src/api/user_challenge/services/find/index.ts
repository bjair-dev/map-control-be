import { DataBase } from '../../../../database'
// import { UserChallengeModel, UserChallengeAttributtes } from '../../models/user.challenge.model'
import { Op, WhereOptions } from 'sequelize'
import { FindAttributeOptions } from 'sequelize/types'
import sequelize from 'sequelize'

export const findOneUserChallenge = async (id: number) => {
  try {
    const challenges = await DataBase.instance.userChallenge.findOne({
      where: {
        id: id,
      },
    })

    return challenges
  } catch (error) {
    throw error
  }
}
export const findMedalsByUserId = async (userId: number) => {
  try {
    const chall = await DataBase.instance.userChallenge.findAndCountAll({
      where: {
        userId: userId,
        status: 'completado',
      },
    })
    return chall
  } catch (error) {
    throw error
  }
}
export const findAllByUserId = async (userId: number) => {
  try {
    const challenges = await DataBase.instance.userChallenge.findAll({
      where: {
        userId: userId,
      },
    })
    return challenges
  } catch (error) {
    throw error
  }
}
export const findAllByUserIdAndChallengeId = async (userId: number, challengeId: number) => {
  try {
    const challenges = await DataBase.instance.userChallenge.findAll({
      where: {
        userId: userId,
        challengeId: challengeId,
      },
      limit: 1,
    })
    return challenges
  } catch (error) {
    throw error
  }
}

export const countChallengeSuccessFullInTheWeek = async ({ weekDate,yearDate }: { weekDate: any,yearDate:any }) => {
  try {
    const challenges = await DataBase.instance.userChallenge.count({
      where:{
        status:'completado',
        [Op.and]:[
          sequelize.where(sequelize.fn('WEEK', sequelize.col('completed_date')), weekDate),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('completed_date')), yearDate),
        ]
        // completed_date
      },
      // logging:console.log
    })
    return challenges
  } catch (error) {
    throw error
  }
}

export const countChallengeSuccessFullInTheMonth = async ({ yearDate,monthDate }: { yearDate:any,monthDate:any }) => {
  try {
    const challenges =  await DataBase.instance.userChallenge.count({
      where:{
        status:'completado',
        [Op.and]:[
          sequelize.where(sequelize.fn('MONTH', sequelize.col('completed_date')), monthDate ),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('completed_date')), yearDate ),
        ]
      },
      // logging:console.log
    })
    
    return challenges
  } catch (error) {
    throw error
  }
}

export const getTopChallengeUser = async ({ yearDate,monthDate }: { yearDate:any,monthDate:any }) => {
  try {
    const topChallengeUser = await DataBase.instance.userChallenge.findAll({
      attributes:[
          'userId',
          
          [sequelize.fn('count', sequelize.col('userId')), 'quantity'],
      ],
      include:[{
        model:DataBase.instance.user,
        where:{
          state:true
        },
        attributes:['name','lastname']
      }],
        where:{
          status:'completado',
          [Op.and]:[
            sequelize.where(sequelize.fn('MONTH', sequelize.col('completed_date')), monthDate),
            sequelize.where(sequelize.fn('YEAR', sequelize.col('completed_date')), yearDate),
          ]
        },
        group:['userId'],
        limit:4,
        order:[[sequelize.col('quantity'),'DESC']],
        // logging:console.log
      }) 
     
    
    return topChallengeUser
  } catch (error) {
    throw error
  }
}

