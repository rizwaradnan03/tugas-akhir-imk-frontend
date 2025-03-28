import QuizDropzone from '@/components/dropzone/quiz-dropzone'
import { Button } from '@/components/ui/button'
import { Checkbox } from '@/components/ui/checkbox'
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from '@/components/ui/dialog'
import { Input } from '@/components/ui/input'
import { Label } from '@/components/ui/label'
import { UseFetch } from '@/hooks/use-fetch'
import { IFQuizAnswer, IFQuizModules, IFQuizQuestion } from '@/interfaces/form-interface'
import { ISQuizQuestion } from '@/interfaces/schema-interface'
import { UseCreateManyQuizAnswer } from '@/lib/api/quiz-answer/createMany'
import { UseUpdateManyQuizAnswer } from '@/lib/api/quiz-answer/updateMany'
import { UseCreateManyQuizQuestionModule } from '@/lib/api/quiz-question-module/createMany'
import { UseCreateManyQuizQuestion } from '@/lib/api/quiz-question/createMany'
import { UseFetchFindManyQuizQuestionByQuizId } from '@/lib/api/quiz-question/findManyByQuizId'
import { UseUpdateManyQuizQuestion } from '@/lib/api/quiz-question/updateMany'
import QuizProvider from '@/providers/contexts/quiz-provider'
import { Plus, Trash } from 'lucide-react'
import { useState } from 'react'
import toast from 'react-hot-toast'

