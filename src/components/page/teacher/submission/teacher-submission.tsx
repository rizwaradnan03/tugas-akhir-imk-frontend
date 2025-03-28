import { UseFetch } from "@/hooks/use-fetch"
import AppLayout from "../../../layouts/app-layout"
import { ISSubmission } from "@/interfaces/schema-interface"
import { useState } from "react"
import { UseFetchFindManySubmissionByLessonId } from "@/lib/api/submission/findManyByLessonId"
import TeacherSubmissionCreate from "./teacher-submission-create"
import TeacherSubmissionTable from "./teacher-submission-table"

const TeacherSubmission = ({ lessonId }: { lessonId: string }) => {

    const [isDoneCreatingSubmission, setIsDoneCreatingSubmission] = useState<boolean>(false)

    const { data: dataSubmission } = UseFetch<ISSubmission[]>({
        key: "teacherSubmission", dependencies: [lessonId], refetchDependencies: [{ stateValue: isDoneCreatingSubmission, stateSetter: setIsDoneCreatingSubmission }], apiFunction: async () => {
            return UseFetchFindManySubmissionByLessonId({ lessonId: lessonId })
        }
    })

    return (
        <AppLayout title="Tugas Murid">
            <div className="flex justify-end my-2">
                <TeacherSubmissionCreate lessonId={lessonId} setIsDoneCreatingSubmission={setIsDoneCreatingSubmission} />
            </div>
            <div>
                <TeacherSubmissionTable dataSubmission={dataSubmission || []} />
            </div>
        </AppLayout>
    )
}

export default TeacherSubmission