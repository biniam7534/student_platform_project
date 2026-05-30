import React from 'react';
import {
    Plus, Calendar, Clock, MapPin, Users, Tag, X, ChevronDown, Search, Edit2, Trash2, Filter
} from 'lucide-react';

const EVENT_CATEGORIES = ['Academic', 'Sports', 'Cultural', 'Meeting', 'Holiday', 'Other'];

const INITIAL_EVENTS = [
    { id: 1, title: 'Student Counselling Session', date: '2026-07-08', time: '11:00', endTime: '12:00', location: 'Room 204', participants: 'Grade 6 Students', category: 'Academic', color: 'bg-blue-500' },
    { id: 2, title: 'Teachers Staff Meeting', date: '2026-07-08', time: '16:00', endTime: '17:00', location: 'Conference Hall', participants: 'All Teachers', category: 'Meeting', color: 'bg-pink-500' },
    { id: 3, title: 'Annual Sports Day', date: '2026-07-15', time: '08:00', endTime: '17:00', location: 'School Ground', participants: 'All Students', category: 'Sports', color: 'bg-orange-400' },
    { id: 4, title: 'Parents Open Day', date: '2026-07-20', time: '09:00', endTime: '13:00', location: 'Main Hall', participants: 'Parents & Teachers', category: 'Cultural', color: 'bg-purple-500' },
];

const CATEGORY_COLORS = {
    Academic: 'bg-blue-500', Sports: 'bg-orange-400', Cultural: 'bg-purple-500',
    Meeting: 'bg-pink-500', Holiday: 'bg-green-500', Other: 'bg-gray-400',
};

const CATEGORY_PILLS = {
    Academic: 'bg-blue-50 text-blue-600', Sports: 'bg-orange-50 text-orange-500',
    Cultural: 'bg-purple-50 text-purple-600', Meeting: 'bg-pink-50 text-pink-600',
    Holiday: 'bg-green-50 text-green-600', Other: 'bg-gray-50 text-gray-500',
};

const defaultForm = { title: '', date: '', time: '', endTime: '', location: '', participants: '', category: 'Academic' };

