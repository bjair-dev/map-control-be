import { Router } from 'express'
import { findAllContentTypeController } from '../controllers/package.content.type.controller'
export const router: Router = Router()

router.get('/', findAllContentTypeController)
