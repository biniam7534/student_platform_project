import React from 'react';
import { TrendingUp, TrendingDown, DollarSign, ChevronDown, Download } from 'lucide-react';
import {
    BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, Cell,
    LineChart, Line, Legend
} from 'recharts';

const monthlyData = [
    { month: 'Jan', collected: 42000, pending: 8000 },
    { month: 'Feb', collected: 53000, pending: 6000 },
    { month: 'Mar', collected: 48000, pending: 11000 },
    { month: 'Apr', collected: 61000, pending: 5000 },
    { month: 'May', collected: 55000, pending: 9000 },
    { month: 'Jun', collected: 67000, pending: 4000 },
    { month: 'Jul', collected: 72000, pending: 7000, highlighted: true },
    { month: 'Aug', collected: 58000, pending: 12000 },
];

const transactions = [
    { id: 1, name: 'Abebe Kebede', grade: 'Grade 6', amount: 4500, status: 'Paid', date: '2026-07-01', type: 'Tuition' },
    { id: 2, name: 'Sara Haile', grade: 'Grade 8', amount: 5200, status: 'Paid', date: '2026-07-02', type: 'Tuition' },
    { id: 3, name: 'Daniel Tesfaye', grade: 'Grade 5', amount: 4000, status: 'Pending', date: '2026-07-03', type: 'Tuition' },
    { id: 4, name: 'Mekdes Alemu', grade: 'Grade 7', amount: 4800, status: 'Paid', date: '2026-07-04', type: 'Library Fee' },
    { id: 5, name: 'Yonas Bekele', grade: 'Grade 9', amount: 6000, status: 'Overdue', date: '2026-06-15', type: 'Tuition' },
    { id: 6, name: 'Hana Girma', grade: 'Grade 6', amount: 4500, status: 'Paid', date: '2026-07-05', type: 'Exam Fee' },
];

const STATUS_STYLE = {
    Paid: 'bg-green-100 text-green-600',
    Pending: 'bg-yellow-100 text-yellow-600',
    Overdue: 'bg-red-100 text-red-500',
};

