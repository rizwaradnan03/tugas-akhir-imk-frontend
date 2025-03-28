import AppLayout from '@/components/layouts/app-layout'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UseFetch } from '@/hooks/use-fetch'
import { ISQuizStudentSign } from '@/interfaces/schema-interface'
import { UseFetchFindManyQuizStudentSignByQuizId } from '@/lib/api/quiz-student-sign/findManyByQuizId'
import { useState } from 'react'

const TeacherQuizDetail = ({ quizId }: { quizId: string }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    const { data: dataQuizStudentSign } = UseFetch<ISQuizStudentSign[]>({
        key: 'teacherQuizStudentSign', dependencies: [quizId], apiFunction: async () => {
            return UseFetchFindManyQuizStudentSignByQuizId({ quizId })
        }
    })

    return (
        <AppLayout title='Detail Quiz'>
            <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                <DialogTrigger asChild><Button>Detail</Button></DialogTrigger>
                <DialogContent className="min-w-[650px] xl:w-[700px] max-h-[80vh] overflow-y-auto">
                    <DialogHeader>
                        <DialogTitle>Detail Quiz</DialogTitle>
                    </DialogHeader>
                    <div className='flex flex-col gap-5'>
                        <Table>
                            <TableCaption>Daftar Penugasan Murid</TableCaption>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>Status</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataQuizStudentSign && dataQuizStudentSign.map((studentSign, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{++index}</TableCell>
                                        <TableCell>{studentSign.Student?.name}</TableCell>
                                        <TableCell className={`${studentSign.isDone ? "text-green-600" : "text-red-600"} font-bold`}>{studentSign.isDone ? "Selesai" : "Belum"}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                </DialogContent>
            </Dialog>
        </AppLayout>
    )
}

export default TeacherQuizDetail