const EventsPage = () => {
    const [events, setEvents] = React.useState(INITIAL_EVENTS);
    const [showForm, setShowForm] = React.useState(false);
    const [form, setForm] = React.useState(defaultForm);
    const [search, setSearch] = React.useState('');
    const [filterCat, setFilterCat] = React.useState('All');
    const [editId, setEditId] = React.useState(null);

    const filtered = events.filter(e => {
        const matchSearch = e.title.toLowerCase().includes(search.toLowerCase());
        const matchCat = filterCat === 'All' || e.category === filterCat;
        return matchSearch && matchCat;
    });

    const handleSubmit = (e) => {
        e.preventDefault();
        if (editId !== null) {
            setEvents(prev => prev.map(ev => ev.id === editId
                ? { ...ev, ...form, color: CATEGORY_COLORS[form.category] }
                : ev
            ));
            setEditId(null);
        } else {
            setEvents(prev => [...prev, {
                id: Date.now(), ...form, color: CATEGORY_COLORS[form.category]
            }]);
        }
        setForm(defaultForm);
        setShowForm(false);
    };

    const handleEdit = (ev) => {
        setForm({ title: ev.title, date: ev.date, time: ev.time, endTime: ev.endTime, location: ev.location, participants: ev.participants, category: ev.category });
        setEditId(ev.id);
        setShowForm(true);
    };

    const handleDelete = (id) => setEvents(prev => prev.filter(e => e.id !== id));

    return (
        <div>
            {/* Stats Row */}
            <div className="flex flex-wrap gap-4 mb-8">
                {[
                    { label: 'Total Events', value: events.length, color: 'bg-[#6d31ed]' },
                    { label: 'This Month', value: events.filter(e => e.date.startsWith('2026-07')).length, color: 'bg-[#ff7aa2]' },
                    { label: 'Upcoming', value: events.filter(e => new Date(e.date) >= new Date()).length, color: 'bg-[#50c4ed]' },
                    { label: 'Categories', value: EVENT_CATEGORIES.length, color: 'bg-[#ff9e44]' },
                ].map((s, i) => (
                    <div key={i} className="bg-white rounded-[20px] p-5 flex items-center gap-4 shadow-sm border border-gray-50 flex-1 min-w-[140px]">
                        <div className={`${s.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                            <Calendar className="w-5 h-5 text-white" />
                        </div>
                        <div>
                            <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider">{s.label}</p>
                            <p className="text-xl font-black text-gray-800">{s.value}</p>
                        </div>
                    </div>
                ))}
            </div>

            {/* Event List Card */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                {/* Toolbar */}
                <div className="flex flex-wrap items-center justify-between gap-4 mb-6">
                    <h4 className="text-sm font-black text-gray-800">All Events</h4>
                    <div className="flex flex-wrap items-center gap-3">
                        <div className="relative">
                            <Search className="w-3.5 h-3.5 absolute left-3 top-1/2 -translate-y-1/2 text-gray-400" />
                            <input
                                value={search}
                                onChange={e => setSearch(e.target.value)}
                                placeholder="Search events..."
                                className="pl-9 pr-4 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] w-44 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/20 font-medium"
                            />
                        </div>
                        <div className="relative">
                            <select
                                value={filterCat}
                                onChange={e => setFilterCat(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-2 bg-gray-50 border border-gray-100 rounded-xl text-[10px] font-bold text-gray-700 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/20"
                            >
                                <option value="All">All Categories</option>
                                {EVENT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                        <button
                            onClick={() => { setShowForm(true); setEditId(null); setForm(defaultForm); }}
                            className="flex items-center gap-2 text-[10px] font-black text-white bg-[#4f35a1] px-4 py-2 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform"
                        >
                            <Plus className="w-3 h-3" /> Create Event
                        </button>
                    </div>
                </div>

                {/* Event Table */}
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-4">Event</th>
                                <th className="pb-4">Date & Time</th>
                                <th className="pb-4">Location</th>
                                <th className="pb-4">Participants</th>
                                <th className="pb-4">Category</th>
                                <th className="pb-4 text-right">Actions</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {filtered.length === 0 ? (
                                <tr><td colSpan="6" className="py-12 text-center text-xs font-bold text-gray-300">No events found.</td></tr>
                            ) : filtered.map(ev => (
                                <tr key={ev.id} className="group hover:bg-gray-50/50 transition-colors">
                                    <td className="py-4">
                                        <div className="flex items-center gap-3">
                                            <div className={`${ev.color} w-8 h-8 rounded-xl flex items-center justify-center flex-shrink-0`}>
                                                <Calendar className="w-4 h-4 text-white" />
                                            </div>
                                            <span className="text-xs font-black text-gray-800">{ev.title}</span>
                                        </div>
                                    </td>
                                    <td className="py-4">
                                        <p className="text-xs font-bold text-gray-700">{ev.date}</p>
                                        <p className="text-[10px] text-gray-400 font-medium">{ev.time} – {ev.endTime}</p>
                                    </td>
                                    <td className="py-4 text-xs text-gray-500 font-medium">{ev.location}</td>
                                    <td className="py-4 text-xs text-gray-500 font-medium">{ev.participants}</td>
                                    <td className="py-4">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${CATEGORY_PILLS[ev.category]}`}>{ev.category}</span>
                                    </td>
                                    <td className="py-4 text-right">
                                        <div className="flex items-center justify-end gap-2 px-2">
                                            <button onClick={() => handleEdit(ev)} className="p-1.5 hover:bg-[#4f35a1]/10 rounded-lg text-[#4f35a1] transition-colors">
                                                <Edit2 className="w-3.5 h-3.5" />
                                            </button>
                                            <button onClick={() => handleDelete(ev.id)} className="p-1.5 hover:bg-red-50 rounded-lg text-red-400 transition-colors">
                                                <Trash2 className="w-3.5 h-3.5" />
                                            </button>
                                        </div>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>

            {/* Create/Edit Modal */}
            {showForm && (
                <div className="fixed inset-0 z-50 bg-black/30 backdrop-blur-sm flex items-center justify-center p-4" onClick={() => setShowForm(false)}>
                    <div className="bg-white rounded-[28px] shadow-2xl w-full max-w-lg overflow-hidden" onClick={e => e.stopPropagation()}>
                        <div className="bg-[#4f35a1] px-6 py-5 flex items-center justify-between">
                            <div>
                                <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Events</p>
                                <h3 className="text-lg font-black text-white">{editId ? 'Edit Event' : 'Create New Event'}</h3>
                            </div>
                            <button onClick={() => setShowForm(false)} className="bg-white/20 hover:bg-white/30 text-white p-2 rounded-full transition-colors">
                                <X className="w-4 h-4" />
                            </button>
                        </div>
                        <form onSubmit={handleSubmit} className="p-6 space-y-4">
                            <div>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Event Title *</label>
                                <input required value={form.title} onChange={e => setForm({ ...form, title: e.target.value })}
                                    placeholder="e.g. Annual Sports Day"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                />
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Date *</label>
                                    <input required type="date" value={form.date} onChange={e => setForm({ ...form, date: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Category</label>
                                    <select value={form.category} onChange={e => setForm({ ...form, category: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                    >
                                        {EVENT_CATEGORIES.map(c => <option key={c}>{c}</option>)}
                                    </select>
                                </div>
                            </div>
                            <div className="grid grid-cols-2 gap-4">
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Start Time</label>
                                    <input type="time" value={form.time} onChange={e => setForm({ ...form, time: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                    />
                                </div>
                                <div>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">End Time</label>
                                    <input type="time" value={form.endTime} onChange={e => setForm({ ...form, endTime: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                    />
                                </div>
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Location</label>
                                <input value={form.location} onChange={e => setForm({ ...form, location: e.target.value })}
                                    placeholder="e.g. Main Hall, Room 204"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                />
                            </div>
                            <div>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Participants</label>
                                <input value={form.participants} onChange={e => setForm({ ...form, participants: e.target.value })}
                                    placeholder="e.g. All Students, Grade 6"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                />
                            </div>
                            <div className="flex gap-3 pt-2">
                                <button type="button" onClick={() => setShowForm(false)}
                                    className="flex-1 py-2.5 border border-gray-200 text-gray-500 text-[10px] font-black rounded-xl hover:bg-gray-50 transition-colors">
                                    Cancel
                                </button>
                                <button type="submit"
                                    className="flex-1 py-2.5 bg-[#4f35a1] text-white text-[10px] font-black rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                                    {editId ? 'Save Changes' : 'Create Event'}
                                </button>
                            </div>
                        </form>
                    </div>
                </div>
            )}
        </div>
    );
};

export default EventsPage;
