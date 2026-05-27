import User from "../model/usermodel.js";
import Attendance from "../model/attendancemodel.js";
import Payment from "../model/paymentmodel.js";
import Schedule from "../model/schedulemodel.js";

// @desc    Get dashboard statistics
// @route   GET /api/admin/dashboard-stats
// @access  Private (Admin)
export const getDashboardStats = async (req, res) => {
    try {
        const totalStudents = await User.countDocuments({ role: "student" });
        const totalTeachers = await User.countDocuments({ role: "teacher" });
        const totalStaff = await User.countDocuments({ role: "staff" }); // Added staff role support in mind

        // This month events
        const startOfMonth = new Date(new Date().getFullYear(), new Date().getMonth(), 1);
        const totalEvents = await Schedule.countDocuments({ startTime: { $gte: startOfMonth } });

        // Attendance Summary (Mocking summary for now as we'd need more logic for full stats)
        const attendanceSummary = [
            { title: 'Student Attendance', present: 4752, absent: 437, color: '#ff9e44' },
            { title: 'Teachers Attendance', present: 132, absent: 4, color: '#ff7aa2' },
            { title: 'Staff Attendance', present: 32, absent: 6, color: '#50c4ed' },
        ];

        res.status(200).json({
            success: true,
            data: {
                totalStudents,
                totalTeachers,
                totalStaff,
                totalEvents,
                attendanceSummary
            }
        });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all students
// @route   GET /api/admin/students
// @access  Private (Admin)
export const getAllStudents = async (req, res) => {
    try {
        const students = await User.find({ role: "student" }).select("-password");
        res.status(200).json({ success: true, count: students.length, data: students });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all teachers
// @route   GET /api/admin/teachers
// @access  Public (for now)
export const getAllTeachers = async (req, res) => {
    try {
        const teachers = await User.find({ role: "teacher" }).select("-password");
        res.status(200).json({ success: true, count: teachers.length, data: teachers });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Create a student
// @route   POST /api/admin/students
// @access  Private (Admin)
export const createStudent = async (req, res) => {
    try {
        const student = await User.create({
            ...req.body,
            role: "student"
        });
        res.status(201).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Update a student
// @route   PUT /api/admin/students/:id
// @access  Private (Admin)
export const updateStudent = async (req, res) => {
    try {
        const student = await User.findByIdAndUpdate(req.params.id, req.body, {
            new: true,
            runValidators: true
        });
        if (!student) return res.status(404).json({ success: false, message: "Student not found" });
        res.status(200).json({ success: true, data: student });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Delete a student
// @route   DELETE /api/admin/students/:id
// @access  Private (Admin)
export const deleteStudent = async (req, res) => {
    try {
        await User.findByIdAndDelete(req.params.id);
        res.status(200).json({ success: true, data: {} });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};

// @desc    Get all payments/fees
// @route   GET /api/admin/payments
// @access  Private (Admin)
export const getAllPayments = async (req, res) => {
    try {
        const payments = await Payment.find().populate("studentId", "username email");
        res.status(200).json({ success: true, data: payments });
    } catch (error) {
        res.status(500).json({ success: false, message: error.message });
    }
};
