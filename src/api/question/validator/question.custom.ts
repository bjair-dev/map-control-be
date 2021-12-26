import { findOneQuestion } from '../services/find/question'
export const existsQuestion = async (questionId: any) => {
  const question = await findOneQuestion({ id: questionId })
  if (!question) throw new Error('¡No existe la pregunta!')
}
