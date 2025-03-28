import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ISEssay } from "@/interfaces/schema-interface"
import TeacherEssayForm from "./teacher-essay-form"

const TeacherEssayTable = ({ dataEssay }: { dataEssay: ISEssay[] }) => {
    return (
        <div>
            <Table>
                <TableCaption>Daftar Quiz</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataEssay && dataEssay.map((essay, index) => (
                        <TableRow key={index}>
                            <TableCell>{++index}</TableCell>
                            <TableCell>{essay.title}</TableCell>
                            <TableCell className={`${essay.isActive ? "text-green-600" : "text-red-600"} font-bold`}>{essay.isActive ? "Aktif" : "Tidak Aktif"}</TableCell>
                            <TableCell>
                                {/* <TeacherSubmissionDetail submissionId={submission.id} /> */}
                                <TeacherEssayForm essayId={essay.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeacherEssayTable