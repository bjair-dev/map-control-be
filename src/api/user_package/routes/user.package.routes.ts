import { Router } from 'express'
import { findTipCategoryValidator } from '../../tip/middlewares/tip.category.validator'
// import {  findAllUsersController } from '../controllers/user.controller'

import { getContentForUserController, getHistoryOfTipsController, getHistoryOfVideosController, updateContentForUserController, updateIndexUserPackageController } from '../controllers/user.package.controller'
import { updateIndexValidator, updateStatusValidator } from '../middlewares/user.package.middleware'
export const router: Router = Router()
router.get('/', getContentForUserController)

router.put('/status/:id',updateStatusValidator,updateContentForUserController)
router.put('/index/:id/:current_index',updateIndexValidator,updateIndexUserPackageController)
// router.post('/activate', ActiveAccountUserValidator, ActiveAccountUserController)

router.get('/history/tips/:tip_category_id',findTipCategoryValidator,getHistoryOfTipsController)
router.get('/history/videos',getHistoryOfVideosController)