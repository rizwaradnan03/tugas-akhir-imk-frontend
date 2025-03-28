import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UseCreateQuiz } from '@/lib/api/quiz/create'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TeacherQuizCreate = ({lessonId, setIsDoneCreatingQuiz}: {lessonId: string, setIsDoneCreatingQuiz: (value: boolean) => void}) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    const [title, setTitle] = useState<string | undefined>(undefined)
    const [startedAt, setStartedAt] = useState<string | undefined>(undefined)
    const [endedAt, setEndedAt] = useState<string | undefined>(undefined)

    const handleCreateQuiz = async () => {
        setIsButtonDisabled(true)
        if(!title || !lessonId || !startedAt || !endedAt){
            toast.error("Judul / Lesson Id / Waktu Mulai / Waktu Selesai Dibutuhkan!")
            return
        }

        try {
            await UseCreateQuiz({data: {lessonId: lessonId, title: title, startedAt: new Date(startedAt as string), endedAt: new Date(endedAt as string)}})

            toast.success("Berhasil Membuat Quiz!")
            setIsDialogOpen(false)

            setIsDoneCreatingQuiz(true)
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setIsButtonDisabled(false)
        }
    }

    return (
        <div>
            <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                <DialogTrigger className="self-end"><Button className="bg-green-600"><Plus /> Tambah Quiz</Button></DialogTrigger>
                <DialogContent className="w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Quiz</DialogTitle>
                        <div className="grid gap-4 py-4">
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="title" className="text-right">
                                    Judul
                                </Label>
                                <Input
                                    type="text"
                                    id="title"
                                    className="col-span-3"
                                    value={title}
                                    onChange={(e) => setTitle(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="due-date" className="text-right">
                                    Mulai
                                </Label>
                                <Input
                                    type="datetime-local"
                                    id="due-date"
                                    className="col-span-3"
                                    value={startedAt}
                                    onChange={(e) => setStartedAt(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="grid grid-cols-4 items-center gap-4">
                                <Label htmlFor="due-date" className="text-right">
                                    Selesai
                                </Label>
                                <Input
                                    type="datetime-local"
                                    id="due-date"
                                    className="col-span-3"
                                    value={endedAt}
                                    onChange={(e) => setEndedAt(e.target.value)}
                                    required
                                />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => handleCreateQuiz()} disabled={isButtonDisabled}>Submit</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TeacherQuizCreate