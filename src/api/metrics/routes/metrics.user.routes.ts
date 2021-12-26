import { Router } from 'express'
import { createMetricsController, updateUseTimeMetricsController } from '../controllers/metrics.controller'
import { updateUseTimeMetricsValidator } from '../middlewares/metrics.validator'
/*
    Controllers
*/


export const router: Router = Router()

router.post('/',createMetricsController)
router.put('/',updateUseTimeMetricsValidator,updateUseTimeMetricsController)
