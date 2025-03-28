import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UseCreateEssay } from '@/lib/api/essay/create'
import { Plus } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TeacherEssayCreate = ({ lessonId, setIsDoneCreatingEssay }: { lessonId: string, setIsDoneCreatingEssay: (value: boolean) => void }) => {
    const [title, setTitle] = useState<string | undefined>(undefined)
    const [startedAt, setStartedAt] = useState<string | undefined>(undefined)
    const [endedAt, setEndedAt] = useState<string | undefined>(undefined)

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)

    const handleCreateEssay = async () => {
        setIsButtonDisabled(true)

        if(!title || !startedAt || !endedAt){
            toast.error("Judul / Waktu Mulai / Waktu Selesai Dibutuhkan!")
            setIsButtonDisabled(false)
            return
        }

        try {
            UseCreateEssay({data: {title: title, startedAt: new Date(startedAt as string), endedAt: new Date(endedAt as string), lessonId: lessonId}})
            setIsDoneCreatingEssay(true)

            toast.success("Berhasil Menambahkan Essay!")
            setIsDialogOpen(false)
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setIsButtonDisabled(false)
        }
    }

    return (
        <div>
            <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                <DialogTrigger className="self-end"><Button className="bg-green-600"><Plus /> Tambah Essay</Button></DialogTrigger>
                <DialogContent className="w-[500px]">
                    <DialogHeader>
                        <DialogTitle>Tambah Essay</DialogTitle>
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
                            <Button onClick={() => handleCreateEssay()} disabled={isButtonDisabled}>Submit</Button>
                        </DialogFooter>
                    </DialogHeader>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TeacherEssayCreate