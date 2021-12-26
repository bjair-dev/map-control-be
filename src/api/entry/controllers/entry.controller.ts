import sequelize, { Op } from 'sequelize'
import createError from 'http-errors'
import { createEntry } from '../services/create'
import { NextFunction, Request, Response } from 'express'
import { EntryAttributes } from '../models/entry.model'
import { IToken } from '../../auth/passport/passport'
import { DataBase } from '../../../database'
import { findAll, findOne, findOneEgress, findOneEntryTag, getSumAmountByEntryTypeAndDateToday, getSumAmountEntryTypeAndEntryTag, SummaryOfTheMonthEntry } from '../services/find/entry'
import { deleteEntry } from '../services/delete/entry'
import { updateEntry } from '../services/update/entry'
import moment from 'moment'
// import { updateEntry } from '../services/update/entry'

export const createEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const entry: EntryAttributes = req.body
  const user = req.user as IToken

  try {
    // var stillUtc = moment.utc(entry.date).toDate();
    // console.log(stillUtc)
    // var local = moment(entry.date).local().format('YYYY-MM-DD HH:mm:ss');
    // var testDateUtc = moment.utc("2021-11-22T19:37:25.085Z");
    // var localDate:any = moment(entry.date).local();
    // console.log(moment(entry.date).local())
    // console.log(moment(entry.date).toDate())
    
    const obj = await createEntry({
      amount: entry.amount,
      userId: user.userId,
      // date:moment(localDate).subtract(5,'h').toDate(),
      date:moment(entry.date).local().toDate(),
      description: entry.description,
      entry_type_id: entry.entry_type_id,
      entry_tag_id:entry.entry_tag_id,
      account:entry.account,
      completed:entry.completed
    })
    res.status(200).json(obj)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const deleteEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IToken
  const { id } = req.params
  try {
    await deleteEntry({ id:Number(id),userId:user.userId })
    res.status(200).json('Operación exitosa')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const updateEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const user = req.user as IToken
  const entry: EntryAttributes = req.body
  const { id } = req.params
  try {
    await updateEntry({
      entry:{
        amount: entry.amount,
        date: entry.date,
        description: entry.description,
        entry_type_id: entry.entry_type_id,
        entry_tag_id:entry.entry_tag_id,
        account:entry.account,
        completed:entry.completed
      },
      where:{
        userId:Number(user.userId),
        id:Number(id)
      }

    })
    res.status(200).json('Operación exitosa')
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const ListEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { entry_tag_id,entry_type_id } = req.params
  const user = req.user as IToken
  try {
    
    const entry_tag = await DataBase.instance.entryTag.findByPk(entry_tag_id)
    const entry_type = await DataBase.instance.entryType.findByPk(entry_type_id)
    
    const amount_entry = await DataBase.instance.entry.sum('amount',{
      where:{
        entry_type_id,
        entry_tag_id,
        userId:user.userId
      }
    })
    
      const list  = await findAll({
        where:{
          userId:user.userId,
          entry_tag_id,
          entry_type_id
        },
        // attributes:[]
        attributes:{
          // include:[[sequelize.fn('sum', sequelize.col('amount')), 'total_amount']],
          exclude:['updated','entry_tag_id','userId','entry_type_id']
        },
        order:[['created','DESC']],
        limit:20
      })
      
      const data = {
        tag:entry_tag?.tag,
        type:entry_type?.type,
        amount_total:amount_entry,
        entry:list
      }
  
    res.status(200).json(data)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const ListOneEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  const { id } = req.params
  const user = req.user as IToken
  try {
      const entry  = await findOne({
       id : Number(id),
       userId:Number(user.userId)
       
      })
      
    res.status(200).json(entry)
  } catch (err: any) {
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const SummaryOfTheDayEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  // const { entry_tag_id,entry_type_id } = req.params
  // const convertToday = moment().utc().format('YYYY-MM-DD')
  const convertToday = moment().local().format('YYYY-MM-DD')
  
  const month:any = moment(convertToday).format('MM')
  const day:any = moment(convertToday).format('DD')
  const year:any = moment(convertToday).format('YYYY')
  
  const user = req.user as IToken
  try {
   
    const amount_entry_entry = await getSumAmountByEntryTypeAndDateToday({
      userId:user.userId,
      entry_type_id:1,
      day,
      year,
      month
    })
    
    const amount_entry_egress = await getSumAmountByEntryTypeAndDateToday({
      userId:user.userId,
      entry_type_id:2,
      day,
      year,
      month
    })
    if ((amount_entry_entry == 0 && amount_entry_egress == 0) || (amount_entry_entry == null && amount_entry_egress == null)) {
      return res.status(200).json({
        savingsPercentage:0,
        entryPercentege:0,
        egressPercentege:0,
        higherSpending:{
          tag:"",
          tag_type:"",
          spending:0,
          percentege:0
        }, 
      })
    }
    
    const entryTotal = amount_entry_entry + amount_entry_egress;
    
    const entryPercentege = Number(((amount_entry_entry/entryTotal)*100).toFixed(1));
    const egressPercentege = Number(((amount_entry_egress/entryTotal)*100).toFixed(1));
    
    const getsavingsPercentage = (amount1:number,amount2:number):number => {
      const subtraction  = amount1 - amount2
      const percentage = (subtraction / amount1)*100
      if(percentage == null )return 0
      return Number(percentage.toFixed(1)) 
    }

    if(amount_entry_egress == 0){
      
      return res.status(200).json({
        savingsPercentage:getsavingsPercentage(amount_entry_entry,amount_entry_egress),
        entryPercentege:entryPercentege == null || typeof entryPercentege != 'number' ? 0:entryPercentege,
        egressPercentege:egressPercentege == null || typeof egressPercentege != 'number' ? 0:egressPercentege,
        higherSpending:{
          tag:"",
          tag_type:"",
          spending:0,
          percentege:0
        }, 
      })
    }
    
    const findEgress = await findOneEgress({
      entry_type_id:2,
      userId:user.userId,
      convertToday
    })
    
    const entryTag = await findOneEntryTag(Number(findEgress?.entry_tag_id))
    
    // const subtraction  = amount_entry_entry - amount_entry_egress
    // const percentage = (subtraction/ amount_entry_entry)*100
    
    
    res.status(200).json({
      savingsPercentage:getsavingsPercentage(amount_entry_entry,amount_entry_egress) == Number.NEGATIVE_INFINITY ? 0:getsavingsPercentage(amount_entry_entry,amount_entry_egress),
      entryPercentege:entryPercentege == null || typeof entryPercentege != 'number' ? 0:entryPercentege,
      egressPercentege,
      higherSpending:{
        tag:entryTag?.tag,
        tag_type:entryTag?.tag_type,
        spending:Number(findEgress?.amount),
        // percentege:getPercentege(amount_entry_egress,Number(findEgress?.amount))
        percentege:Number(((Number(findEgress?.amount)*100)/amount_entry_egress).toFixed(1))
      }, 
    })
  }
  catch(err :any){
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
}

export const SummaryOfTheMonthEntryController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const user = req.user as IToken
    const { entry_tag_id,entry_type_id,year } = req.params 
    
    const totalAmount = await getSumAmountEntryTypeAndEntryTag({
      where:{
        [Op.and]:[
          {
          entry_tag_id,
          entry_type_id,
          userId:user.userId,
          
          },
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year)
        ]
      }
    })
    const summary = await SummaryOfTheMonthEntry({where:{
      [Op.and]:[
        {
          entry_tag_id,
          entry_type_id,
          userId:user.userId
        },
        sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year)
      ]
    },
    totalAmount
})
    
 
    return res.send({
      year,
      total_amount:totalAmount == null ? 0 :totalAmount,
      data:summary
    })
  }  catch(err :any){
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
  
}


export const percentageOfTheMonthEntryTagAndTypeController = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  
  try {
    const user = req.user as IToken
    const { entry_tag_id,entry_type_id } = req.params 
    const year = moment().local().format('YYYY');
    const month = moment().local().format('MM');
    const totalAmount = await getSumAmountEntryTypeAndEntryTag({
      where:{
        [Op.and]:[
          {
          // entry_tag_id,
          entry_type_id,
          userId:user.userId,
          },
          sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year)
        ]
      }
    })
    
    const totalAmountByTagAndType = await getSumAmountEntryTypeAndEntryTag({
      where:{
        [Op.and]:[
          {
          entry_tag_id,
          entry_type_id,
          userId:user.userId,
          },
          sequelize.where(sequelize.fn('MONTH', sequelize.col('date')), month),
          sequelize.where(sequelize.fn('YEAR', sequelize.col('date')), year)
        ]
      }
    })
    const _percentage = Number(((totalAmountByTagAndType/totalAmount)*100).toFixed(2))
    return res.send({
      year,
      month,
      name_of_month:moment().local().format('MMMM'),
      total_amount_month:totalAmount == null ? 0 :totalAmount,
      amount_tag_and_type:totalAmountByTagAndType == null ? 0 : totalAmountByTagAndType,
      percentage:totalAmount==null || totalAmountByTagAndType==null || totalAmount == 0  || totalAmount == 0 && totalAmountByTagAndType == 0? 0 : _percentage
    })
  }  catch(err :any){
    if (err instanceof sequelize.ValidationError) next(createError(400, err))

    next(createError(404, err))
  }
  
}