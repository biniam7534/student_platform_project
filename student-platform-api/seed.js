import mongoose from "mongoose";
import dotenv from "dotenv";
import User from "./src/model/usermodel.js";
import Course from "./src/model/coursemodel.js";
import Schedule from "./src/model/schedulemodel.js";
import Payment from "./src/model/paymentmodel.js";

dotenv.config();

const seedData = async () => {
    try {
        await mongoose.connect(process.env.MONGO_URI);
        console.log("Connected to MongoDB for seeding...");

        // Clear existing data
        await User.deleteMany({ role: { $ne: 'admin' } });
        await Course.deleteMany({});
        await Schedule.deleteMany({});
        await Payment.deleteMany({});

        // Create a teacher
        const teacher = await User.create({
            username: "teacher1",
            email: "teacher1@edu.com",
            password: "password123",
            role: "teacher"
        });

        // Create courses
        const courses = await Course.insertMany([
            { title: "Mathematics", description: "Advanced Algebra", teacherId: teacher._id },
            { title: "Physics", description: "Quantum Mechanics", teacherId: teacher._id }
        ]);

        // Create students
        const students = await User.insertMany([
            {
                username: "selvaraj",
                email: "selva@edu.com",
                role: "student",
                parents: "Muthu Kumar",
                phone: "9600778090",
                className: "7th",
                grade: "A+",
                status: "Paid",
                image: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
            },
            {
                username: "malar",
                email: "malar@edu.com",
                role: "student",
                parents: "Muthu Kumar",
                phone: "7550364512",
                className: "10th",
                grade: "B+",
                status: "Unpaid",
                image: 'https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-1.2.1&auto=format&fit=facearea&facepad=2&w=100&h=100&q=80'
            }
        ]);

        // Create payments
        await Payment.insertMany([
            { studentId: students[0]._id, amount: 500, status: "paid", type: "Tuition" },
            { studentId: students[1]._id, amount: 500, status: "unpaid", type: "Tuition" }
        ]);

        // Create schedules
        await Schedule.insertMany([
            { courseId: courses[0]._id, type: "class", startTime: new Date(), endTime: new Date(Date.now() + 3600000), location: "Room 101" },
            { courseId: courses[1]._id, type: "class", startTime: new Date(Date.now() + 86400000), endTime: new Date(Date.now() + 90000000), location: "Room 102" }
        ]);

        console.log("Data seeded successfully!");
        process.exit();
    } catch (error) {
        console.error("Error seeding data:", error);
        process.exit(1);
    }
};

seedData();
