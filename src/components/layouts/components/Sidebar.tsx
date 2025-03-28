import CourseSwitcher from '@/components/switcher/course-switcher'
import { Sidebar as SidebarComponent, SidebarContent, SidebarGroup, SidebarGroupContent, SidebarHeader, SidebarInset, SidebarMenu, SidebarMenuButton, SidebarProvider, SidebarTrigger } from '@/components/ui/sidebar'
import { studentUrlItems } from '@/data/sidebar/student'
import { teacherUrlItems } from '@/data/sidebar/teacher'
import React, { useEffect, useState } from 'react'
import { Link, useNavigate } from 'react-router-dom'
import { Separator } from '@/components/ui/separator'
import { Breadcrumb, BreadcrumbItem, BreadcrumbLink, BreadcrumbList, BreadcrumbPage, BreadcrumbSeparator } from '@/components/ui/breadcrumb'
import { TReactNode } from '@/types/htmlType'
import { UseAuth } from '@/hooks/use-auth'
import { UseLocalStorageRemoveItem } from '@/lib/local-storage'
import toast from 'react-hot-toast'
import { ISidebarItems } from '@/interfaces/sidebar-interface'

const Sidebar = ({ children, role }: { children: TReactNode, role: "student" | "teacher" }) => {
    const [renderSidebar, setRenderSidebar] = useState<ISidebarItems[] | undefined>(undefined)

    const { name } = UseAuth()
    const navigate = useNavigate()

    const handleLogout = () => {
        const { role } = UseAuth();

        UseLocalStorageRemoveItem({ key: "accessToken" })

        toast.success("Anda Berhasil Logout!")

        if (role === "teacher") {
            navigate("/auth/sign-in/teacher")
        } else if (role === "student") {
            navigate("/auth/sign-in/student")
        }
    }

    useEffect(() => {
        // console.log("role tot ", role)

        if (role === "student") {
            setRenderSidebar(studentUrlItems)
        } else if (role === "teacher") {
            setRenderSidebar(teacherUrlItems)
        }
    }, [role])

    return (
        <SidebarProvider>
            <SidebarComponent>
                <SidebarHeader>
                    <React.Fragment>
                        <CourseSwitcher />
                    </React.Fragment>
                </SidebarHeader>
                <SidebarContent className='gap-0'>
                    <SidebarGroup>
                        <SidebarGroupContent>
                            <SidebarMenu>
                                {renderSidebar ? (
                                    <React.Fragment>
                                        {renderSidebar.map((item, index) => (
                                            <SidebarMenuButton key={index} asChild>
                                                {item.type === "logout" ? (
                                                    <button onClick={handleLogout} className='bg-red-600 text-white text-center p-1'>Logout</button>
                                                ) : (
                                                    <Link to={item?.url ? item.url : "#"}>
                                                        {item.icon && (
                                                            <item.icon />
                                                        )}
                                                        <span>{item.title}</span>
                                                    </Link>
                                                )}
                                            </SidebarMenuButton>
                                        ))}
                                    </React.Fragment>
                                ) : null}
                            </SidebarMenu>
                        </SidebarGroupContent>
                    </SidebarGroup>
                </SidebarContent>
            </SidebarComponent>
            <SidebarInset>
                <header className="flex h-16 shrink-0 items-center gap-2 border-b px-4">
                    <SidebarTrigger className="-ml-1" />
                    <Separator orientation="vertical" className="mr-2 h-4" />
                    <Breadcrumb>
                        <BreadcrumbList>
                            <BreadcrumbItem className="hidden md:block">
                                <BreadcrumbLink href="#">
                                    Building Your Application
                                </BreadcrumbLink>
                            </BreadcrumbItem>
                            <BreadcrumbSeparator className="hidden md:block" />
                            <BreadcrumbItem>
                                <BreadcrumbPage>Fetching</BreadcrumbPage>
                            </BreadcrumbItem>
                        </BreadcrumbList>
                    </Breadcrumb>
                    <div className="ml-auto flex gap-2">
                        <h2 className="text-xl">Selamat Datang, {name} 👋</h2>
                        {/* <span>
                        <ThemeToggle />
                    </span> */}
                    </div>
                </header>
                {children}
            </SidebarInset>
        </SidebarProvider>
    )
}

export default Sidebar