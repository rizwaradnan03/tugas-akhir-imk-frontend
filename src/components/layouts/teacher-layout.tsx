import { TReactNode } from '@/types/htmlType'
import SidebarLayout from './components/Sidebar'
import CourseProvider from '@/providers/contexts/course-provider'
import { UseAuth } from '@/hooks/use-auth'
import toast from 'react-hot-toast'
import { useNavigate } from 'react-router-dom'

const TeacherLayout = ({ children }: { children: TReactNode }) => {
    const {role} = UseAuth()

    const navigate = useNavigate()

    if(role !== "teacher"){
        toast.error("Anda Tidak Memiliki Akses!")
        navigate('/auth/sign-in/teacher')
    }

    return (
        <>
            <CourseProvider>
                <SidebarLayout role='teacher'>
                    <main className='flex p-4 min-h-screen bg-gray-100'>
                        {children}
                    </main>
                </SidebarLayout>
            </CourseProvider>
        </>
    )
}

export default TeacherLayout