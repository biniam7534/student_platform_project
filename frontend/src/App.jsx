import React from 'react';
import Sidebar from './components/Sidebar';
import Header from './components/Header';
import StatsCard from './components/Dashboard/StatsCard';
import AttendanceChart from './components/Dashboard/AttendanceChart';
import StudentDirectory from './components/Dashboard/StudentDirectory';
import FeesCollection from './components/Dashboard/FeesCollection';
import TeacherDirectory from './components/Dashboard/TeacherDirectory';
import CourseDirectory from './components/Dashboard/CourseDirectory';
import EventsPage from './components/Dashboard/EventsPage';
import FinancePage from './components/Dashboard/FinancePage';
import CalendarPage from './components/Dashboard/CalendarPage';
import SettingsPage from './components/Dashboard/SettingsPage';
import RightSidebar from './components/RightSidebar';
import { Users, UserSquare2, Briefcase, Calendar } from 'lucide-react';
import { adminService } from './services/api';

function App() {
  const [activeItem, setActiveItem] = React.useState('Dashboard');
  const [stats, setStats] = React.useState([
    { title: 'Total Students', value: '...', icon: Users, color: 'bg-[#6d31ed]' },
    { title: 'Total Teachers', value: '...', icon: UserSquare2, color: 'bg-[#ff7aa2]' },
    { title: 'Working Staff', value: '...', icon: Briefcase, color: 'bg-[#50c4ed]' },
    { title: 'This Month Events', value: '...', icon: Calendar, color: 'bg-[#ff9e44]' },
  ]);

  const [attendanceData, setAttendanceData] = React.useState([
    { title: 'Student Attendance', present: 0, absent: 0, color: '#ff9e44' },
    { title: 'Teachers Attendance', present: 0, absent: 0, color: '#ff7aa2' },
    { title: 'Staff Attendance', present: 0, absent: 0, color: '#50c4ed' },
  ]);

  React.useEffect(() => {
    const fetchStats = async () => {
      try {
        const { data } = await adminService.getDashboardStats();
        if (data.success) {
          const { totalStudents, totalTeachers, totalStaff, totalEvents, attendanceSummary } = data.data;

          setStats([
            { title: 'Total Students', value: totalStudents.toLocaleString(), icon: Users, color: 'bg-[#6d31ed]' },
            { title: 'Total Teachers', value: totalTeachers.toLocaleString(), icon: UserSquare2, color: 'bg-[#ff7aa2]' },
            { title: 'Working Staff', value: totalStaff.toLocaleString(), icon: Briefcase, color: 'bg-[#50c4ed]' },
            { title: 'This Month Events', value: totalEvents.toLocaleString(), icon: Calendar, color: 'bg-[#ff9e44]' },
          ]);

          if (attendanceSummary) {
            setAttendanceData(attendanceSummary);
          }
        }
      } catch (error) {
        console.error("Error fetching stats:", error);
      }
    };

    fetchStats();
  }, []);

  return (
    <div className="flex bg-[#f5f6fa] min-h-screen">
      <Sidebar activeItem={activeItem} setActiveItem={setActiveItem} />

      <main className="flex-1 ml-64 flex flex-col min-w-0">
        <Header />

        <div className="flex flex-1 overflow-hidden">
          <div className="flex-1 p-8 overflow-y-auto">
            <div className="mb-10">
              <h2 className="text-2xl font-black text-gray-800 tracking-tight">{activeItem}</h2>
              <p className="text-xs font-bold text-gray-400 mt-1">
                {activeItem === 'Dashboard' && "Hi, Welcome to Edu-Center dashboard"}
                {activeItem === 'Students' && "Manage and view all students in the system"}
                {activeItem === 'Teachers' && "Manage and view all faculty members"}
                {activeItem === 'Courses' && "Explore and manage specialized learning tracks"}
                {activeItem === 'Events' && "Create and manage school events"}
                {activeItem === 'Finance' && "Track fees, payments and financial reports"}
                {activeItem === 'Calendar' && "View and plan your school schedule"}
                {activeItem === 'Setting' && "Manage your account and platform preferences"}
              </p>
            </div>

            {activeItem === 'Dashboard' && (
              <>
                <div className="flex flex-wrap gap-6 mb-8">
                  {stats.map((stat, idx) => (
                    <StatsCard key={idx} {...stat} />
                  ))}
                </div>

                <div className="flex flex-wrap gap-6 mb-8">
                  {attendanceData.map((data, idx) => (
                    <AttendanceChart key={idx} {...data} />
                  ))}
                </div>

                <StudentDirectory />
                <FeesCollection />
              </>
            )}

            {activeItem === 'Students' && <StudentDirectory />}

            {activeItem === 'Teachers' && <TeacherDirectory />}

            {activeItem === 'Courses' && <CourseDirectory />}

            {activeItem === 'Events' && <EventsPage />}

            {activeItem === 'Finance' && <FinancePage />}

            {activeItem === 'Calendar' && <CalendarPage />}

            {activeItem === 'Setting' && <SettingsPage />}
          </div>

          <RightSidebar />
        </div>
      </main>
    </div>
  );
}

export default App;
