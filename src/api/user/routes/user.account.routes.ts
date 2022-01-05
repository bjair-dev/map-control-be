import { Router } from 'express'
import { findProfileUserController, udpateDaySessionUserController, updateGenderAndDateOfBirthController, updatePasswordUserController, updateTermsAndConditionsController } from '../controllers/user.controller'
import { updateGenderAndDateOfBirthUserValidator, updatePasswordUserValidator } from '../middlewares/user.validator'
export const router: Router = Router()
router.get('/', findProfileUserController)
router.put('/daysession',udpateDaySessionUserController)
router.put('/updatepassword',updatePasswordUserValidator,updatePasswordUserController)
router.put('/gender/dateofbirth',updateGenderAndDateOfBirthUserValidator,updateGenderAndDateOfBirthController)
router.put('/terms/conditions',updateTermsAndConditionsController)


// router.post('/activate', ActiveAccountUserValidator, ActiveAccountUserController)

