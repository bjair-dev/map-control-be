import { QuestionTypeStatic } from '../../api/question_type/models/question.model.model'
import { QuestionStatic } from '../../api/question/models/question.model'
import { QuestionCategoryStatic } from '../../api/question/models/question.category.models'

//*@DESC Question type has many question
export const questionTypeHasManyQuestion = ({
  questionType,
  question,
}: {
  questionType: QuestionTypeStatic
  question: QuestionStatic
}): void => {
  questionType.hasMany(question, {
    foreignKey: { allowNull: false, name: 'question_type_id' },
    sourceKey: 'id',
  })
  question.belongsTo(questionType, {
    foreignKey: { allowNull: false, name: 'question_type_id' },
    targetKey: 'id',
  })
}
export const questionCategoryHasManyQuestion = ({
  questionCategory,
  question,
}: {
  questionCategory: QuestionCategoryStatic
  question: QuestionStatic
}): void => {
  questionCategory.hasMany(question, {
    foreignKey: { allowNull: true, name: 'question_category_id' },
    sourceKey: 'id',
  })
  question.belongsTo(questionCategory, {
    foreignKey: { allowNull: true, name: 'question_category_id' },
    targetKey: 'id',
  })
}

// export const questionHasManyEntry = ({
//   question,
//   entry,
// }: {
//   question: QuestionStatic
//   entry: EntryStatic
// }): void => {
//   question.hasMany(entry, {
//     foreignKey: 'questionId',
//     sourceKey: 'id',
//   })
//   entry.belongsTo(question, {
//     foreignKey: 'questionId',
//     targetKey: 'id',
//   })
// }
// export const questionBelongsToManyEntry = ({
//   question,
//   sessionPackage,
//   questionSessionPackage,
// }: {
//   question: QuestionStatic
//   sessionPackage: SessionPackageStatic
//   questionSessionPackage: QuestionSessionPackageStatic
// }): void => {
//   question.belongsToMany(sessionPackage, { through: questionSessionPackage })
//   sessionPackage.belongsToMany(question, { through: questionSessionPackage })
// }
