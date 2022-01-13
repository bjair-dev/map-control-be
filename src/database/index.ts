import { Sequelize } from 'sequelize'
import config from '../config/environments'
import { UserFactory, UserStatic } from '../api/user/models/user.model'
import { TokenStatic, TokenFactory } from '../api/token/models/token.model'
import { EntryStatic, EntryFactory } from '../api/entry/models/entry.model'
import { EntryTypeFactory, EntryTypeStatic } from '../api/entry_type/models/entry.type.model'

import { QuestionStatic, QuestionFactory } from '../api/question/models/question.model'

import { BankAccountStatic, BankAccountFactory } from '../api/bank_account/models/back.account.model'
import { AdminFactory, AdminStatic } from '../api/admin/models/admin.model'
import { QuestionTypeStatic, QuestionTypeFactory } from '../api/question_type/models/question.model.model'
import { entryTagHasManyEntry, entryTypeHasManyEntry } from './associations/entry'
import {
  userHasManyAnswer,
  // userbelongsToMany,
  userHasManyBankAccount,
  userHasManyEntry,
  userHasManyChallenge,
  //  , userHasManyEntryType
} from './associations/user'
import { questionCategoryHasManyQuestion, questionTypeHasManyQuestion } from './associations/question'
import { adminHasManyAdminRoles } from './associations/admin'

import { AdminRolesStatic, AdminRolesFactory } from '../api/admin/models/admin.roles'

import { GlobalFactory, GlobalStatic } from '../api/global/models/global.model'
import { TipStatic, TipFactory } from '../api/tip/models/tip.model'
import { PackageStatic, PackageFactory } from '../api/package/models/package.model'
import { PackageTypeFactory, PackageTypeStatic } from '../api/package/models/package.type.model'
import {
  packageTypeHasManyPackageHeader,
  challengeHasManyPackage,
  questionHasManyPackage,
  TipHasManyPackage,
  VideoHasManyPackage,
} from './associations/package'
import { VideoStatic, VideoFactory } from '../api/videos/models/video.model'
import { ChallengeStatic, ChallengeFactory } from '../api/challenge/models/challenge.model'
import {
  QuestionCategoryStatic,
  QuestionCategoryFactory,
} from '../api/question/models/question.category.models'
import { TipCategoryFactory, TipCategoryStatic } from '../api/tip/models/tip.category.model'
import { VideoCategoryStatic, VideoCategoryFactory } from '../api/videos/models/video.category.model'
import { tipCategoryHasManyTip } from './associations/tip'
import {
  PackageContentTypeStatic,
  PackageContentTypeFactory,
} from '../api/package/models/package.content.type.model'
import { PackageHeaderFactory, PackageHeaderStatic } from '../api/package/models/package_header.model'
import { contentTypeHasManyPackageHeader, packageHeaderHasManyPackage } from './associations/package'
import { videoCategoryHasManyVideo } from './associations/video'
import { SurveyStatic, SurveyFactory } from '../api/survey/models/survay.model'
import { surveyTypeHasManySurvey, surveyHasManySurveyContent } from './associations/survay'
import { SurveyTypeFactory, SurveyTypeStatic } from '../api/survey/models/survey.type.mode'
import { SurveyContentFactory, SurveyContentStatic } from '../api/survey/models/survey.content.model'
import { BankStatic, BankFactory } from '../api/bank/models/bank.model'
import { LoanStatic, LoanFactory } from '../api/loan/models/loan.model'
import { LoanTypeStatic, LoanTypeFactory } from '../api/loan/models/loan.type.model'
import { LoanLinkStatic, LoanLinkFactory } from '../api/loan/models/loan.link.model'
import { LoanLinkContentStatic, LoanLinkContentFactory } from '../api/loan/models/loan.link.content.model'
import { TeaUsdStatic, TeaUsdFactory } from '../api/tea/models/tea.usd.model'
import { TeaPenStatic, TeaPenFactory } from '../api/tea/models/tea.pen.model'
import { NotificationStatic, NotificationFactory } from '../api/notification/models/notification.model'
import {
  NotificationDateFactory,
  NotificationDateStatic,
} from '../api/notification/models/notification.date.model'

