import React from 'react';
import { ChevronLeft, ChevronRight, Plus } from 'lucide-react';

const DAYS = ['Sun', 'Mon', 'Tue', 'Wed', 'Thu', 'Fri', 'Sat'];
const MONTHS = ['January', 'February', 'March', 'April', 'May', 'June',
    'July', 'August', 'September', 'October', 'November', 'December'];

const EVENT_COLORS = ['bg-[#4f35a1]', 'bg-[#ff7aa2]', 'bg-[#50c4ed]', 'bg-[#ff9e44]', 'bg-green-400'];

const SAMPLE_EVENTS = [
    { date: '2026-05-08', title: 'Student Counselling', color: 'bg-blue-500' },
    { date: '2026-05-13', title: 'Teachers Meeting', color: 'bg-pink-500' },
    { date: '2026-05-18', title: 'Sports Day', color: 'bg-orange-400' },
    { date: '2026-05-23', title: 'Open Day', color: 'bg-[#4f35a1]' },
    { date: '2026-05-28', title: 'Exam Period', color: 'bg-green-400' },
    { date: '2026-05-15', title: 'PTA Meeting', color: 'bg-[#ff7aa2]' },
];

const CalendarPage = () => {
    const today = new Date();
    const [current, setCurrent] = React.useState({ year: today.getFullYear(), month: today.getMonth() });
    const [selectedDay, setSelectedDay] = React.useState(null);

    const prevMonth = () => setCurrent(c => {
        if (c.month === 0) return { year: c.year - 1, month: 11 };
        return { ...c, month: c.month - 1 };
    });
    const nextMonth = () => setCurrent(c => {
        if (c.month === 11) return { year: c.year + 1, month: 0 };
        return { ...c, month: c.month + 1 };
    });

    const firstDay = new Date(current.year, current.month, 1).getDay();
    const daysInMonth = new Date(current.year, current.month + 1, 0).getDate();

    const dateStr = (day) => {
        const m = String(current.month + 1).padStart(2, '0');
        const d = String(day).padStart(2, '0');
        return `${current.year}-${m}-${d}`;
    };

    const eventsOn = (day) => SAMPLE_EVENTS.filter(e => e.date === dateStr(day));

    const isToday = (day) =>
        day === today.getDate() && current.month === today.getMonth() && current.year === today.getFullYear();

    const selectedEvents = selectedDay ? eventsOn(selectedDay) : [];

    // Upcoming events sorted
    const upcoming = [...SAMPLE_EVENTS].sort((a, b) => a.date.localeCompare(b.date));

    return (
        <div className="space-y-6">
            <div className="flex flex-wrap gap-6">
                {/* Main Calendar */}
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 flex-1 min-w-[320px]">
                    {/* Header */}
                    <div className="flex items-center justify-between mb-6">
                        <h4 className="text-sm font-black text-gray-800">
                            {MONTHS[current.month]} <span className="text-[#4f35a1]">{current.year}</span>
                        </h4>
                        <div className="flex items-center gap-2">
                            <button onClick={prevMonth} className="w-8 h-8 bg-gray-50 hover:bg-[#4f35a1] hover:text-white text-gray-500 rounded-xl flex items-center justify-center transition-colors">
                                <ChevronLeft className="w-4 h-4" />
                            </button>
                            <button
                                onClick={() => setCurrent({ year: today.getFullYear(), month: today.getMonth() })}
                                className="text-[10px] font-black text-[#4f35a1] bg-[#4f35a1]/5 px-3 py-1.5 rounded-lg border border-[#4f35a1]/10 hover:bg-[#4f35a1]/10 transition-colors"
                            >Today</button>
                            <button onClick={nextMonth} className="w-8 h-8 bg-gray-50 hover:bg-[#4f35a1] hover:text-white text-gray-500 rounded-xl flex items-center justify-center transition-colors">
                                <ChevronRight className="w-4 h-4" />
                            </button>
                        </div>
                    </div>

                    {/* Day Headers */}
                    <div className="grid grid-cols-7 mb-3">
                        {DAYS.map(d => (
                            <div key={d} className="text-center text-[10px] font-black text-gray-400 uppercase pb-2">{d}</div>
                        ))}
                    </div>

                    {/* Grid */}
                    <div className="grid grid-cols-7 gap-y-1">
                        {Array.from({ length: firstDay }).map((_, i) => <div key={`e-${i}`} />)}
                        {Array.from({ length: daysInMonth }, (_, i) => i + 1).map(day => {
                            const dayEvents = eventsOn(day);
                            const isSelected = selectedDay === day;
                            const today_ = isToday(day);
                            return (
                                <div
                                    key={day}
                                    onClick={() => setSelectedDay(prev => prev === day ? null : day)}
                                    className={`flex flex-col items-center pt-1 pb-2 rounded-xl cursor-pointer transition-all group ${isSelected ? 'bg-[#4f35a1]' : today_ ? 'bg-[#4f35a1]/10' : 'hover:bg-gray-50'}`}
                                >
                                    <span className={`text-xs font-black w-7 h-7 flex items-center justify-center rounded-full transition-colors
                                        ${today_ && !isSelected ? 'text-[#4f35a1]' : isSelected ? 'text-white' : 'text-gray-700 group-hover:text-[#4f35a1]'}`}
                                    >{day}</span>
                                    <div className="flex gap-0.5 mt-1 flex-wrap justify-center">
                                        {dayEvents.slice(0, 3).map((ev, i) => (
                                            <span key={i} className={`w-1.5 h-1.5 rounded-full ${isSelected ? 'bg-white/70' : ev.color}`} />
                                        ))}
                                    </div>
                                </div>
                            );
                        })}
                    </div>

                    {/* Selected day events */}
                    {selectedDay && (
                        <div className="mt-6 border-t border-gray-100 pt-5">
                            <p className="text-[10px] font-black text-gray-400 uppercase tracking-widest mb-3">
                                Events on {MONTHS[current.month]} {selectedDay}
                            </p>
                            {selectedEvents.length === 0 ? (
                                <p className="text-xs font-bold text-gray-300 text-center py-4">No events scheduled</p>
                            ) : selectedEvents.map((ev, i) => (
                                <div key={i} className="flex items-center gap-3 py-2">
                                    <span className={`w-2.5 h-2.5 rounded-full ${ev.color} flex-shrink-0`} />
                                    <span className="text-xs font-bold text-gray-700">{ev.title}</span>
                                </div>
                            ))}
                        </div>
                    )}
                </div>

                {/* Upcoming Events Sidebar */}
                <div className="w-64 flex-shrink-0 space-y-4">
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-5">
                        <div className="flex items-center justify-between mb-4">
                            <h4 className="text-sm font-black text-gray-800">Upcoming</h4>
                            <button className="flex items-center gap-1 text-[10px] font-black text-white bg-[#4f35a1] px-3 py-1.5 rounded-lg shadow shadow-[#4f35a1]/20">
                                <Plus className="w-3 h-3" /> Add
                            </button>
                        </div>
                        <div className="space-y-3">
                            {upcoming.map((ev, i) => {
                                const d = new Date(ev.date);
                                const day = d.getDate();
                                const month = MONTHS[d.getMonth()].slice(0, 3);
                                return (
                                    <div key={i} className="flex items-center gap-3 p-2.5 rounded-xl border border-gray-50 hover:border-gray-100 hover:shadow-sm transition-all">
                                        <div className={`${ev.color} w-9 h-9 flex-shrink-0 rounded-xl flex flex-col items-center justify-center`}>
                                            <span className="text-white text-[10px] font-black leading-none">{day}</span>
                                            <span className="text-white/70 text-[8px] font-bold leading-none">{month}</span>
                                        </div>
                                        <p className="text-[10px] font-bold text-gray-700 leading-tight">{ev.title}</p>
                                    </div>
                                );
                            })}
                        </div>
                    </div>

                    {/* Legend */}
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-5">
                        <h4 className="text-xs font-black text-gray-800 mb-4">Event Types</h4>
                        <div className="space-y-2.5">
                            {[
                                { label: 'Academic', color: 'bg-blue-500' },
                                { label: 'Meetings', color: 'bg-pink-500' },
                                { label: 'Sports', color: 'bg-orange-400' },
                                { label: 'Cultural', color: 'bg-[#4f35a1]' },
                                { label: 'Holiday', color: 'bg-green-400' },
                            ].map((item, i) => (
                                <div key={i} className="flex items-center gap-2.5">
                                    <span className={`w-3 h-3 rounded-full ${item.color}`} />
                                    <span className="text-[10px] font-bold text-gray-500">{item.label}</span>
                                </div>
                            ))}
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default CalendarPage;
