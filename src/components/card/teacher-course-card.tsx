import { Link } from 'react-router-dom'
import { Card, CardContent, CardHeader, CardTitle } from '../ui/card'
import { TReactNode } from '@/types/htmlType'

const TeacherCourseCard = ({title, children, className, classCourseId, courseId }: {title: string, children: TReactNode, className?: string, classCourseId: string, courseId: string }) => {
    return (
        <Link to={`/teacher/class/lesson/${courseId}/class-course/${classCourseId}`}>
            <Card className={`${className}`}>
                <CardHeader>
                    <CardTitle className='font-bold tracking-wider'>{title}</CardTitle>
                </CardHeader>
                <CardContent>
                    {children}
                </CardContent>
            </Card>
        </Link>
    )
}

export default TeacherCourseCard