import { SidebarMenu, SidebarMenuButton, SidebarMenuItem } from '../ui/sidebar'
import { DropdownMenu, DropdownMenuContent } from '../ui/dropdown-menu'
import { DropdownMenuItem, DropdownMenuTrigger } from '@radix-ui/react-dropdown-menu'
import { Check, ChevronsUpDown, GalleryVerticalEnd } from 'lucide-react'
import { UseCourse } from '@/hooks/context/use-course'
import { ISCourse } from '@/interfaces/schema-interface'

const CourseSwitcher = () => {
    const { selectedCourse, setSelectedCourse, courses } = UseCourse()

    const handleChangeCourse = ({course}: {course: ISCourse}) => {
        if(!course){
            return
        }
        if (setSelectedCourse) {
            setSelectedCourse(course)
        }
    }

    return (
        <SidebarMenu>
            <SidebarMenuItem>
                <DropdownMenu>
                    <DropdownMenuTrigger asChild>
                        <SidebarMenuButton size='lg' className='data-[state=open]:bg-sidebar-accent data-[state=open]:text-sidebar-accent-foreground'>
                            <div className='flex aspect-square size-8 items-center justify-center rounded-lg bg-sidebar-primary text-sidebar-primary-foreground'>
                                <GalleryVerticalEnd className='size-4' />
                            </div>
                            <span className='font-semibold'>{selectedCourse?.name}</span>
                            <ChevronsUpDown className='ml-auto' />
                        </SidebarMenuButton>
                    </DropdownMenuTrigger>
                    <DropdownMenuContent className='w-[--radix-dropdown-menu-trigger-width]' align='start'>
                        {courses && courses?.map((course, index) => (
                            <DropdownMenuItem key={index} onSelect={() => handleChangeCourse({course: course})}>
                                {course.name}
                                {course.id === selectedCourse?.id && (
                                    <Check className='ml-auto' />
                                )}
                            </DropdownMenuItem>
                        ))}
                    </DropdownMenuContent>
                </DropdownMenu>
            </SidebarMenuItem>
        </SidebarMenu>
    )
}

export default CourseSwitcher