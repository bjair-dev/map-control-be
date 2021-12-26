import { Router } from 'express'
import { createEntryController, deleteEntryController, ListEntryController, ListOneEntryController, percentageOfTheMonthEntryTagAndTypeController, SummaryOfTheDayEntryController, SummaryOfTheMonthEntryController, updateEntryController } from '../controllers/entry.controller'
import { createEntryValidator, deleteEntryValidator, findOneEntryValidator, ListAllEntryValidator, percentageOfTheMonthEntryTagAndTypeValidator, SummaryOfTheMonthEntryValidator, updateEntryValidator } from '../middlewares/entry.validator'

export const router: Router = Router()
router.post('/', createEntryValidator, createEntryController)

//entry_tag_id(Number) => etiqueta | sueldo | compras de artefactos | supermercado | deuda | etc
// entry_type_id(Number) => importe | egreso
router.get('/all/:entry_tag_id/:entry_type_id',ListAllEntryValidator, ListEntryController)
router.get('/:id',findOneEntryValidator,ListOneEntryController)
router.delete('/:id',deleteEntryValidator,deleteEntryController)
router.put('/:id',updateEntryValidator,updateEntryController)


router.get('/sumary/day',SummaryOfTheDayEntryController)


// entry_tag_id,entry_type_id 
router.get('/sumary/month/:entry_tag_id/:entry_type_id/:year',SummaryOfTheMonthEntryValidator,SummaryOfTheMonthEntryController)
router.get('/percentage/month/:entry_tag_id/:entry_type_id',percentageOfTheMonthEntryTagAndTypeValidator,percentageOfTheMonthEntryTagAndTypeController)