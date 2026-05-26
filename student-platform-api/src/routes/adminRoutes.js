import express from "express";
import {
    getDashboardStats,
    getAllStudents,
    createStudent,
    updateStudent,
    deleteStudent,
    getAllPayments
} from "../controllers/adminController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

// All routes are protected and restricted to Admin
router.get("/dashboard-stats", protect, authorize("admin"), getDashboardStats);

router.route("/students")
    .get(protect, authorize("admin", "staff"), getAllStudents)
    .post(protect, authorize("admin"), createStudent);

router.route("/students/:id")
    .put(protect, authorize("admin"), updateStudent)
    .delete(protect, authorize("admin"), deleteStudent);

router.get("/payments", protect, authorize("admin", "staff"), getAllPayments);

export default router;
