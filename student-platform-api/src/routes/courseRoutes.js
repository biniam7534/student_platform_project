import express from "express";
import {
    createCourse,
    getAllCourses,
    getCourseById,
    updateCourse,
    deleteCourse
} from "../controllers/courseController.js";
import { protect, authorize } from "../middleware/auth.js";

const router = express.Router();

router.route("/")
    .get(getAllCourses)
    .post(protect, authorize("admin", "teacher"), createCourse);

router.route("/:id")
    .get(getCourseById)
    .put(protect, authorize("admin", "teacher"), updateCourse)
    .delete(protect, authorize("admin", "teacher"), deleteCourse);

export default router;