const FinancePage = () => {
    const [period, setPeriod] = React.useState('This Month');

    const totalCollected = transactions.filter(t => t.status === 'Paid').reduce((s, t) => s + t.amount, 0);
    const totalPending = transactions.filter(t => t.status !== 'Paid').reduce((s, t) => s + t.amount, 0);
    const collectionRate = Math.round((totalCollected / (totalCollected + totalPending)) * 100);

    return (
        <div className="space-y-6">
            {/* KPI Cards */}
            <div className="flex flex-wrap gap-4">
                {[
                    { label: 'Total Collected', value: `ETB ${(totalCollected).toLocaleString()}`, icon: TrendingUp, color: 'bg-[#6d31ed]', sub: '+12% vs last month', up: true },
                    { label: 'Pending Fees', value: `ETB ${totalPending.toLocaleString()}`, icon: TrendingDown, color: 'bg-[#ff7aa2]', sub: '3 students overdue', up: false },
                    { label: 'Collection Rate', value: `${collectionRate}%`, icon: DollarSign, color: 'bg-[#50c4ed]', sub: 'Goal: 95%', up: true },
                    { label: 'Total Students', value: transactions.length, icon: DollarSign, color: 'bg-[#ff9e44]', sub: 'Active fee payers', up: true },
                ].map((kpi, i) => (
                    <div key={i} className="bg-white rounded-[20px] p-5 shadow-sm border border-gray-50 flex-1 min-w-[160px]">
                        <div className="flex items-start justify-between mb-4">
                            <div className={`${kpi.color} w-10 h-10 rounded-xl flex items-center justify-center`}>
                                <kpi.icon className="w-5 h-5 text-white" />
                            </div>
                            <span className={`text-[9px] font-black px-2 py-1 rounded-full ${kpi.up ? 'bg-green-50 text-green-500' : 'bg-red-50 text-red-400'}`}>
                                {kpi.sub}
                            </span>
                        </div>
                        <p className="text-[10px] font-bold text-gray-400 uppercase tracking-wider mb-1">{kpi.label}</p>
                        <p className="text-xl font-black text-gray-800">{kpi.value}</p>
                    </div>
                ))}
            </div>

            {/* Bar Chart */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                <div className="flex items-center justify-between mb-6">
                    <div>
                        <h4 className="text-sm font-black text-gray-800">Fees Collection Overview</h4>
                        <p className="text-[10px] font-bold text-gray-400 mt-0.5">Monthly breakdown — collected vs pending</p>
                    </div>
                    <div className="flex items-center gap-4">
                        <div className="flex items-center gap-4">
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                <span className="w-2.5 h-2.5 rounded-sm bg-[#4f35a1] inline-block" /> Collected
                            </span>
                            <span className="flex items-center gap-1.5 text-[10px] font-bold text-gray-400">
                                <span className="w-2.5 h-2.5 rounded-sm bg-purple-100 inline-block" /> Pending
                            </span>
                        </div>
                        <div className="relative">
                            <select value={period} onChange={e => setPeriod(e.target.value)}
                                className="appearance-none pl-3 pr-8 py-1.5 bg-gray-50 border border-gray-100 rounded-lg text-[10px] font-bold text-gray-700 focus:outline-none">
                                {['This Month', 'Last 3 Months', 'This Year'].map(p => <option key={p}>{p}</option>)}
                            </select>
                            <ChevronDown className="w-3 h-3 absolute right-2 top-1/2 -translate-y-1/2 text-gray-400 pointer-events-none" />
                        </div>
                    </div>
                </div>
                <div className="h-64">
                    <ResponsiveContainer width="100%" height="100%">
                        <BarChart data={monthlyData} margin={{ top: 5, right: 0, left: -20, bottom: 0 }}>
                            <CartesianGrid vertical={false} stroke="#f1f1f1" />
                            <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} />
                            <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 10, fontWeight: 700, fill: '#9ca3af' }} tickFormatter={v => `${v / 1000}k`} />
                            <Tooltip
                                formatter={v => `ETB ${v.toLocaleString()}`}
                                contentStyle={{ borderRadius: '12px', border: 'none', boxShadow: '0 10px 25px rgba(0,0,0,0.1)', fontSize: 11 }}
                            />
                            <Bar dataKey="collected" radius={[8, 8, 0, 0]} barSize={32}>
                                {monthlyData.map((e, i) => <Cell key={i} fill={e.highlighted ? '#6d31ed' : '#8e6ef5'} />)}
                            </Bar>
                            <Bar dataKey="pending" fill="#f3f1ff" radius={[8, 8, 0, 0]} barSize={32} />
                        </BarChart>
                    </ResponsiveContainer>
                </div>
            </div>

            {/* Transactions Table */}
            <div className="bg-white p-6 rounded-[24px] shadow-sm border border-gray-50">
                <div className="flex items-center justify-between mb-6">
                    <h4 className="text-sm font-black text-gray-800">Recent Transactions</h4>
                    <button className="flex items-center gap-2 text-[10px] font-black text-[#4f35a1] bg-[#4f35a1]/5 px-3 py-2 rounded-xl border border-[#4f35a1]/10 hover:bg-[#4f35a1]/10 transition-colors">
                        <Download className="w-3 h-3" /> Export
                    </button>
                </div>
                <div className="overflow-x-auto">
                    <table className="w-full text-left">
                        <thead>
                            <tr className="text-[10px] text-gray-400 font-bold uppercase tracking-wider border-b border-gray-100">
                                <th className="pb-4">Student</th>
                                <th className="pb-4">Grade</th>
                                <th className="pb-4">Fee Type</th>
                                <th className="pb-4">Date</th>
                                <th className="pb-4">Amount</th>
                                <th className="pb-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-gray-50">
                            {transactions.map(t => (
                                <tr key={t.id} className="hover:bg-gray-50/50 transition-colors">
                                    <td className="py-3 text-xs font-black text-gray-800">{t.name}</td>
                                    <td className="py-3 text-xs text-gray-500 font-medium">{t.grade}</td>
                                    <td className="py-3 text-xs text-gray-500 font-medium">{t.type}</td>
                                    <td className="py-3 text-xs text-gray-500 font-medium">{t.date}</td>
                                    <td className="py-3 text-xs font-black text-gray-800">ETB {t.amount.toLocaleString()}</td>
                                    <td className="py-3">
                                        <span className={`px-3 py-1 rounded-full text-[10px] font-bold ${STATUS_STYLE[t.status]}`}>{t.status}</span>
                                    </td>
                                </tr>
                            ))}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
};

export default FinancePage;
