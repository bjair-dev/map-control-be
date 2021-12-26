import express, { Application, Response, Request, NextFunction } from 'express'
import { router as routerAuth } from './auth/routes/auth.routes'
import { router as routerEntryType } from './entry_type/routes/entry.type.routes'
import { router as routerEntry } from './entry/routes/entry.routes'
import { router as routerQuestion } from './question/routes/question.routes'
import { router as routerQuestionType } from './question_type/routes/question.type.routes'
import { router as routerAdminRoles } from './admin/routes/admin.roles.routes'
import { router as routerAdmin } from './admin/routes/admin.routes'
import { router as routerTip } from './tip/routers/tip.routes'
import { router as routerPackage } from './package/routes/package.routes'
import { router as routerVideo } from './videos/routes/video.routes'
import { router as routerVideoCategory } from './videos/routes/video.category.routes'
import { router as routerPackageHeader } from './package/routes/package.header.routes'
import { router as routerPackageType } from './package/routes/package.type.routes'
import { router as routerPackageContentType } from './package/routes/package.content.type.routes'
import { router as routerChallenge } from './challenge/routes/challenge.routes'
import { router as routerQuestionCategory } from './question/routes/question.category.routes'
import { router as routerTipCategory } from './tip/routers/tip.category.routes'
import { router as routerUserIntranet } from './user/routes/user.intranet.routes'
import { router as routerUserAccount } from './user/routes/user.account.routes'

import { router as routerUserQuestion } from './question/routes/question.user.routes'
import { router as routerUserSurvey } from './survey/routes/survey.user.routes'

import { router as routerUserChallenge } from './user_challenge/routes/user.challenge.routes'

import { router as routerSurvey } from './survey/routes/survey.routes'
import { router as routerBank } from './bank/routes/bank.routes'
import { router as loanType } from './loan/routes/loan.type.routes'
import { router as routerLoanTypeForUser } from './loan/routes/loan.type.routes'

import { router as loan } from './loan/routes/loan.routes'
import { router as notification } from './notification/routes/notification.routes'
import { router as routerLoanLink } from './loan/routes/loan.link.routes'
import { router as termsConditions } from './terms_and_conditions/routes/termsconditions.routes'
import { router as userPackage } from './user_package/routes/user.package.routes'
// import { router as userPackageAdmin } from './user_package/routes/user.package.admin.routes'
import { router as routerEntryTagAdmin } from './entry_tag/routes/entry.tag.admin.routes'
import { router as routerEntryTag } from './entry_tag/routes/entry.tag.routes'
import { router as routerEntryTypeAdmin } from './entry_type/routes/entry.type.admin.routes'

import { router as routerLoanBank } from './loan/routes/loan.bank.routes'
import { router as routerMotivationalPhraseAdmin } from './motivational_phrase/routes/motivational.phrase.admin.route'
import { router as routerMotivationalPhrase } from './motivational_phrase/routes/motivational.phrase.route'
import { router as routerNotificationPending } from './notification/routes/notification.user.router'

import { router as routerTipCategoryUser } from './tip/routers/tip.category.user.routes'

import { router as userRouterLoanLink } from './loan/routes/user.loan.link.routes'

import { router as routerAnswer } from './answer/routes/answer.routes'
import { router as routerUserDevice } from './user/routes/user.device.routes'
import { router as routerAnswerSurvey } from './answer_survey/routes/answer.survey.routes'
// import { router as routerUserMetrics } from './metrics/routes/'
import { router as routerUserMetrics } from './metrics/routes/metrics.user.routes'
import { router as routerUserMetricsAdmin } from './metrics/routes/metrics.routes'
import { router as routerReport } from './report/routes/report.routes'

import passportMiddleware from '../api/auth/passport/passport'
import passport from 'passport'
import morgan from 'morgan'
import cors from 'cors'
import { Router } from 'express'
import { deniedAccessUser, deniedAccessAdmin } from '../shared/express.validator'
import { renderImage } from '../helpers/render.image.routes'

export default class Server {
  private _app: Application
  private _port: number
  private _router: Router
  constructor(port: number) {
    this._app = express()
    this._router = Router()
    this._port = port
    this.middlewares()
    this.routes()
    this.errors()
  }

