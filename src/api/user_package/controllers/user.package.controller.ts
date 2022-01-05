import { NextFunction, Request, Response } from 'express'
import createError from 'http-errors'
import moment from 'moment'
import sequelize, { Op, where } from 'sequelize'

import { DataBase } from '../../../database'
import { IToken } from '../../auth/passport/passport'
import { CountPackage, findPackageFilter } from '../../package/services/find/package'
// import { findOnePackageHeader } from '../../package/services/find/package.header'
import { FilterTips } from '../../tip/services/find'
import { createUserChallengeService } from '../../user_challenge/services/user.challenge.service'
import { SearchHistoryContentNotification } from '../../user_notification/services/find/user.notification'
import { FilterVideos } from '../../videos/services/find'
// import { findAllUsers } from '../../user/services/find'
import { createUserPackage } from '../services/create/user.package'
import {
  // checkDayOnePackageForUser,
  // CountPackageUser,
  // SearchLatestPackage,
  SearchPackage,
  SearchPackageTemporary,
  SearchPackageTemporaryStatusFinished,
  SearchUserPackagesStatusFinished,
} from '../services/find/user.package'
import { updateIndexUserPackage, updateUserPackage } from '../services/update/user.package'
import { getPackagePendingServices } from '../services/user.package.service'
// import { UserAttributes } from '../models/user.model'

