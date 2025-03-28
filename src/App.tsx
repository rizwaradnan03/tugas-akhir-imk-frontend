import { BrowserRouter, Route, Routes } from "react-router-dom"
import StudentSignIn from "./pages/auth/sign-in/StudentSignIn"
import NotFound from "./pages/error/NotFound"
import Home from "./pages/Home"
import TeacherSignIn from "./pages/auth/sign-in/TeacherSignIn"
import { Toaster } from "react-hot-toast"
import ProtectedRoute from "./components/protected-route"
import TeacherDashboard from "./pages/teacher/dashboard/Dashboard"
import ForgotPassword from "./pages/auth/ForgotPassword"
import TeacherLayout from "./components/layouts/teacher-layout"
import TeacherClass from "./pages/teacher/class/Class"
import TeacherClassLesson from "./pages/teacher/class/lesson/Lesson"
import SynchronizeCourseProvider from "./providers/synchronize-course-provider"
import TeacherLearning from "./pages/teacher/class/lesson/learning/Learning"
import MeetingJoin from "./pages/meeting/MeetingJoin"
import RoomProvider from "./providers/contexts/room-provider"
import MeetingRoom from "./pages/meeting/MeetingRoom"
import StudentDashboard from "./pages/student/dashboard/Dashboard"
import StudentLayout from "./components/layouts/student-layout"
import StudentLesson from "./pages/student/lesson/Lesson"

const App = () => {
  return (
    <>
      <BrowserRouter>
        <Routes>
          {/* Home route */}
          <Route path="/" element={<Home />} />

          {/* meeting route */}
          <Route path="/meeting/*" element={
            <RoomProvider>
              <Routes>
                <Route path="join" element={<MeetingJoin />} />
                <Route path="room/:roomId" element={<MeetingRoom />} />
              </Routes>
            </RoomProvider>
          } />


          {/* Auth route */}
          <Route path="/auth/*">
            <Route path="sign-in/*">
              <Route path="student" element={<StudentSignIn />} />
              <Route path="teacher" element={<TeacherSignIn />} />
            </Route>
            <Route path="forgot-password" element={<ForgotPassword />} />
          </Route>

          {/* Teacher route */}
          <Route path="/teacher/*" element={
            <ProtectedRoute>
              <TeacherLayout>
                <SynchronizeCourseProvider>
                  <Routes>
                    <Route path="dashboard" element={<TeacherDashboard />} />
                    <Route path="/class/*" element={
                      <Routes>
                        <Route index element={<TeacherClass />} />
                        <Route path="lesson/:courseId/class-course/:classCourseId" element={<TeacherClassLesson />} />
                        <Route path="lesson/:courseId/class-course/:classCourseId/lesson/:lessonId/learning" element={<TeacherLearning />} />
                      </Routes>
                    } />
                    <Route path="*" element={<NotFound />} />
                  </Routes>
                </SynchronizeCourseProvider>
              </TeacherLayout>
            </ProtectedRoute>
          } />

          <Route path="/student/*" element={
            <ProtectedRoute>
              <StudentLayout>
                <Routes>
                  <Route path="dashboard" element={<StudentDashboard />} />
                  <Route path="lesson" element={<StudentLesson />} />
                  <Route path="*" element={<NotFound />} />
                </Routes>
              </StudentLayout>
            </ProtectedRoute>
          } />

          {/* Not found route */}
          <Route path="*" element={<NotFound />} />
        </Routes>
      </BrowserRouter>
      <Toaster position="top-center" reverseOrder={false} />
    </>
  )
}

export default App