import {
  TermsAndConditionsStatic,
  TermsAndConditionsFactory,
} from '../api/terms_and_conditions/models/termsconditions.model'
import {
  bankHasManyLoan,
  loanTypeHasManyLoan,
  LoanHasManyTeaPen,
  LoanHasManyTeaUsd,
  LoanHasManyLoanLinkContent,
  loanLinkContentHasManyLoanLink,
} from './associations/loan'
import { UserPackageFactory, UserPackageStatic } from '../api/user_package/models/user.package.model'
import { EntryTagFactory, EntryTagStatic } from '../api/entry_tag/models/entry.tag.model'
import {
  MotivationalPhraseFactory,
  MotivationalPhraseStatic,
} from '../api/motivational_phrase/models/motivational.phrase'
import { AnswerFactory, AnswerStatic } from '../api/answer/models/answer.model'
import {
  UserNotificationFactory,
  UserNotificationStatic,
} from '../api/user_notification/models/user.notification.model'

import {
  TemporaryUserPackageFactory,
  TemporaryUserPackageStatic,
} from '../api/user_package/models/temporary.user.package.model'
import {
  TemporaryUserSessionFactory,
  TemporaryUserSessionStatic,
} from '../api/user_package/models/temporary.user.session.model'

import { UserChalengeFactory, UserChallengeStatic } from '../api/user_challenge/models/user.challenge.model'
import { AnswerSurveyFactory, AnswerSurveyStatic } from '../api/answer_survey/models/answer.survey.model'
import { MetricsFactory, MetricsStatic } from '../api/metrics/models/metrics.model'
import { ActionFactory, ActionStatic } from '../api/action/models/action.model'
import { answerSurveyHasManyUser } from './associations/answer.survey'
import { notificationHasManyUserNotification } from './associations/notification'
import { ColorTypeFactory, ColorTypeStatic } from '../api/color_map/models/color_map.model.model'
import { DepartamentoTypeFactory, DepartamentoTypeStatic } from '../api/ubicacion/models/departamento.model'
import { ProvinciaTypeFactory, ProvinciaStatic } from '../api/ubicacion/models/provincia.model'
import { DistritoTypeFactory, DistritoStatic } from '../api/ubicacion/models/distrito.model'
import { NoticiaTypeFactory, NoticiaStatic } from '../api/noticia/models/noticia.model'

import { provinciaHasManyDepartamento } from './associations/provincia'
import { DistritoHasManyProvincia } from './associations/distrito'
import {
  noticiaHasManyDepartamento,
  noticiaHasManyDistrito,
  noticiaHasManyProvincia,
} from './associations/noticia'

export class DataBase {
  private static _instance: DataBase
  public sequelize: Sequelize
  private _config = config
  public user: UserStatic
  public admin: AdminStatic
  public token: TokenStatic
  public entry: EntryStatic
  public colorMap: ColorTypeStatic
  public departamento: DepartamentoTypeStatic
  public provincia: ProvinciaStatic
  public distrito: DistritoStatic
  public noticia: NoticiaStatic

  public entryType: EntryTypeStatic
  public question: QuestionStatic
  public bankAccount: BankAccountStatic
  public questionType: QuestionTypeStatic
  public adminRoles: AdminRolesStatic
  public global: GlobalStatic
  public tip: TipStatic
  public package: PackageStatic
  public packageType: PackageTypeStatic
  public video: VideoStatic
  public packageContentType: PackageContentTypeStatic
  public packageHeader: PackageHeaderStatic
  public challenge: ChallengeStatic
  public questionCategory: QuestionCategoryStatic
  public tipCategory: TipCategoryStatic
  public videoCategory: VideoCategoryStatic
  public survey: SurveyStatic
  public surveyType: SurveyTypeStatic
  public surveyContent: SurveyContentStatic
  public bank: BankStatic
  public loan: LoanStatic
  public loanType: LoanTypeStatic
  public loanLink: LoanLinkStatic
  public loanLinkContent: LoanLinkContentStatic
  public teaUsd: TeaUsdStatic
  public teaPen: TeaPenStatic
  public notification: NotificationStatic
  public notificationDate: NotificationDateStatic
  public termsAndConditions: TermsAndConditionsStatic
  public userPackage: UserPackageStatic
  public entryTag: EntryTagStatic
  public motivationalPhrase: MotivationalPhraseStatic
  public answer: AnswerStatic
  public userNotification: UserNotificationStatic
  public temporaryUserPackage: TemporaryUserPackageStatic
  public temporaryUserSession: TemporaryUserSessionStatic

