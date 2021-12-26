import { Router } from 'express'
/*
    Controllers
*/
import {
  findAllLoanTypeController,
} from '../controllers/loan.type.controller'



export const router: Router = Router()

router.get('/', findAllLoanTypeController)