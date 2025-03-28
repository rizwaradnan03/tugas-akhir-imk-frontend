import AppLayout from '@/components/layouts/app-layout'
import TeacherEssayCreate from './teacher-essay-create'
import { useState } from 'react'
import { UseFetch } from '@/hooks/use-fetch'
import { UseFetchFindManyEssayByLessonId } from '@/lib/api/essay/findManyByLessonId'
import TeacherEssayTable from './teacher-essay-table'
import { ISEssay } from '@/interfaces/schema-interface'

const TeacherEssay = ({lessonId}: {lessonId: string}) => {
  const [isDoneCreatingEssay, setIsDoneCreatingEssay] = useState<boolean>(false)

  const {data: dataEssay} = UseFetch<ISEssay[]>({key: 'teacherEssay', dependencies: [lessonId], refetchDependencies: [{stateValue: isDoneCreatingEssay, stateSetter: setIsDoneCreatingEssay}], apiFunction: async () => {
    return await UseFetchFindManyEssayByLessonId({lessonId})
  }})

  console.log("hasil fetch essay ", dataEssay)

  return (
    <AppLayout title='Essay'>
        <div className='flex justify-end my-2'>
          <TeacherEssayCreate lessonId={lessonId} setIsDoneCreatingEssay={setIsDoneCreatingEssay} />
        </div>
        <div>
        <TeacherEssayTable dataEssay={dataEssay || []} />
      </div>
    </AppLayout>
  )
}

export default TeacherEssay