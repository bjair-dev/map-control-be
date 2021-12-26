import { Router } from 'express'
import { findAllPackageTypeController } from '../controllers/package.type.controller'
export const router: Router = Router()

router.get('/', findAllPackageTypeController)