  public userChallenge: UserChallengeStatic
  public answerSurvey: AnswerSurveyStatic
  public metrics: MetricsStatic
  public action: ActionStatic

  constructor() {
    this.sequelize = new Sequelize(
      this._config.PROY_BD!,
      this._config.PROY_BD_USER!,
      this._config.PROY_BD_PASS,
      {
        host: this._config.PROY_BD_HOST,
        port: Number(this._config.PROY_BD_PORT),
        logging: false,
        dialect: 'mysql',
        pool: {
          max: 5,
          min: 0,
          idle: 10000,
        },
      }
    )
    this.user = UserFactory(this.sequelize)
    this.token = TokenFactory(this.sequelize)
    this.entry = EntryFactory(this.sequelize)
    this.entryType = EntryTypeFactory(this.sequelize)
    this.question = QuestionFactory(this.sequelize)
    this.colorMap = ColorTypeFactory(this.sequelize)
    this.departamento = DepartamentoTypeFactory(this.sequelize)
    this.provincia = ProvinciaTypeFactory(this.sequelize)
    this.distrito = DistritoTypeFactory(this.sequelize)
    this.noticia = NoticiaTypeFactory(this.sequelize)
    this.bankAccount = BankAccountFactory(this.sequelize)
    this.admin = AdminFactory(this.sequelize)
    this.questionType = QuestionTypeFactory(this.sequelize)
    this.adminRoles = AdminRolesFactory(this.sequelize)
    this.global = GlobalFactory(this.sequelize)
    this.tip = TipFactory(this.sequelize)
    this.package = PackageFactory(this.sequelize)
    this.packageType = PackageTypeFactory(this.sequelize)
    this.video = VideoFactory(this.sequelize)
    this.packageContentType = PackageContentTypeFactory(this.sequelize)
    this.packageHeader = PackageHeaderFactory(this.sequelize)
    this.challenge = ChallengeFactory(this.sequelize)
    this.questionCategory = QuestionCategoryFactory(this.sequelize)
    this.tipCategory = TipCategoryFactory(this.sequelize)
    this.videoCategory = VideoCategoryFactory(this.sequelize)
    this.survey = SurveyFactory(this.sequelize)
    this.surveyType = SurveyTypeFactory(this.sequelize)
    this.surveyContent = SurveyContentFactory(this.sequelize)
    this.bank = BankFactory(this.sequelize)
    this.loan = LoanFactory(this.sequelize)
    this.loanType = LoanTypeFactory(this.sequelize)
    this.loanLink = LoanLinkFactory(this.sequelize)
    this.loanLinkContent = LoanLinkContentFactory(this.sequelize)
    this.teaUsd = TeaUsdFactory(this.sequelize)
    this.teaPen = TeaPenFactory(this.sequelize)
    this.notification = NotificationFactory(this.sequelize)
    this.notificationDate = NotificationDateFactory(this.sequelize)
    this.termsAndConditions = TermsAndConditionsFactory(this.sequelize)
    this.userPackage = UserPackageFactory(this.sequelize)
    this.entryTag = EntryTagFactory(this.sequelize)
    this.motivationalPhrase = MotivationalPhraseFactory(this.sequelize)
    this.answer = AnswerFactory(this.sequelize)
    this.userNotification = UserNotificationFactory(this.sequelize)
    this.temporaryUserPackage = TemporaryUserPackageFactory(this.sequelize)
    this.temporaryUserSession = TemporaryUserSessionFactory(this.sequelize)
    this.userChallenge = UserChalengeFactory(this.sequelize)
    this.answerSurvey = AnswerSurveyFactory(this.sequelize)
    this.metrics = MetricsFactory(this.sequelize)
    this.action = ActionFactory(this.sequelize)

    this.associations()
    this.connectDb()
  }
  public static get instance(): DataBase {
    return this._instance || (this._instance = new this())
  }
  private connectDb(): void {
    this.sequelize
      .authenticate()
      // .sync({ alter: true, logging: console.log })
      .then(() => {
        // this.bank.sync({ alter: true, logging: console.log })
        console.log('¡Run database!')
      })
      .catch((err) => console.log(err))
  }
  private associations(): void {
    entryTypeHasManyEntry({
      entry: this.entry,
      entry_type: this.entryType,
    })
    userHasManyEntry({
      entry: this.entry,
      user: this.user,
    })

    userHasManyBankAccount({
      user: this.user,
      back_account: this.bankAccount,
    })
    questionTypeHasManyQuestion({
      question: this.question,
      questionType: this.questionType,
    })
    // userHasManyEntryType({
    //   entry_type: this.entryType,
    //   user: this.user,
    // })
    adminHasManyAdminRoles({
      admin: this.admin,
      adminRoles: this.adminRoles,
    })
    questionHasManyPackage({
      _package: this.package,
      question: this.question,
    })
    TipHasManyPackage({
      _package: this.package,
      tip: this.tip,
    })
    VideoHasManyPackage({
      _package: this.package,
      video: this.video,
    })
    packageTypeHasManyPackageHeader({
      package_type: this.packageType,
      packageheader: this.packageHeader,
    })
    provinciaHasManyDepartamento({
      departamento: this.departamento,
      provincia: this.provincia,
    })
    DistritoHasManyProvincia({
      provincia: this.provincia,
      distrito: this.distrito,
    })

    noticiaHasManyDepartamento({
      departamento: this.departamento,
      noticia: this.noticia,
    })

    noticiaHasManyProvincia({
      provincia: this.provincia,
      noticia: this.noticia,
    })

    noticiaHasManyDistrito({
      distrito: this.distrito,
      noticia: this.noticia,
    })

    contentTypeHasManyPackageHeader({
      contentType: this.packageContentType,
      _package: this.package,
    })
    packageHeaderHasManyPackage({
      _package: this.package,
      packageheader: this.packageHeader,
    })
    challengeHasManyPackage({
      _package: this.package,
      challenge: this.challenge,
    })

    tipCategoryHasManyTip({
      tip: this.tip,
      tipCategory: this.tipCategory,
    })
    videoCategoryHasManyVideo({
      video: this.video,
      videoCategory: this.videoCategory,
    })
    questionCategoryHasManyQuestion({
      question: this.question,
      questionCategory: this.questionCategory,
    })
    surveyTypeHasManySurvey({
      survey: this.survey,
      surveyType: this.surveyType,
    })
    surveyHasManySurveyContent({
      survey: this.survey,
      surveyContent: this.surveyContent,
    })
    loanTypeHasManyLoan({
      loan: this.loan,
      loan_type: this.loanType,
    })
    bankHasManyLoan({
      bank: this.bank,
      loan: this.loan,
    })
    LoanHasManyTeaPen({
      loan: this.loan,
      tea_pen: this.teaPen,
    })
    LoanHasManyTeaUsd({
      loan: this.loan,
      tea_usd: this.teaUsd,
    })
    LoanHasManyLoanLinkContent({
      loan: this.loan,
      loanLinkContent: this.loanLinkContent,
    })
    loanLinkContentHasManyLoanLink({
      loanLink: this.loanLink,
      loanLinkContent: this.loanLinkContent,
    })
    entryTagHasManyEntry({
      entry: this.entry,
      entry_tag: this.entryTag,
    })
    // userbelongsToMany({
    //   _package:this.package,
    //   user:this.user
    // })

    userHasManyAnswer({
      answer: this.answer,
      user: this.user,
    })
    userHasManyChallenge({
      user: this.user,
      user_challenge: this.userChallenge,
    })
    answerSurveyHasManyUser({
      answerSurvey: this.answerSurvey,
      user: this.user,
    })
    notificationHasManyUserNotification({
      notification: this.notification,
      userNotification: this.userNotification,
    })
  }
}
