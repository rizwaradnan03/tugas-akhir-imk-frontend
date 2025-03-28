import { TReactNode } from '@/types/htmlType'
import SidebarLayout from './components/Sidebar'
import CourseProvider from '@/providers/contexts/course-provider'

const StudentLayout = ({ children }: { children: TReactNode }) => {

    return (
        <CourseProvider>
            <SidebarLayout role='student'>
                <main className='flex p-4 min-h-screen bg-gray-100'>
                    {children}
                </main>
            </SidebarLayout>
        </CourseProvider>
    )
}

export default StudentLayout