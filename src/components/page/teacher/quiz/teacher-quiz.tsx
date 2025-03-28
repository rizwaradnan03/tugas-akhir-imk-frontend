import AppLayout from '@/components/layouts/app-layout'
import { UseFetch } from '@/hooks/use-fetch'
import { ISQuiz } from '@/interfaces/schema-interface'
import { UseFetchFindManyQuizByLessonId } from '@/lib/api/quiz/findManyByLessonId'
import TeacherQuizTable from './teacher-quiz-table'
import TeacherQuizCreate from './teacher-quiz-create'
import { useState } from 'react'

const TeacherQuiz = ({ lessonId }: { lessonId: string }) => {
  const [isDoneCreatingQuiz, setIsDoneCreatingQuiz] = useState<boolean>(false)

  const { data: dataQuiz } = UseFetch<ISQuiz[]>({
    key: 'teacherQuiz', dependencies: [lessonId], refetchDependencies: [{ stateValue: isDoneCreatingQuiz, stateSetter: setIsDoneCreatingQuiz }], apiFunction: async () => {
      return UseFetchFindManyQuizByLessonId({ lessonId })
    }
  })

  return (
    <AppLayout title='Quiz Murid'>
      <div className="flex justify-end my-2">
        <TeacherQuizCreate lessonId={lessonId} setIsDoneCreatingQuiz={setIsDoneCreatingQuiz} />
      </div>
      <div>
        <TeacherQuizTable dataQuiz={dataQuiz || []} />
      </div>
    </AppLayout>
  )
}

export default TeacherQuiz