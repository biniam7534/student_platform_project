import React from 'react';
import {
    LayoutDashboard,
    Users,
    UserSquare2,
    CalendarDays,
    Wallet,
    Calendar,
    Settings,
    HelpCircle,
    Menu,
    BookOpen
} from 'lucide-react';

const Sidebar = () => {
    const [activeItem, setActiveItem] = React.useState('Dashboard');

    const menuItems = [
        { icon: LayoutDashboard, label: 'Dashboard' },
        { icon: Users, label: 'Students' },
        { icon: UserSquare2, label: 'Teachers' },
        { icon: BookOpen, label: 'Courses' },
        { icon: CalendarDays, label: 'Events' },
        { icon: Wallet, label: 'Finance' },
        { icon: Calendar, label: 'Calendar' },
        { icon: Settings, label: 'Setting' },
    ];

    return (
        <aside className="w-64 bg-[#4f35a1] text-white min-h-screen flex flex-col p-6 fixed h-full">
            <div className="flex items-center gap-3 mb-12">
                <div className="bg-white p-2 rounded-xl">
                    <img src="https://img.icons8.com/fluency/48/graduation-cap.png" alt="Logo" className="w-8 h-8" />
                </div>
                <div>
                    <h1 className="text-xl font-bold leading-tight">Edu-Platform</h1>
                    <p className="text-[10px] opacity-70">School Dashboard</p>
                </div>
                <Menu className="ml-auto w-5 h-5 opacity-70 cursor-pointer" />
            </div>

            <div className="flex-1">
                <p className="text-[10px] uppercase opacity-50 font-bold mb-4 tracking-wider">Main Menu</p>
                <nav className="space-y-2">
                    {menuItems.map((item) => (
                        <button
                            key={item.label}
                            onClick={() => setActiveItem(item.label)}
                            className={`w-full flex items-center gap-4 px-4 py-3 rounded-xl transition-all ${activeItem === item.label
                                ? 'bg-white text-[#4f35a1] font-semibold shadow-lg'
                                : 'hover:bg-white/10 text-white/70'
                                }`}
                        >
                            <item.icon className={`w-5 h-5 ${activeItem === item.label ? 'text-[#4f35a1]' : 'text-white/70'}`} />
                            <span className="text-sm">{item.label}</span>
                        </button>
                    ))}
                </nav>
            </div>

            <div className="mt-auto pt-6">
                <div className="bg-white/10 rounded-2xl p-4 text-center relative mb-8">
                    <div className="absolute -top-5 left-1/2 -translate-x-1/2 bg-[#4f35a1] p-1 rounded-full border-2 border-white/20">
                        <div className="bg-white p-2 rounded-full">
                            <HelpCircle className="w-4 h-4 text-[#4f35a1]" />
                        </div>
                    </div>
                    <p className="text-[10px] text-white/70 mt-4 mb-3">Need Help with Edu Care?</p>
                    <button className="bg-white text-[#4f35a1] text-[10px] font-bold py-2 px-4 rounded-lg w-full">
                        Go to help center
                    </button>
                </div>

                <div className="text-[10px] text-white/40 text-center">
                    <p>©2021 All Rights Reserved</p>
                    <p>Made by Sara Smart</p>
                </div>
            </div>
        </aside>
    );
};

export default Sidebar;
