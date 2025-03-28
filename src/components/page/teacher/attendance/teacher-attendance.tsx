import { UseFetch } from '@/hooks/use-fetch'
import { ISAttendance, ISAttendanceStudent } from '@/interfaces/schema-interface'
import { UseFetchFindOneAttendanceByLessonId } from '@/lib/api/attendance/findOneByLessonId'
import { useState } from 'react'
import toast from 'react-hot-toast'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { UseCreateAttendance } from '@/lib/api/attendance/create'
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table'
import { UseFetchFindManyAttendanceStudentByAttendanceId } from '@/lib/api/attendance-student/findManyByAttendanceId'
import { Skeleton } from '@/components/ui/skeleton'
import AppLayout from '@/components/layouts/app-layout'
import { Label } from '@/components/ui/label'
import { Input } from '@/components/ui/input'
import { Button } from '@/components/ui/button'

const TeacherAttendanceComponent = ({ lessonId }: { lessonId: string }) => {
    //form
    const [title, setTitle] = useState<string | undefined>(undefined)
    const [startedAt, setStartedAt] = useState<string | undefined>(undefined)
    const [endedAt, setEndedAt] = useState<string | undefined>(undefined)

    const [isDoneCreatingAttendance, setIsDoneCreatingAttendance] = useState<boolean>(false)

    const { data: dataAttendance, isLoading: isLoadingAttendance, error: errorAttendance } = UseFetch<ISAttendance>({
        key: "teacherAttendance", dependencies: [lessonId], refetchDependencies: [{ stateValue: isDoneCreatingAttendance, stateSetter: setIsDoneCreatingAttendance }], apiFunction: async () => {
            const data = await UseFetchFindOneAttendanceByLessonId({ lessonId: lessonId })
            return data
        }
    })

    const {data: dataAttendanceStudent, isLoading: isLoadingAttendanceStudent, error: errorAttendanceStudent} = UseFetch<ISAttendanceStudent[]>({key: "teacherAttendanceStudent", dependencies: [dataAttendance?.id], apiFunction: async () => {
        if(!dataAttendance){
            return
        }
        const fetch = await UseFetchFindManyAttendanceStudentByAttendanceId({attendanceId: dataAttendance?.id})
        return fetch
    }})

    const handleCreateAttendance = async () => {
        if (!title || !lessonId) {
            return
        }

        try {
            const create = await UseCreateAttendance({ data: { title: title, lessonId: lessonId, startedAt: new Date(startedAt as string), endedAt  : new Date(endedAt as string) } })

            toast.success("Berhasil Membuat Absensi!")
            setIsDoneCreatingAttendance(true)
            return create.data
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    if(isLoadingAttendance || isLoadingAttendanceStudent){
        return <Skeleton className='w-full h-full' />
    }

    return (
        <AppLayout title='Absensi Murid'>
        {!isLoadingAttendance && !isLoadingAttendanceStudent ? (
            dataAttendance && dataAttendanceStudent ? (
                <Table>
                    <TableHeader>
                        <TableRow>
                            <TableHead>No</TableHead>
                            <TableHead>Nama</TableHead>
                            <TableHead>Status</TableHead>
                        </TableRow>
                    </TableHeader>
                    <TableBody>
                        {dataAttendanceStudent?.map((attendanceStudent, index) => (
                            <TableRow key={index}>
                                <TableCell>{++index}</TableCell>
                                <TableCell>{attendanceStudent.Student?.name}</TableCell>
                                <TableCell className={`${attendanceStudent.isPresent == true ? 'text-custom-secondary' : 'text-red-600'} font-bold`}>{attendanceStudent.isPresent == true ? "Sudah" : "Belum"}</TableCell>
                            </TableRow>
                        ))}
                    </TableBody>
                </Table>
            ) : (
                <Dialog>
                    <DialogTrigger className='bg-primary p-1 text-white rounded-md'>Buat Absensi</DialogTrigger>
                    <DialogContent>
                        <DialogHeader>
                            <DialogTitle>Data Absensi</DialogTitle>
                        </DialogHeader>
                        <div className='grid gap-4 py-4'>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='title' className="text-right">
                                    Judul Absensi
                                </Label>
                                <Input
                                id='title'
                            
                                    type='text'
                                    className="col-span-3"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='started-at' className="text-right">
                                    Waktu Mulai
                                </Label>
                                <Input
                                id='started-at'
                                    type='datetime-local'
                                    className="col-span-3"
                                    value={startedAt}
                                    onChange={(e) => setStartedAt(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor='ended-at' className="text-right">
                                    Waktu Selesai
                                </Label>
                                <Input
                                id='ended-at'
                                    type='datetime-local'
                                    className="col-span-3"
                                    value={endedAt}
                                    onChange={(e) => setEndedAt(e.target.value)}
                                    required
                                />
                            </div>
                            <Button onClick={() => handleCreateAttendance()}>Buat Absensi</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            )
        ) : <Skeleton className='w-full h-full' />}
        </AppLayout>
    )
}

export default TeacherAttendanceComponent