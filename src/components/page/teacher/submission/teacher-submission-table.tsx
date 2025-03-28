import { Table, TableBody, TableCaption, TableCell, TableHead, TableHeader, TableRow } from "@/components/ui/table"
import { ISSubmission } from "@/interfaces/schema-interface"
import TeacherSubmissionDetail from "./teacher-submission-detail"

const TeacherSubmissionTable = ({ dataSubmission }: { dataSubmission: ISSubmission[] }) => {

    return (
        <div>
            <Table>
                <TableCaption>Daftar Tugas</TableCaption>
                <TableHeader>
                    <TableRow>
                        <TableHead>No</TableHead>
                        <TableHead>Judul</TableHead>
                        <TableHead>Status</TableHead>
                        <TableHead>Aksi</TableHead>
                    </TableRow>
                </TableHeader>
                <TableBody>
                    {dataSubmission && dataSubmission.map((submission, index) => (
                        <TableRow key={index}>
                            <TableCell>{++index}</TableCell>
                            <TableCell>{submission.title}</TableCell>
                            <TableCell className={`${submission.isActive ? "text-green-600" : "text-red-600"} font-bold`}>{submission.isActive ? "Aktif" : "Tidak Aktif"}</TableCell>
                            <TableCell>
                                <TeacherSubmissionDetail submissionId={submission.id} />
                            </TableCell>
                        </TableRow>
                    ))}
                </TableBody>
            </Table>
        </div>
    )
}

export default TeacherSubmissionTable