export const getContentForUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user as IToken
    const convertToday = moment().format('YYYY-MM-DD')
    let daySession = 1
    let daySessionTemporary = 1
    let existsSessionTemporary = false
    const answeredQuestion21 = await DataBase.instance.answer.count({
      where: {
        userId,
        state: true,
        question21: true,
      },
    })
    // console.log("answeredQuestion21",answeredQuestion21)
    // ¿Respondio las 21 preguntas?
    const count_question = 21
    // if(countNotificationsTerminado >= 21 ){}
    if (answeredQuestion21 < count_question) {
      // 1 Flujo
      //Se busca paquetes pendientes

      const packageTemporaryPending = await SearchPackageTemporary({ userId })

      // Si tiene paquete pendiente
      if (packageTemporaryPending) {
        const getContentPending = await getPackagePendingServices({
          package_header_Id: Number(packageTemporaryPending?.package_header_Id),
          packagePending: packageTemporaryPending,
        })
        return res
          .status(200)
          .json(Object.assign({ type: 'temporary', answeredQuestion: answeredQuestion21 }, getContentPending))
      }

      const packagePending = await SearchPackage({ userId })

      // Si tiene paquete pendiente
      if (packagePending) {
        const getContentPending = await getPackagePendingServices({
          package_header_Id: Number(packagePending?.package_header_Id),
          packagePending,
        })
        return res
          .status(200)
          .json(Object.assign({ answeredQuestion: answeredQuestion21 }, getContentPending))

        // return res.status(200).json(Object.assign({ answeredQuestion:answ },getContentPending))
      }
      // No tiene paquete pendiente
      if (!packagePending && !packageTemporaryPending) {
        // console.log("!packagePending")
        //Ver si es usuario nuevo
        // let daySession = 0
        // let daySessionTemporary = 0
        // let existsSessionTemporary = false

        const latestUserPackage = await DataBase.instance.userPackage.findOne({
          where: {
            userId,
          },
          order: [['created', 'DESC']],
        })

        // sesion 1 02/12/2021 -> paquete por sesion 1
        // sesion 2 02/12/2021 -> paquete por sesion 1

        // hoy sesion 4  ultimo
        if (!latestUserPackage) daySession = 1
        if (latestUserPackage) {
          let currentDate = moment().local().format('YYYY-MM-DD')
          daySession =
            latestUserPackage?.date == currentDate
              ? Number(latestUserPackage?.user_session_day)
              : Number(latestUserPackage?.user_session_day) + 1
        }

        const getLastestTemporaryUserPackage = await SearchPackageTemporaryStatusFinished({ userId })
        if (convertToday != latestUserPackage?.date && getLastestTemporaryUserPackage) {
          // if(daySession < Number(getLastestTemporaryUserPackage?.user_session_day)){
          // console.log("El usuario se ha saltado sesiones")
          //El usuario vio sesiones temporales
          //Se tiene que ignorar esas sesiones
          // sesion temporal 8

          //daySession = 5
          const day = await DataBase.instance.temporaryUserSession.findOne({
            where: {
              userId,
            },
          })
          daySessionTemporary = Number(day?.user_session_day) + 1
          existsSessionTemporary = true

          // }
        }
        // Paquetes por fecha o dia de sesion - IGNORADO
        // SE BUSCA PAQUETES POR DIA DE SESION
        // NOTA : SE TIENE EN CUENTA QUE POR DIA DE SESION SE ENVIA UN PAQUETE PERO POR FECHA SE ENVIA VARIOS
        const packagesByDateOrSession = await DataBase.instance.packageHeader.findAll({
          where: {
            [Op.or]: [
              { date: daySessionTemporary },
              // { date:daySession },

              // { date: {
              //   [Op.like]:`${moment().toDate().toDateString()}%`
              // } }
            ],
            state: true,
          },
          attributes: ['id'],
        })
        // los ids disponibles por fecha o dia de sesion
        const getIdsPackagesByDateOrSession = packagesByDateOrSession.map((item: any) => item.id)

        //contar paquetes finalizados
        // const countFinishedPackages = await DataBase.instance.userPackage.count({

        const FinishedPackages = await DataBase.instance.userPackage.findAndCountAll({
          where: {
            userId,
            status: 'terminado',
            package_header_Id: {
              [Op.in]: getIdsPackagesByDateOrSession,
            },
            // user_session_day:daySession
          },
        })

        //Validar si el usuario vio todos los paquetes disponibles
        // Falta ver
        if (FinishedPackages.count < packagesByDateOrSession.length) {
          //Falta ver mas paquetes

          // Lista de Id de los paquetes terminados
          const idFinished = FinishedPackages.rows.map((item) => item.package_header_Id)

          // Lista de Id de los paquetes que falta ver
          const idsMissing = getIdsPackagesByDateOrSession.filter((item) => !idFinished.includes(item))
          const getRandomIdMissing = idsMissing[0]

          const { id, status, user_session_day, index } = await createUserPackage({
            user_package: {
              package_header_Id: getRandomIdMissing,
              userId,
              status: 'visto',
              user_session_day: daySession,
              date: convertToday,
            },
          })

          await DataBase.instance.temporaryUserSession.destroy({ where: { userId } })

          await DataBase.instance.temporaryUserSession.upsert({
            userId,
            // user_session_day:daySessionTemporary//existsSessionTemporary==true?daySessionTemporary:daySession
            user_session_day: existsSessionTemporary == true ? daySessionTemporary : daySession,
          })

          const getContentPending = await getPackagePendingServices({
            package_header_Id: getRandomIdMissing,
            packagePending: {
              id,
              status,
              user_session_day,
              index,
            },
          })
          const filterChallenge = getContentPending.data.filter((item) => item?.challenge?.id)
          if (filterChallenge.length > 0) {
            for (const item of filterChallenge) {
              await createUserChallengeService({
                userId,
                challengeId: item?.challenge?.id,
              })
            }
          }
          return res
            .status(200)
            .json(Object.assign({ answeredQuestion: answeredQuestion21 }, getContentPending))

          // return res.status(200).json(getContentPending)
        }
        //Ya vio de la sesion actual
        // puede saltar de sesion
        if (FinishedPackages.count >= packagesByDateOrSession.length) {
          const packagePending = await SearchPackageTemporary({ userId })

          // Si tiene paquete pendiente
          if (packagePending) {
            const getContentPending = await getPackagePendingServices({
              package_header_Id: Number(packagePending?.package_header_Id),
              packagePending,
            })
            return res
              .status(200)
              .json(
                Object.assign({ type: 'temporary', answeredQuestion: answeredQuestion21 }, getContentPending)
              )
          }

          //Falta ver mas paquetes
          let temporaryUserSession = await DataBase.instance.temporaryUserSession.findOne({
            where: { userId },
          })
          let temporaryDaySession = Number(temporaryUserSession?.user_session_day) + 1

          const packagesByDateOrSession = await DataBase.instance.packageHeader.findOne({
            where: {
              [Op.or]: [{ date: temporaryDaySession }],
              state: true,
            },
            attributes: ['id'],
          })

          const { id, status, user_session_day, index } = await DataBase.instance.temporaryUserPackage.create(
            {
              created: moment().toDate(),
              index: 0,
              package_header_Id: packagesByDateOrSession?.id,
              userId,
              status: 'visto',
              user_session_day: temporaryDaySession,
              date: convertToday,
            }
          )
          await DataBase.instance.temporaryUserSession.destroy({ where: { userId } })
          await DataBase.instance.temporaryUserSession.upsert({
            userId,
            user_session_day,
          })

          const getContentPending = await getPackagePendingServices({
            package_header_Id: Number(packagesByDateOrSession?.id),
            packagePending: {
              id,
              status,
              user_session_day,
              index,
            },
          })
          const filterChallenge = getContentPending.data.filter((item) => item?.challenge?.id)
          if (filterChallenge.length > 0) {
            for (const item of filterChallenge) {
              await createUserChallengeService({
                userId,
                challengeId: item?.challenge?.id,
              })
            }
          }

          return res
            .status(200)
            .json(
              Object.assign({ type: 'temporary', answeredQuestion: answeredQuestion21 }, getContentPending)
            )
        }

        return res.json([])
      }
    }
    if (answeredQuestion21 >= count_question) {
      // 2 Flujo
      const latestUserPackage = await DataBase.instance.userPackage.findOne({
        where: {
          userId,
        },
        order: [['created', 'DESC']],
      })

      if (latestUserPackage?.date == convertToday) {
        if (latestUserPackage.status == 'visto') {
          const countContentLockedIndex = await DataBase.instance.package.count({
            where: {
              state: false,
              package_header_Id: latestUserPackage?.package_header_Id,
              questionId: {
                [Op.not]: null,
              },
            },
            // logging:console.log
          })

          let indice: number | undefined = latestUserPackage?.index
          if (countContentLockedIndex > 0) {
            if (indice != undefined && indice >= countContentLockedIndex) {
              latestUserPackage.index = indice - countContentLockedIndex
              await latestUserPackage.save()
            }
          }
          const getContentPending = await getPackagePendingServices({
            package_header_Id: Number(latestUserPackage?.package_header_Id),
            packagePending: latestUserPackage,
          })
          return res.status(200).json(getContentPending)
        }

        const calculateDaySession = Number(latestUserPackage?.user_session_day)
        const packagesByDateOrSession = await DataBase.instance.packageHeader.findAll({
          where: {
            [Op.or]: [
              { date: calculateDaySession },
              {
                date: {
                  [Op.like]: `${moment().toDate().toDateString()}%`,
                },
              },
            ],
            id: {
              [Op.in]: [sequelize.literal('select distinct(package_header_Id) from package ')],
            },
            state: true,
          },
          attributes: ['id'],
        })
        // const copy_packagesByDateOrSession = JSON.parse(JSON.stringify(packagesByDateOrSession))
        // const outPackageBySessionDay = copy_packagesByDateOrSession.filter(( item:any )=> item.package_type_id == 1)
        // const outPackageBySessionDayIds = outPackageBySessionDay.map((item:any) => item?.id)

        // los ids disponibles por fecha o dia de sesion
        const getIdsPackagesByDateOrSession = packagesByDateOrSession.map((item: any) => item.id)

        //contar paquetes finalizados
        // const countFinishedPackages = await DataBase.instance.userPackage.count({

        const FinishedPackages = await DataBase.instance.userPackage.findAndCountAll({
          where: {
            userId,
            status: 'terminado',
            package_header_Id: {
              [Op.in]: getIdsPackagesByDateOrSession,
            },
            date: convertToday,
          },
        })
        if (FinishedPackages.count < packagesByDateOrSession.length) {
          //Falta ver mas paquetes

          // Lista de Id de los paquetes terminados
          const idFinished = FinishedPackages.rows.map((item) => item.package_header_Id)

          // Lista de Id de los paquetes que falta ver
          const idsMissing = getIdsPackagesByDateOrSession.filter((item) => !idFinished.includes(item))

          const getRandomIdMissing = idsMissing[0]

          const { id, status, user_session_day, index } = await createUserPackage({
            user_package: {
              package_header_Id: getRandomIdMissing,
              userId,
              status: 'visto',
              user_session_day: calculateDaySession,
              date: convertToday,
            },
          })
          const getContentPending = await getPackagePendingServices({
            package_header_Id: getRandomIdMissing,
            packagePending: {
              id,
              status,
              user_session_day,
              index,
            },
          })

          const filterChallenge = getContentPending.data.filter((item) => item?.challenge?.id)
          if (filterChallenge.length > 0) {
            for (const item of filterChallenge) {
              await createUserChallengeService({
                userId,
                challengeId: item?.challenge?.id,
              })
            }
          }
          // const addUserChallenge = []
          return res.status(200).json(getContentPending)
        }
        if (FinishedPackages.count >= packagesByDateOrSession.length) {
          //Ya no tienes contenido para ver hoy dia
          return res.json([])
        }

        return res.json([])

        //Buscar si hay mas paquetes para ese dia
      }

      //Dia nuevo
      if (latestUserPackage?.date != convertToday) {
        const diffDaySession = moment().local().diff(latestUserPackage?.date, 'days')
        const calculateDaySession = diffDaySession + Number(latestUserPackage?.user_session_day)

        const packagesByDateOrSession = await DataBase.instance.packageHeader.findAll({
          where: {
            [Op.or]: [
              { date: calculateDaySession },
              {
                date: {
                  [Op.like]: `${moment().toDate().toDateString()}%`,
                },
              },
            ],
            id: {
              [Op.in]: [sequelize.literal('select distinct(package_header_Id) from package ')],
            },
            state: true,
          },
          attributes: ['id', 'package_type_id'],
          // logging:true
        })

        if (packagesByDateOrSession.length == 0) return res.json([])

        const copy_packagesByDateOrSession = JSON.parse(JSON.stringify(packagesByDateOrSession))
        const outPackageBySessionDay = copy_packagesByDateOrSession.filter(
          (item: any) => item.package_type_id == 1
        )
        const outPackageBySessionDayIds = outPackageBySessionDay.map((item: any) => item?.id)
        // los ids disponibles por fecha o dia de sesion
        const getIdsPackagesByDateOrSession = packagesByDateOrSession.map((item: any) => item.id)

        //contar paquetes finalizados
        // const countFinishedPackages = await DataBase.instance.userPackage.count({
        const FinishedPackages = await DataBase.instance.userPackage.findAndCountAll({
          where: {
            userId,
            status: 'terminado',
            package_header_Id: {
              [Op.in]: getIdsPackagesByDateOrSession,
            },
            // user_session_day:daySession
          },
        })
        if (FinishedPackages.count < packagesByDateOrSession.length) {
          //Falta ver mas paquetes

          // Lista de Id de los paquetes terminados
          const idFinished = FinishedPackages.rows.map((item) => item.package_header_Id)

          // Lista de Id de los paquetes que falta ver
          const idsMissing = getIdsPackagesByDateOrSession.filter((item) => !idFinished.includes(item))

          const getRandomIdMissing =
            outPackageBySessionDayIds.length > 0 ? outPackageBySessionDayIds[0] : idsMissing[0]

          const { id, status, user_session_day, index } = await createUserPackage({
            user_package: {
              package_header_Id: getRandomIdMissing,
              userId,
              status: 'visto',
              user_session_day: calculateDaySession,
              date: convertToday,
            },
          })
          const getContentPending = await getPackagePendingServices({
            package_header_Id: getRandomIdMissing,
            packagePending: {
              id,
              status,
              user_session_day,
              index,
            },
          })
          const filterChallenge = getContentPending.data.filter((item) => item?.challenge?.id)
          if (filterChallenge.length > 0) {
            for (const item of filterChallenge) {
              await createUserChallengeService({
                userId,
                challengeId: item?.challenge?.id,
              })
            }
          }
          return res.status(200).json(getContentPending)
        }
        return res.json([])
      }

      return res.json([])
    }
    return res.json(answeredQuestion21)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const updateContentForUserController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id } = req.params
    const type = req.query.type
    if (type && type == 'temporary') {
      await DataBase.instance.temporaryUserPackage.update(
        {
          status: 'terminado',
        },
        {
          where: {
            id: Number(id),
          },
        }
      )
      return res.status(200).json('Operación exitosa')
    }

    await updateUserPackage({ id: Number(id) })
    return res.status(200).json('Operación exitosa')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const updateIndexUserPackageController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { id, current_index } = req.params
    const type = req.query.type
    if (type && type == 'temporary') {
      await DataBase.instance.temporaryUserPackage.update(
        {
          index: Number(current_index),
        },
        {
          where: {
            id,
          },
        }
      )
      return res.status(200).json('Operación exitosa')
    }
    await updateIndexUserPackage({ id: Number(id), index: Number(current_index) })
    return res.status(200).json('Operación exitosa')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const getHistoryOfTipsController = async (req: Request, res: Response, next: NextFunction) => {
  console.log('llega aca')
  try {
    const { userId } = req.user as IToken
    const { tip_category_id } = req.params
    const packages = await SearchUserPackagesStatusFinished({ userId })
    console.log(packages, '1')
    // if (packages.length == 0) return res.json({ message: 'No tienes historial de paquetes' })
    // if (packages.length == 0) return res.json([])
    

    const ids_package_header: any[] = packages.map((item) => item.package_header_Id)
    const packageFind = await findPackageFilter({
      where: {
        package_header_Id: {
          [Op.in]: ids_package_header,
        },
        tipId: {
          [Op.not]: null,
        },
      },
      attributes: ['tipId'],
    })
    // if (packageFind.length == 0) return res.json([])
    // if (packageFind.length == 0) return res.json({ message: 'No hay tips en tu historial' })
    
    const tips_notification:any = await SearchHistoryContentNotification({content_type:1,userId})
    // DataBase.instance.userNotification.findAll({
    //   where:{
    //     userId,
    //     state:true,
    //     status:'terminado',
    //     // date:moment().local().format('YYYY-MM-DD'),
    //     "$notification.content_type$":1
    //   },
    //   include:[{
    //     model:DataBase.instance.notification,
    //     attributes:["content_id"],
    //     // attributes:[],
    //     required:true
    //   }],
    //   // attributes:[],
    //   logging:console.log
    // })
    if ((packageFind.length == 0 || packageFind == null) && (tips_notification.length == 0 || tips_notification == null)) return res.json([])
    const id_tips_notification: any[] = tips_notification.map((item:any) => item?.notification?.content_id)
    
    const id_tips: any[] = packageFind.map((item) => item?.tipId)
    const set_id_tips = [...new Set([...id_tips_notification, ...id_tips])]
    const tips = await FilterTips(set_id_tips, Number(tip_category_id))

    return res.status(200).json(tips)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}

export const getHistoryOfVideosController = async (req: Request, res: Response, next: NextFunction) => {
  try {
    const { userId } = req.user as IToken

    const packages = await SearchUserPackagesStatusFinished({ userId })

    // if (packages.length == 0) return res.json({ message: 'No tienes historial de paquetes' })
    // if (packages.length == 0) return res.json([])
    

    const ids_package_header: any[] = packages.map((item) => item.package_header_Id)
    const packageFind = await findPackageFilter({
      where: {
        package_header_Id: {
          [Op.in]: ids_package_header,
        },
        videoId: {
          [Op.not]: null,
        },
      },
      attributes: ['videoId'],
    })

    // if (packageFind.length == 0) return res.json({ message: 'No hay videos en tu historial' })
    // if (packageFind.length == 0) return res.json([])
    

    const videos_notification:any[] = await SearchHistoryContentNotification({content_type:3,userId})
    // await DataBase.instance.userNotification.findAll({
    //   where:{
    //     userId,
    //     state:true,
    //     status:'terminado',
    //     // date:moment().local().format('YYYY-MM-DD'),
    //     "$notification.content_type$":3
    //   },
    //   include:[{
    //     model:DataBase.instance.notification,
    //     attributes:["content_id"],
    //     // attributes:[],
    //     required:true
    //   }],
    //   // attributes:[],
    //   logging:console.log
    // })
    
    if ((packageFind.length == 0 || packageFind == null) && (videos_notification.length == 0 || videos_notification == null)) return res.json([])
    
    const id_videos_notification: any[] = videos_notification.map((item:any) => item?.notification?.content_id)
    const id_videos: any[] = packageFind.map((item) => item?.videoId)
    const set_id_videos = [...new Set([...id_videos_notification, ...id_videos])]

    const videos = await FilterVideos(set_id_videos)

    return res.status(200).json(videos)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))
    next(createError(404, err))
  }
}
