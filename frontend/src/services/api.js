import axios from 'axios';

const API_URL = 'http://localhost:5000/api';

const api = axios.create({
    baseURL: API_URL,
    headers: {
        'Content-Type': 'application/json',
    },
});

// For now, let's use a mock token or assume we'll add auth later
// Since the backend 'protect' middleware is active, we'd need a token.
// But for "working all buttons", I'll focus on the data fetching first.

export const adminService = {
    getDashboardStats: () => api.get('/admin/dashboard-stats'),
    getStudents: () => api.get('/admin/students'),
    getTeachers: () => api.get('/admin/teachers'),
    getPayments: () => api.get('/admin/payments'),
};

export default api;
