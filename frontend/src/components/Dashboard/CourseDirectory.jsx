import React from 'react';
import { BookOpen, MoreHorizontal, Edit2, Plus, Search } from 'lucide-react';
import { adminService } from '../../services/api';

const CourseDirectory = () => {
    const [courses, setCourses] = React.useState([]);
    const [loading, setLoading] = React.useState(true);

    const defaultCourses = [
        { id: '1', title: 'Backend Development', description: 'Master Node.js, Express, and MongoDB to build robust server-side applications.', teacher: 'Dr. Sarah Wilson' },
        { id: '2', title: 'Frontend Development', description: 'Learn React, Tailwind CSS, and modern JavaScript to create stunning user interfaces.', teacher: 'Prof. John Doe' },
        { id: '3', title: 'UI/UX Design', description: 'Master Figma and design principles to create intuitive and beautiful user experiences.', teacher: 'Alex Rivera' }
    ];

    React.useEffect(() => {
        const fetchCourses = async () => {
            try {
                const { data } = await adminService.getCourses();
                if (data.success && data.data.length > 0) {
                    const mappedCourses = data.data.map(course => ({
                        id: course._id,
                        title: course.title,
                        description: course.description,
                        teacher: course.teacherId?.username || 'Unassigned'
                    }));
                    setCourses(mappedCourses);
                } else {
                    setCourses(defaultCourses);
                }
            } catch (error) {
                console.error("Error fetching courses:", error);
                setCourses(defaultCourses);
            } finally {
                setLoading(false);
            }
        };

        fetchCourses();
    }, []);

    return (
        <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50 mt-6">
            <div className="flex items-center justify-between mb-8">
                <div>
                    <h4 className="text-lg font-black text-gray-800">Course Catalog</h4>
                    <p className="text-[10px] font-bold text-gray-400">Manage and view all available courses</p>
                </div>
                <div className="flex gap-3">
                    <div className="relative">
                        <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                        <input
                            type="text"
                            placeholder="Search courses..."
                            className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] w-48 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/20 font-medium"
                        />
                    </div>
                    <button className="flex items-center gap-2 text-[10px] font-bold text-white bg-[#4f35a1] px-4 py-2 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                        <Plus className="w-3 h-3" /> Add New Course
                    </button>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                {loading ? (
                    <div className="col-span-full py-20 text-center">
                        <div className="animate-spin w-8 h-8 border-4 border-[#4f35a1] border-t-transparent rounded-full mx-auto mb-4"></div>
                        <p className="text-xs font-bold text-gray-400 uppercase tracking-widest">Loading specialized courses...</p>
                    </div>
                ) : (
                    courses.map((course) => (
                        <div key={course.id} className="group p-6 rounded-[20px] bg-white border border-gray-100 hover:border-[#4f35a1]/20 hover:shadow-xl hover:shadow-[#4f35a1]/5 transition-all duration-300 relative overflow-hidden">
                            <div className="absolute top-0 right-0 p-4 opacity-0 group-hover:opacity-100 transition-opacity">
                                <button className="p-1.5 hover:bg-gray-50 rounded-lg text-gray-400">
                                    <MoreHorizontal className="w-4 h-4" />
                                </button>
                            </div>

                            <div className="w-12 h-12 rounded-2xl bg-[#4f35a1]/5 flex items-center justify-center mb-5 group-hover:bg-[#4f35a1] transition-colors duration-300">
                                <BookOpen className="w-6 h-6 text-[#4f35a1] group-hover:text-white transition-colors duration-300" />
                            </div>

                            <h5 className="text-sm font-black text-gray-800 mb-2 truncate">{course.title}</h5>
                            <p className="text-[10px] leading-relaxed text-gray-500 font-medium mb-6 line-clamp-2">
                                {course.description}
                            </p>

                            <div className="flex items-center justify-between mt-auto pt-4 border-t border-gray-50">
                                <div className="flex flex-col">
                                    <span className="text-[8px] uppercase font-bold text-gray-400 mb-0.5">Instructor</span>
                                    <span className="text-[10px] font-bold text-gray-700">{course.teacher}</span>
                                </div>
                                <button className="p-2 hover:bg-[#4f35a1]/5 rounded-xl text-[#4f35a1] group-hover:bg-[#4f35a1] group-hover:text-white transition-all">
                                    <Edit2 className="w-3.5 h-3.5" />
                                </button>
                            </div>
                        </div>
                    ))
                )}
            </div>
        </div>
    );
};

export default CourseDirectory;
