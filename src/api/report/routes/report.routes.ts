import { Router } from 'express'
import { fifthReportController, sixthReportController, useFrecuencyReportController, useRegularFrecuencyReportController } from '../../metrics/controllers/metrics.controller';
import { report1 } from '../controllers/report.controller';

export const router: Router = Router()

router.get('/report1/:start_date/:finish_date', report1)
// router.get('/frecuency/:start_date/:finish_date/:actionId',useFrecuencyReportController)


// Herramienta de gestion de presupuesto  - actionId - 3
// Herramienta de comparador y simulador  de ahorro y credito - actionId - 4 

router.get('/secondreport/:start_date/:finish_date',useRegularFrecuencyReportController)
router.get('/thirdreport/fourthreport/:start_date/:finish_date/:actionId',useFrecuencyReportController)

//quinto reporte de tips
router.get('/fifthreport/tip/:start_date/:finish_date',fifthReportController)

// sexto reporte de videos
router.get('/sixthreport/video/:start_date/:finish_date',sixthReportController)

// router.get('/sharetips/:start_date/:finish_date',useFrecuencyReportController)

