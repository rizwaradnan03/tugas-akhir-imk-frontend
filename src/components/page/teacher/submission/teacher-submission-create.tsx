import Dropzone from '@/components/dropzone/dropzone'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UseCreateSubmissionModule } from '@/lib/api/submission-module/create'
import { UseCreateSubmission } from '@/lib/api/submission/create'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TeacherSubmissionCreate = ({ lessonId, setIsDoneCreatingSubmission }: { lessonId: string, setIsDoneCreatingSubmission: (value: boolean) => void }) => {

    const [title, setTitle] = useState<string | undefined>(undefined)
    const [dueDate, setDueDate] = useState<string | undefined>(undefined)
    const [files, setFiles] = useState<string[] | undefined>(undefined)
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    const handleCreateSubmission = async () => {
        setIsButtonDisabled(true)
        if (!title || !dueDate || !lessonId) {
            toast.error("Judul & Tenggat Waktu Dibutuhkan!")

            return
        }
        try {
            const createSubmission = await UseCreateSubmission({ data: { title: title, dueDate: new Date(dueDate as string), lessonId: lessonId } })
            if (files) {
                await UseCreateSubmissionModule({ files: files, submissionId: createSubmission.data.id })
            }

            setIsDialogOpen(false)
            setIsDoneCreatingSubmission(true)
            toast.success("Berhasil Membuat Tugas!")

            setFiles(undefined)
            setTitle(undefined)
            setDueDate(undefined)
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsButtonDisabled(false)
        }
    }

    return (
        <div>
            <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                <DialogTrigger className="self-end"><Button className="bg-green-600"><Plus /> Tambah Tugas</Button></DialogTrigger>
                <DialogContent className="w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Tugas</DialogTitle>
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
                                    Deadline
                                </Label>
                                <Input
                                    type="datetime-local"
                                    id="due-date"
                                    className="col-span-3"
                                    value={dueDate}
                                    onChange={(e) => setDueDate(e.target.value)}
                                    required
                                />
                            </div>
                            <div className="flex flex-row gap-20">
                                <Label htmlFor="module" className="text-right">
                                    Modul
                                </Label>
                                <Dropzone files={files} setFiles={setFiles} maximumFiles={2} />
                            </div>
                        </div>
                        <DialogFooter>
                            <Button onClick={() => handleCreateSubmission()} disabled={isButtonDisabled}>Submit</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TeacherSubmissionCreate