import { Router } from 'express'
import {  recordsAndTopsController, usabilityController, useFrecuencyReportController } from '../controllers/metrics.controller'
/*
    Controllers
*/


export const router: Router = Router()

router.get('/usability/:start_date/:finish_date',usabilityController)
router.get('/records/tops/:start_date',recordsAndTopsController)
// router.get('/dashboard/report/statistics/:start_date/:finish_date/:actionId',useFrecuencyReportController)