import { Button } from "@/components/ui/button"
import { Dialog, DialogContent, DialogDescription, DialogFooter, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog"
import { Input } from "@/components/ui/input"
import { Label } from "@/components/ui/label"
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { UseFetch } from "@/hooks/use-fetch"
import { ISSubmissionAnswer } from "@/interfaces/schema-interface"
import { UseFetchFindManySubmissionAnswerBySubmissionId } from "@/lib/api/submission-answer/findManyBySubmissionId"
import { useState } from "react"

const TeacherSubmissionDetail = ({ submissionId }: { submissionId: string }) => {
    const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false)

    const [selectedSubmissionAnswer, setSelectedSubmissionAnswer] = useState<ISSubmissionAnswer | undefined>(undefined)

    const { data: dataSubmissionAnswer } = UseFetch<ISSubmissionAnswer[]>({
        key: "teacherSubmissionAnswer", dependencies: [submissionId, isDialogOpen], apiFunction: async () => {
            return UseFetchFindManySubmissionAnswerBySubmissionId({ submissionId: submissionId })
        }
    })

    return (
        <div>
            <Dialog onOpenChange={(open) => setIsDialogOpen(open)} open={isDialogOpen}>
                <DialogTrigger><Button>Detail</Button></DialogTrigger>
                <DialogContent>
                    <DialogHeader>
                        <DialogTitle>Detail Tugas</DialogTitle>
                        <DialogDescription></DialogDescription>
                    </DialogHeader>
                    <div>
                        <Table>
                            <TableHeader>
                                <TableRow>
                                    <TableHead>No</TableHead>
                                    <TableHead>Nama</TableHead>
                                    <TableHead>File</TableHead>
                                </TableRow>
                            </TableHeader>
                            <TableBody>
                                {dataSubmissionAnswer?.map((submissionAnswer, index) => (
                                    <TableRow key={index}>
                                        <TableCell>{++index}</TableCell>
                                        <TableCell>{submissionAnswer.Student?.name}</TableCell>
                                        <TableCell>{submissionAnswer.SubmissionAnswerModule ? (
                                            <Button onClick={() => setSelectedSubmissionAnswer(submissionAnswer)}></Button>
                                        ) : null}</TableCell>
                                    </TableRow>
                                ))}
                            </TableBody>
                        </Table>
                    </div>
                    <DialogFooter>
                        <Button className="bg-gray-700" onClick={() => setIsDialogOpen(false)}>Kembali</Button>
                    </DialogFooter>
                </DialogContent>
            </Dialog>
        </div>
    )
}

export default TeacherSubmissionDetail