  static init(port: number): Server {
    return new Server(port)
  }
  middlewares(): void {
    this._app.use(cors({ credentials: true }))
    this._app.use(morgan('dev'))
    this._app.use(express.json({ limit: '50mb' }))
    this._app.use(
      express.urlencoded({
        limit: '50mb',
        extended: true,
        parameterLimit: 50000,
      })
    )

    this._router.use(passport.initialize())
    passport.use(passportMiddleware)
  }
  routes(): void {
    this._app.use('/api', this._router)

    //*@AUTH
    this._router.use('/', routerAuth)

    //*@USE GLOBAL
    this._router.get('/render-image/:image', renderImage)
    this._router.use('/terms-conditions', termsConditions)
    // this._router.use('/report', routerReport)
    //*@AUTHENTICATE
    this._router.use(passport.authenticate('jwt', { session: false }))

    //*@USE USER
    this._router.use('/entry-type', deniedAccessAdmin, routerEntryType)
    this._router.use('/entry', deniedAccessAdmin, routerEntry)
    this._router.use('/user-account', deniedAccessAdmin, routerUserAccount)
    this._router.use('/user-content', deniedAccessAdmin, userPackage)
    this._router.use('/entry-tag', deniedAccessAdmin, routerEntryTag)
    this._router.use('/loan-bank', deniedAccessAdmin, routerLoanBank)
    this._router.use('/loan-type-user', deniedAccessAdmin, routerLoanTypeForUser)
    this._router.use('/motivational-phrase', deniedAccessAdmin, routerMotivationalPhrase)
    this._router.use('/notification-pending', deniedAccessAdmin, routerNotificationPending)
    this._router.use('/tips-categories-user', deniedAccessAdmin, routerTipCategoryUser)
    this._router.use('/answer', deniedAccessAdmin, routerAnswer)

    this._router.use('/user-question', deniedAccessAdmin, routerUserQuestion)
    this._router.use('/user-survey', deniedAccessAdmin, routerUserSurvey)
    this._router.use('/user-challenge', deniedAccessAdmin, routerUserChallenge)
    this._router.use('/updateIdDeviceUser', deniedAccessAdmin, routerUserDevice)
    this._router.use('/answer-survey', deniedAccessAdmin, routerAnswerSurvey)
    this._router.use('/user-metrics', deniedAccessAdmin, routerUserMetrics)
    this._router.use('/user-loan-link', deniedAccessAdmin, userRouterLoanLink)

    //*@USE ADMIN
    this._router.use('/report', deniedAccessUser,routerReport)
    
    this._router.use('/question', deniedAccessUser, routerQuestion)
    this._router.use('/question-type', deniedAccessUser, routerQuestionType)
    this._router.use('/roles', deniedAccessUser, routerAdminRoles)
    this._router.use('/admins', deniedAccessUser, routerAdmin)
    this._router.use('/tips', deniedAccessUser, routerTip)
    this._router.use('/packages', deniedAccessUser, routerPackage)
    this._router.use('/packages-headers', deniedAccessUser, routerPackageHeader)
    this._router.use('/packages-types', deniedAccessUser, routerPackageType)
    this._router.use('/videos', deniedAccessUser, routerVideo)
    this._router.use('/packages-contents-types', deniedAccessUser, routerPackageContentType)
    this._router.use('/challenges', deniedAccessUser, routerChallenge)
    this._router.use('/questions-categories', deniedAccessUser, routerQuestionCategory)
    this._router.use('/tips-categories', deniedAccessUser, routerTipCategory)
    this._router.use('/videos-categories', deniedAccessUser, routerVideoCategory)
    this._router.use('/users-intranet', deniedAccessUser, routerUserIntranet)

    this._router.use('/surveys', deniedAccessUser, routerSurvey)
    this._router.use('/bank', deniedAccessUser, routerBank)
    this._router.use('/loan-type', deniedAccessUser, loanType)
    this._router.use('/loan', deniedAccessUser, loan)
    this._router.use('/loan-link', deniedAccessUser, routerLoanLink)
    this._router.use('/notification', deniedAccessUser, notification)
    this._router.use('/entry-tag-admin', deniedAccessUser, routerEntryTagAdmin)
    this._router.use('/entry-type-admin', deniedAccessUser, routerEntryTypeAdmin)
    this._router.use('/motivational-phrase-admin', deniedAccessUser, routerMotivationalPhraseAdmin)
    this._router.use('/metrics', deniedAccessUser, routerUserMetricsAdmin)

    // this._router.use('/user-package', deniedAccessUser, userPackageAdmin)

    // this._router.use('/terms-conditions', deniedAccessUser, termsConditions)
  }

  errors(): void {
    this._router.use((req: Request, res: Response, next) => {
      const err = new Error(`Not Fount - ${req.originalUrl}`)
      res.status(404)
      next(err)
    })
    this._router.use((err: any, req: Request, res: Response, next: NextFunction) => {
      console.log(err.stack)
      res.status(err.status || 500).json({
        status: err.status,
        message: err.message,
        stack: err.stack,
      })
    })
  }

  start(callback: () => void): void {
    this._app.listen(this._port, callback)
  }
}
