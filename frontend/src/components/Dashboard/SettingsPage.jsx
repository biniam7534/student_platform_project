import React from 'react';
import {
    User, Bell, Lock, Globe, Palette, Shield, ChevronRight, Sun, Moon, Check, Camera
} from 'lucide-react';

const SECTIONS = [
    { id: 'profile', label: 'Profile', icon: User },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'security', label: 'Security', icon: Lock },
    { id: 'language', label: 'Language & Region', icon: Globe },
    { id: 'appearance', label: 'Appearance', icon: Palette },
    { id: 'privacy', label: 'Privacy', icon: Shield },
];

const Toggle = ({ checked, onChange }) => (
    <button
        onClick={() => onChange(!checked)}
        className={`w-10 h-6 rounded-full transition-colors flex items-center px-0.5 ${checked ? 'bg-[#4f35a1]' : 'bg-gray-200'}`}
    >
        <span className={`w-5 h-5 bg-white rounded-full shadow transition-transform ${checked ? 'translate-x-4' : 'translate-x-0'}`} />
    </button>
);

const SettingsPage = () => {
    const [activeSection, setActiveSection] = React.useState('profile');
    const [savedBanner, setSavedBanner] = React.useState(false);

    // Profile state
    const [profile, setProfile] = React.useState({
        name: 'Mr. Sara', role: 'Super Admin', email: 'sara@edu-platform.com', phone: '+251911223344', bio: 'School Administrator'
    });

    // Notification state
    const [notifs, setNotifs] = React.useState({
        emailAlerts: true, smsAlerts: false, newStudent: true, paymentReceived: true, eventReminder: true, weeklyReport: false,
    });

    // Security state
    const [passwords, setPasswords] = React.useState({ current: '', newPass: '', confirm: '' });

    // Appearance state
    const [appearance, setAppearance] = React.useState({ theme: 'light', primaryColor: '#4f35a1', fontSize: 'medium' });

    // Language state
    const [lang, setLang] = React.useState({ language: 'English', timezone: 'Africa/Addis_Ababa', dateFormat: 'DD/MM/YYYY' });

    // Privacy state
    const [privacy, setPrivacy] = React.useState({ dataSharing: false, analytics: true, twoFactor: false });

    const handleSave = () => {
        setSavedBanner(true);
        setTimeout(() => setSavedBanner(false), 2500);
    };

    return (
        <div className="flex flex-wrap gap-6">
            {/* Sidebar Nav */}
            <div className="w-56 flex-shrink-0">
                <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-4 space-y-1">
                    {SECTIONS.map(s => (
                        <button
                            key={s.id}
                            onClick={() => setActiveSection(s.id)}
                            className={`w-full flex items-center gap-3 px-3 py-2.5 rounded-xl text-left transition-all ${activeSection === s.id
                                ? 'bg-[#4f35a1] text-white shadow-lg shadow-[#4f35a1]/20'
                                : 'text-gray-500 hover:bg-gray-50 hover:text-gray-800'}`}
                        >
                            <s.icon className="w-4 h-4 flex-shrink-0" />
                            <span className="text-[11px] font-black">{s.label}</span>
                            {activeSection !== s.id && <ChevronRight className="w-3 h-3 ml-auto opacity-40" />}
                        </button>
                    ))}
                </div>
            </div>

            {/* Content Panel */}
            <div className="flex-1 min-w-[280px] space-y-4">
                {/* Save banner */}
                {savedBanner && (
                    <div className="bg-green-50 border border-green-200 rounded-2xl px-5 py-3 flex items-center gap-2">
                        <Check className="w-4 h-4 text-green-500" />
                        <span className="text-xs font-black text-green-600">Changes saved successfully!</span>
                    </div>
                )}

                {/* PROFILE */}
                {activeSection === 'profile' && (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 space-y-6">
                        <h4 className="text-sm font-black text-gray-800">Profile Settings</h4>

                        {/* Avatar */}
                        <div className="flex items-center gap-5">
                            <div className="relative">
                                <div className="w-16 h-16 bg-[#4f35a1] rounded-2xl flex items-center justify-center text-white text-2xl font-black">
                                    {profile.name[0]}
                                </div>
                                <button className="absolute -bottom-1 -right-1 bg-white border-2 border-[#4f35a1] rounded-full p-1">
                                    <Camera className="w-2.5 h-2.5 text-[#4f35a1]" />
                                </button>
                            </div>
                            <div>
                                <p className="text-sm font-black text-gray-800">{profile.name}</p>
                                <p className="text-[10px] font-bold text-gray-400">{profile.role}</p>
                            </div>
                        </div>

                        <div className="grid grid-cols-2 gap-4">
                            {[
                                { label: 'Full Name', key: 'name' },
                                { label: 'Role', key: 'role' },
                                { label: 'Email Address', key: 'email' },
                                { label: 'Phone Number', key: 'phone' },
                            ].map(f => (
                                <div key={f.key}>
                                    <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{f.label}</label>
                                    <input
                                        value={profile[f.key]}
                                        onChange={e => setProfile({ ...profile, [f.key]: e.target.value })}
                                        className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                    />
                                </div>
                            ))}
                        </div>
                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">Bio</label>
                            <textarea
                                value={profile.bio}
                                onChange={e => setProfile({ ...profile, bio: e.target.value })}
                                rows={3}
                                className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30 resize-none"
                            />
                        </div>
                        <button onClick={handleSave} className="bg-[#4f35a1] text-white text-[10px] font-black px-6 py-2.5 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                            Save Profile
                        </button>
                    </div>
                )}

                {/* NOTIFICATIONS */}
                {activeSection === 'notifications' && (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 space-y-5">
                        <h4 className="text-sm font-black text-gray-800">Notification Preferences</h4>
                        {[
                            { key: 'emailAlerts', label: 'Email Alerts', desc: 'Receive notifications via email' },
                            { key: 'smsAlerts', label: 'SMS Alerts', desc: 'Receive critical alerts via SMS' },
                            { key: 'newStudent', label: 'New Student Registered', desc: 'Notify when a new student joins' },
                            { key: 'paymentReceived', label: 'Payment Received', desc: 'Notify on fee payments' },
                            { key: 'eventReminder', label: 'Event Reminders', desc: 'Get reminders 24h before events' },
                            { key: 'weeklyReport', label: 'Weekly Reports', desc: 'Receive a weekly summary email' },
                        ].map(n => (
                            <div key={n.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                <div>
                                    <p className="text-xs font-black text-gray-800">{n.label}</p>
                                    <p className="text-[10px] font-medium text-gray-400">{n.desc}</p>
                                </div>
                                <Toggle checked={notifs[n.key]} onChange={v => setNotifs({ ...notifs, [n.key]: v })} />
                            </div>
                        ))}
                        <button onClick={handleSave} className="bg-[#4f35a1] text-white text-[10px] font-black px-6 py-2.5 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                            Save Preferences
                        </button>
                    </div>
                )}

                {/* SECURITY */}
                {activeSection === 'security' && (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 space-y-5">
                        <h4 className="text-sm font-black text-gray-800">Security Settings</h4>
                        <p className="text-[10px] font-bold text-gray-400">Update your password to keep your account secure.</p>
                        {[
                            { label: 'Current Password', key: 'current' },
                            { label: 'New Password', key: 'newPass' },
                            { label: 'Confirm New Password', key: 'confirm' },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{f.label}</label>
                                <input
                                    type="password"
                                    value={passwords[f.key]}
                                    onChange={e => setPasswords({ ...passwords, [f.key]: e.target.value })}
                                    placeholder="••••••••"
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                />
                            </div>
                        ))}
                        <div className="flex items-center justify-between py-3 border-t border-gray-50">
                            <div>
                                <p className="text-xs font-black text-gray-800">Two-Factor Authentication</p>
                                <p className="text-[10px] font-medium text-gray-400">Add an extra layer of security</p>
                            </div>
                            <Toggle checked={privacy.twoFactor} onChange={v => setPrivacy({ ...privacy, twoFactor: v })} />
                        </div>
                        <button onClick={handleSave} className="bg-[#4f35a1] text-white text-[10px] font-black px-6 py-2.5 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                            Update Password
                        </button>
                    </div>
                )}

                {/* LANGUAGE */}
                {activeSection === 'language' && (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 space-y-5">
                        <h4 className="text-sm font-black text-gray-800">Language & Region</h4>
                        {[
                            { label: 'Language', key: 'language', opts: ['English', 'Amharic', 'French', 'Arabic'] },
                            { label: 'Timezone', key: 'timezone', opts: ['Africa/Addis_Ababa', 'UTC', 'America/New_York', 'Europe/London'] },
                            { label: 'Date Format', key: 'dateFormat', opts: ['DD/MM/YYYY', 'MM/DD/YYYY', 'YYYY-MM-DD'] },
                        ].map(f => (
                            <div key={f.key}>
                                <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-1.5">{f.label}</label>
                                <select
                                    value={lang[f.key]}
                                    onChange={e => setLang({ ...lang, [f.key]: e.target.value })}
                                    className="w-full px-4 py-2.5 bg-gray-50 border border-gray-100 rounded-xl text-xs font-medium text-gray-800 focus:outline-none focus:ring-2 focus:ring-[#4f35a1]/30"
                                >
                                    {f.opts.map(o => <option key={o}>{o}</option>)}
                                </select>
                            </div>
                        ))}
                        <button onClick={handleSave} className="bg-[#4f35a1] text-white text-[10px] font-black px-6 py-2.5 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                            Save Settings
                        </button>
                    </div>
                )}

                {/* APPEARANCE */}
                {activeSection === 'appearance' && (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 space-y-6">
                        <h4 className="text-sm font-black text-gray-800">Appearance</h4>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Theme Mode</label>
                            <div className="flex gap-3">
                                {[
                                    { val: 'light', icon: Sun, label: 'Light' },
                                    { val: 'dark', icon: Moon, label: 'Dark' },
                                ].map(t => (
                                    <button
                                        key={t.val}
                                        onClick={() => setAppearance({ ...appearance, theme: t.val })}
                                        className={`flex-1 flex flex-col items-center py-5 rounded-2xl border-2 transition-all ${appearance.theme === t.val
                                            ? 'border-[#4f35a1] bg-[#4f35a1]/5' : 'border-gray-100 hover:border-gray-200'}`}
                                    >
                                        <t.icon className={`w-6 h-6 mb-2 ${appearance.theme === t.val ? 'text-[#4f35a1]' : 'text-gray-400'}`} />
                                        <span className={`text-xs font-black ${appearance.theme === t.val ? 'text-[#4f35a1]' : 'text-gray-500'}`}>{t.label}</span>
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Accent Color</label>
                            <div className="flex gap-3">
                                {['#4f35a1', '#6d31ed', '#ff7aa2', '#50c4ed', '#ff9e44', '#10b981'].map(color => (
                                    <button
                                        key={color}
                                        onClick={() => setAppearance({ ...appearance, primaryColor: color })}
                                        style={{ backgroundColor: color }}
                                        className={`w-8 h-8 rounded-full flex items-center justify-center transition-transform hover:scale-110 ${appearance.primaryColor === color ? 'ring-2 ring-offset-2 ring-gray-400 scale-110' : ''}`}
                                    >
                                        {appearance.primaryColor === color && <Check className="w-3.5 h-3.5 text-white" />}
                                    </button>
                                ))}
                            </div>
                        </div>

                        <div>
                            <label className="text-[9px] font-black text-gray-400 uppercase tracking-widest block mb-3">Font Size</label>
                            <div className="flex gap-3">
                                {['small', 'medium', 'large'].map(s => (
                                    <button
                                        key={s}
                                        onClick={() => setAppearance({ ...appearance, fontSize: s })}
                                        className={`flex-1 py-2 rounded-xl border-2 text-xs font-black capitalize transition-all ${appearance.fontSize === s ? 'border-[#4f35a1] bg-[#4f35a1]/5 text-[#4f35a1]' : 'border-gray-100 text-gray-400 hover:border-gray-200'}`}
                                    >{s}</button>
                                ))}
                            </div>
                        </div>
                        <button onClick={handleSave} className="bg-[#4f35a1] text-white text-[10px] font-black px-6 py-2.5 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                            Apply Changes
                        </button>
                    </div>
                )}

                {/* PRIVACY */}
                {activeSection === 'privacy' && (
                    <div className="bg-white rounded-[24px] shadow-sm border border-gray-50 p-6 space-y-5">
                        <h4 className="text-sm font-black text-gray-800">Privacy Settings</h4>
                        {[
                            { key: 'dataSharing', label: 'Data Sharing', desc: 'Allow data to be shared with partners' },
                            { key: 'analytics', label: 'Usage Analytics', desc: 'Help improve the platform with anonymous analytics' },
                        ].map(p => (
                            <div key={p.key} className="flex items-center justify-between py-3 border-b border-gray-50 last:border-0">
                                <div>
                                    <p className="text-xs font-black text-gray-800">{p.label}</p>
                                    <p className="text-[10px] font-medium text-gray-400">{p.desc}</p>
                                </div>
                                <Toggle checked={privacy[p.key]} onChange={v => setPrivacy({ ...privacy, [p.key]: v })} />
                            </div>
                        ))}
                        <div className="bg-red-50 border border-red-100 rounded-2xl p-4 mt-2">
                            <p className="text-xs font-black text-red-500 mb-1">Danger Zone</p>
                            <p className="text-[10px] font-medium text-red-400 mb-3">These actions are irreversible. Please proceed with caution.</p>
                            <button className="text-[10px] font-black text-red-500 border border-red-200 px-4 py-2 rounded-xl hover:bg-red-100 transition-colors">
                                Delete Account
                            </button>
                        </div>
                        <button onClick={handleSave} className="bg-[#4f35a1] text-white text-[10px] font-black px-6 py-2.5 rounded-xl shadow-lg shadow-[#4f35a1]/20 hover:scale-105 transition-transform">
                            Save Settings
                        </button>
                    </div>
                )}
            </div>
        </div>
    );
};

export default SettingsPage;
