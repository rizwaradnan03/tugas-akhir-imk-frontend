import { IFEssayQuestion, IFEssayQuestionModules } from '@/interfaces/form-interface'
import React, { useState } from 'react'
import { Button } from '@/components/ui/button'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UseFetch } from '@/hooks/use-fetch'
import { Plus, Trash } from 'lucide-react'
import EssayDropzone from '@/components/dropzone/essay-dropzone'
import toast from 'react-hot-toast'
import { UseCreateManyEssayQuestion } from '@/lib/api/essay-question/createMany'
import { UseCreateManyEssayQuestionModule } from '@/lib/api/essay-question-module/createMany'

const TeacherEssayForm = ({essayId}: {essayId: string}) => {
    const [essayQuestions, setEssayQuestions] = useState<IFEssayQuestion[]>([{question: '', essayId: ''}])
    const [essayQuestionModules, setEssayQuestionModules] = useState<IFEssayQuestionModules[]>([{files: [], essayQuestionId: ''}])

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [isDoneSubmitting, setIsDoneSubmitting] = useState<boolean>(false)

    const handleAddMoreQuestion = () => {
        setEssayQuestions((prevValues) => [...prevValues, {question: '', essayId: ''}])
        setEssayQuestionModules((prevValues) => [...prevValues, {files: [], essayQuestionId: ''}])
    }

    const handleDeleteFormItem = ({indexParent}: {indexParent: number}) => {
        if(essayQuestionModules.length == 1 || essayQuestions.length == 1){
            toast.error("Essay Minimal Harus Memiliki 1 Soal!")
            return
        }

        let duplicateEssayQuestions = [...essayQuestions]
        let duplicateEssayQuestionModules = [...essayQuestionModules]

        duplicateEssayQuestions.splice(indexParent, 1)
        duplicateEssayQuestionModules.splice(indexParent, 1)

        setEssayQuestions(duplicateEssayQuestions)
        setEssayQuestionModules(duplicateEssayQuestionModules)
    }

    const handleChangeQuestion = ({value, indexParent}: {value: string, indexParent: number}) => {
        let duplicateEssayQuestions = [...essayQuestions]
        duplicateEssayQuestions[indexParent].question = value

        setEssayQuestions(duplicateEssayQuestions)
    }

    const handleCreateEssay = async () => {
        setIsButtonDisabled(true)
        try {
            const {data: dataCreateEssayQuestions}: {data: IFEssayQuestion[]} = await UseCreateManyEssayQuestion({essayId: essayId, essayQuestions: essayQuestions})
            if(essayQuestionModules.length > 0){
                let modifiedQuizQuestionModules: IFEssayQuestionModules[] = essayQuestionModules.map((essayQuestionModule, index) => {
                    return {
                        ...essayQuestionModule,
                        essayQuestionId: dataCreateEssayQuestions[index].id || ''
                    }
                })

                await UseCreateManyEssayQuestionModule({essayQuestionModules: modifiedQuizQuestionModules})
            }

            toast.success("Berhasil Menambahkan Data Essay!")
        } catch (error: any) {
            toast.error(error.message)
        }finally{
            setIsButtonDisabled(false)
            setIsDialogOpen(false)
        }
    }

    const handleEditEssay = async () => {
        try {
            
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    return (
        <div>
            <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                    <DialogTrigger asChild><Button className='bg-custom-secondary'>Tugas</Button></DialogTrigger>
                    <DialogContent className="min-w-[650px] xl:w-[700px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader className='pt-4 flex flex-row justify-between'>
                            <DialogTitle>Form Essay</DialogTitle>
                            <Button onClick={() => handleAddMoreQuestion()}><Plus /> Tambah Soal</Button>
                        </DialogHeader>
                        <div className='flex flex-col gap-5'>
                            {essayQuestions.map((item, indexParent) => (
                                <div key={indexParent} className='flex flex-col gap-4 shadow-md p-3'>
                                    <div className='flex justify-between'>
                                        <h2 className='text-xl font-bold'>Soal Ke : {indexParent + 1}</h2>
                                        <button className='bg-red-700 text-white p-1 rounded-md flex flex-row' onClick={() => handleDeleteFormItem({ indexParent: indexParent })}><Trash /> Hapus</button>
                                    </div>
                                    <div>
                                        <Label htmlFor="question" className="text-right">
                                            Pertanyaan
                                        </Label>
                                        <Input
                                            id="question"
                                            className="col-span-3"
                                            value={item.question}
                                            placeholder='Pertanyaan'
                                            onChange={(e) => handleChangeQuestion({ value: e.target.value, indexParent: indexParent })}
                                        />
                                    </div>
                                    <div className="flex gap-4">
                                        <div className='w-2/4'>
                                            <Label htmlFor="question" className="text-right">
                                                Modul (Tidak Wajib)
                                            </Label>
                                            <EssayDropzone files={essayQuestionModules} setFiles={setEssayQuestionModules} indexParent={indexParent} maximumFiles={3} />
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={() => isEditable ? handleEditEssay() : handleCreateEssay()} disabled={isButtonDisabled}>{isEditable ? "Edit" : "Submit"}</Button>
                        </div>
                    </DialogContent>
                </Dialog>
        </div>
    )
}

export default TeacherEssayForm