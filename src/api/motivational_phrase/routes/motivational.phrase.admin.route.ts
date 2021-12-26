import { Router } from 'express'
import { addMotivationalPhraseAdminController, deleteMotivationalPhraseController, findMotivationalPhraseByIdController, listMotivationalPhraseAdminController, updateMotivationalPhraseController } from '../controllers/motivational.phrase.controller'
import { createMotivationalPhraseValidator, deleteMotivationalPhraseValidator, findOneMotivationalPhraseValidator, updateMotivationalPhraseValidator } from '../middlewares/motivational.phrase.middleware'

export const router: Router = Router()
router.get('/',listMotivationalPhraseAdminController)
router.get('/:id',findOneMotivationalPhraseValidator,findMotivationalPhraseByIdController)
router.put('/:id',updateMotivationalPhraseValidator,updateMotivationalPhraseController)
router.post('/',createMotivationalPhraseValidator,addMotivationalPhraseAdminController)
router.delete('/:id',deleteMotivationalPhraseValidator,deleteMotivationalPhraseController)