const TeacherQuizForm = ({ quizId }: { quizId: string }) => {
    const [quizQuestion, setQuizQuestion] = useState<IFQuizQuestion[]>([{ question: '' }])
    const [quizAnswer, setQuizAnswer] = useState<IFQuizAnswer[][]>([[{ quizQuestionId: '', answer: '', isRight: false }, { quizQuestionId: '', answer: '', isRight: false }, { quizQuestionId: '', answer: '', isRight: false }, { quizQuestionId: '', answer: '', isRight: false }]])
    const [quizModules, setQuizModules] = useState<IFQuizModules[]>([{ files: [], quizQuestionId: '' }])

    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)
    const [isEditable, setIsEditable] = useState<boolean>(false)
    const [isButtonDisabled, setIsButtonDisabled] = useState<boolean>(false)
    const [isDoneSubmitting, setIsDoneSubmitting] = useState<boolean>(false)

    const handleChangeQuestion = ({ value, indexParent }: { value: string, indexParent: number }) => {
        let newQuizQuestion = [...quizQuestion]
        newQuizQuestion[indexParent].question = value
        setQuizQuestion(newQuizQuestion)
    }

    const handleChangeAnswer = ({ value, indexParent, indexAnswer }: { value: string, indexParent: number, indexAnswer: number }) => {
        let newQuizAnswer = [...quizAnswer]
        newQuizAnswer[indexParent][indexAnswer].answer = value
        setQuizAnswer(newQuizAnswer)
    }

    const handleChangeChecked = ({ indexParent, indexAnswer }: { indexParent: number, indexAnswer: number }) => {
        let newQuizAnswer = [...quizAnswer]

        for (let i = 0; i < newQuizAnswer[indexParent].length; i++) {
            newQuizAnswer[indexParent][i].isRight = false
        }

        newQuizAnswer[indexParent][indexAnswer].isRight = true
        setQuizAnswer(newQuizAnswer)
    }

    const handleAddMoreQuestion = () => {
        setQuizQuestion((prevQuizQuestion) => [...prevQuizQuestion, { question: '' }])
        setQuizAnswer((prevQuizAnswer) => [...prevQuizAnswer, [{ quizQuestionId: '', answer: '', isRight: false }, { quizQuestionId: '', answer: '', isRight: false }, { quizQuestionId: '', answer: '', isRight: false }, { quizQuestionId: '', answer: '', isRight: false }]])
        setQuizModules((prevQuizModules) => [...prevQuizModules, { files: [], quizQuestionId: '' }])
    }

    const handleDeleteFormItem = ({ indexParent }: { indexParent: number }) => {
        if (quizQuestion.length == 1 && quizAnswer.length == 1) {
            toast.error("Quiz Setidaknya Harus Ada 1!")

            return
        }

        let newQuizQuestion = [...quizQuestion]
        let newQuizAnswer = [...quizAnswer]
        let newQuizModule = [...quizModules]

        newQuizQuestion.splice(indexParent, 1)
        newQuizAnswer.splice(indexParent, 1)
        newQuizModule.splice(indexParent, 1)

        setQuizQuestion(newQuizQuestion)
        setQuizAnswer(newQuizAnswer)
        setQuizModules(newQuizModule)
    }

    const handleCreateQuiz = async () => {
        setIsButtonDisabled(true)

        let isQuestionValid = true
        let isQuizAnswerValid = true

        for (let i = 0; i < quizQuestion.length; i++) {
            if (!quizQuestion[i].question) {
                isQuestionValid = false
            }
        }

        if (!isQuestionValid) {
            toast.error("Semua Pertanyaan Harus Terisi!")
            return
        }

        for (let i = 0; i < quizAnswer.length; i++) {
            for (let j = 0; j < quizAnswer[i].length; j++) {
                if (!quizAnswer[i][j].answer) {
                    isQuizAnswerValid = false
                }
            }
        }

        if (!isQuizAnswerValid) {
            toast.error("Semua Jawaban & Checkbox Harus Terisi!")
            return
        }

        try {
            const createQuizQuestion = await UseCreateManyQuizQuestion({ quizId: quizId, quizQuestions: quizQuestion })
            const data: ISQuizQuestion[] = createQuizQuestion.data

            let quizAnswerPayload: IFQuizAnswer[][] = []
            let quizModulePayload: IFQuizModules[] = []
            for (let i = 0; i < data.length; i++) {
                let payloadAnswer = []
                for (let p = 0; p < quizAnswer[i].length; p++) {
                    quizAnswer[i][p].quizQuestionId = data[i].id
                    payloadAnswer.push(quizAnswer[i][p])
                }
                quizAnswerPayload.push(payloadAnswer)

                quizModules[i].quizQuestionId = data[i].id
                quizModulePayload.push(quizModules[i])
            }

            await UseCreateManyQuizAnswer({ quizAnswers: quizAnswerPayload })

            if (quizModules.length > 0) {
                await UseCreateManyQuizQuestionModule({ quizModules: quizModulePayload })
            }

            setIsDoneSubmitting(true)
            toast.success("Berhasil Membuat Soal Quiz!")
        } catch (error: any) {
            toast.error(error.message)
        } finally {
            setIsButtonDisabled(false)
        }
    }

    const handleEditQuiz = async () => {
        try {
            const modifiedQuizQuestion = quizQuestion.map((question) => {
                return {
                    id: question.id,
                    question: question.question,
                    quizId: question.quizId,
                }
            })

            const modifiedQuizAnswer = quizAnswer.map((quizAnswer) => {
                return quizAnswer.map((answer) => {
                    return {
                        quizQuestionId: answer.quizQuestionId,
                        answer: answer.answer,
                        isRight: answer.isRight,
                    }
                })
            })

            const updateQuizQuestion = await UseUpdateManyQuizQuestion({ quizId: quizId, data: modifiedQuizQuestion })
            const updateQuizAnswer = await UseUpdateManyQuizAnswer({data: modifiedQuizAnswer})
            
            toast.success("Berhasil Mengubah Quiz!")
        } catch (error: any) {
            toast.error(error.message)
        }
    }

    const { } = UseFetch({
        key: 'teacherQuizQuestionAndQuizAnswerAndQuizQuestionModule', dependencies: [isDialogOpen], refetchDependencies: [{ stateValue: isDoneSubmitting, stateSetter: setIsDoneSubmitting }], apiFunction: async () => {
            const { data }: { data: ISQuizQuestion[] } = await UseFetchFindManyQuizQuestionByQuizId({ quizId: quizId })
            if (data.length > 0) {
                setQuizQuestion(data)

                let quizAnswer = []
                let quizQuestionModule = []
                for (let i = 0; i < data.length; i++) {
                    let quizAnswerData = data[i].QuizAnswer
                    let quizAnswerDatas = []
                    
                    if(quizAnswerData){
                        for(let j = 0;j < quizAnswerData.length;j++){
                            const payload = {
                                id: quizAnswerData[j].id,
                                quizQuestionId: quizAnswerData[j].quizQuestionId,
                                answer: quizAnswerData[j].answer,
                                isRight: quizAnswerData[j].isRight
                            }
                            quizAnswerDatas.push(payload)
                        }
                    }

                    quizAnswer.push(quizAnswerDatas)
                }

                if (quizAnswer) {
                    setQuizAnswer(quizAnswer as unknown as IFQuizAnswer[][])
                }

                setIsEditable(true)
            }
        }
    })

    return (
        <QuizProvider>
            <div>
                <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                    <DialogTrigger asChild><Button className='bg-custom-secondary'>Tugas</Button></DialogTrigger>
                    <DialogContent className="min-w-[650px] xl:w-[700px] max-h-[80vh] overflow-y-auto">
                        <DialogHeader className='pt-4 flex flex-row justify-between'>
                            <DialogTitle>Form Quiz</DialogTitle>
                            <Button onClick={() => handleAddMoreQuestion()}><Plus /> Tambah Soal</Button>
                        </DialogHeader>
                        <div className='flex flex-col gap-5'>
                            {quizQuestion.map((item, indexParent) => (
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
                                            <QuizDropzone files={quizModules} setFiles={setQuizModules} indexParent={indexParent} maximumFiles={3} />
                                        </div>
                                        <div className='w-2/4'>
                                            <Label htmlFor="question" className="text-right">
                                                Jawaban
                                            </Label>
                                            {quizAnswer[indexParent].map((answer, indexAnswer) => (
                                                <div key={indexAnswer} className='flex flex-row'>
                                                    <div className='w-3/4'>
                                                        <Label htmlFor="question" className="text-right">
                                                            Jawaban {indexAnswer + 1}
                                                        </Label>
                                                        <Input value={answer.answer} onChange={(e) => handleChangeAnswer({ value: e.target.value, indexParent: indexParent, indexAnswer: indexAnswer })} placeholder='Jawaban' />
                                                    </div>
                                                    <div className='w-1/4 flex items-center justify-center'>
                                                        <Checkbox onCheckedChange={() => handleChangeChecked({ indexParent: indexParent, indexAnswer: indexAnswer })} checked={answer.isRight} />
                                                    </div>
                                                </div>
                                            ))}
                                        </div>
                                    </div>
                                </div>
                            ))}
                            <Button onClick={() => isEditable ? handleEditQuiz() : handleCreateQuiz()} disabled={isButtonDisabled}>{isEditable ? "Edit" : "Submit"}</Button>
                        </div>
                    </DialogContent>
                </Dialog>
            </div>
        </QuizProvider>
    )
}

export default TeacherQuizForm