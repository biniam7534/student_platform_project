import React from 'react';
import { Search, Bell, Mail, Settings, Sun, LogOut, ChevronDown } from 'lucide-react';

const Header = () => {
    return (
        <header className="flex items-center justify-between px-8 py-4 bg-white sticky top-0 z-10">
            <div className="relative w-96">
                <span className="absolute inset-y-0 left-0 pl-4 flex items-center">
                    <Search className="h-5 w-5 text-gray-400" />
                </span>
                <input
                    type="text"
                    className="block w-full pl-12 pr-4 py-2 bg-gray-50 border-none rounded-2xl focus:ring-2 focus:ring-purple-500 text-sm"
                    placeholder="Search here..."
                />
            </div>

            <div className="flex items-center gap-6">
                <div className="flex items-center gap-4 text-gray-400">
                    <button className="relative p-2 hover:bg-gray-100 rounded-xl">
                        <Bell className="w-5 h-5" />
                        <span className="absolute top-2 right-2 w-2 h-2 bg-red-500 border-2 border-white rounded-full"></span>
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl">
                        <Mail className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl">
                        <Settings className="w-5 h-5" />
                    </button>
                    <button className="p-2 hover:bg-gray-100 rounded-xl">
                        <Sun className="w-5 h-5" />
                    </button>
                </div>

                <div className="h-8 w-px bg-gray-200 mx-2"></div>

                <div className="flex items-center gap-3">
                    <div className="text-right">
                        <p className="text-sm font-bold text-gray-800">Mr. Sara</p>
                        <p className="text-[10px] text-gray-400">Super Admin</p>
                    </div>
                    <div className="w-10 h-10 rounded-full overflow-hidden bg-purple-100 border-2 border-purple-200">
                        <img
                            src="https://images.unsplash.com/photo-1472099645785-5658abf4ff4e?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=256&h=256&q=80"
                            alt="Profile"
                            className="w-full h-full object-cover"
                        />
                    </div>
                    <ChevronDown className="w-4 h-4 text-gray-400 cursor-pointer" />
                </div>

                <div className="flex items-center gap-4 ml-4">
                    <div className="flex items-center gap-1 bg-gray-50 px-3 py-1.5 rounded-lg text-xs font-bold text-gray-700 cursor-pointer">
                        EN <ChevronDown className="w-3 h-3" />
                    </div>
                    <button
                        onClick={() => alert('Logging out...')}
                        className="p-2 bg-gray-50 text-gray-700 rounded-xl hover:bg-gray-100"
                    >
                        <LogOut className="w-5 h-5" />
                    </button>
                </div>
            </div>
        </header>
    );
};

export default Header;
