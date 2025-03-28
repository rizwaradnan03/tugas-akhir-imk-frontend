import { ISQuiz } from '@/interfaces/schema-interface'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import TeacherQuizForm from './teacher-quiz-form'
import TeacherQuizDetail from './teacher-quiz-detail'

const TeacherQuizTable = ({ dataQuiz }: { dataQuiz: ISQuiz[] }) => {
    return (
        <div>
            <Table>
                <TableCaption>Daftar Quiz</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Penugasan</TableHead>
                        <TableHead>Detail</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataQuiz && dataQuiz.map((quiz, index) => (
                        <TableRow key={index}>
                            <TableCell>{++index}</TableCell>
                            <TableCell>{quiz.title}</TableCell>
                            <TableCell className={`${quiz.isActive ? "text-green-600" : "text-red-600"} font-bold`}>{quiz.isActive ? "Aktif" : "Tidak Aktif"}</TableCell>
                            <TableCell>
                                <TeacherQuizForm quizId={quiz.id} />
                            </TableCell>
                            <TableCell>
                                <TeacherQuizDetail quizId={quiz.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeacherQuizTable