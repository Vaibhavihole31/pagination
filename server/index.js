import express from "express";
import mongoose from 'mongoose';
import dotennv from 'dotenv';
import path from 'path';
const __dirname = path.resolve();

import Student from './models/student.js'

dotennv.config();
const app = express();
app.use(express.json());

const PORT = process.env.PORT || 5000;

try {
    mongoose.connect(process.env.MONGO_DB_URL, { useNewUrlParser: true, useUnifiedTopology: true }, () => {
        console.log('Connected to DB 📦');
    });
} catch (err) {
    console.log(`❌ Error:  ${err?.message}`);
}

app.get('/health', (req, res) => {
    res.status(200).json({ status: 'OK' });
})

app.post('/student', async (req, res) => {
    const { fullName, email, mobile } = req.body;

    const newStudent = new Student({
        id: await Student.countDocuments() + 1,
        fullName,
        email,
        mobile
    })

    const savedStudent = await newStudent.save();

    res.json({
        status: "success",
        message: 'Student Saved Successfully',
        data: savedStudent
    })
})

app.get('/student', async (req, res) => {
    const LIMIT = req.query.limit || 10;
    const CUURENTPAGE = req.query.page || 1;
    const totalRecords = await Student.countDocuments();
    const totalPages = Math.ceil(totalRecords / LIMIT);
   
    const students = await Student.find().skip((CUURENTPAGE-1)*LIMIT).limit(LIMIT);

    res.json({
        success: true,
        message: "Students fetched successfully",
        totalPages,
        limit: LIMIT,
        cuurentPage: CUURENTPAGE,
        data: students
    })
})

if (process.env.NODE_ENV === 'production') {
    app.use(express.static(path.join(__dirname, '..', 'client', 'build')));
  
    app.get('*', (req, res) => {
      res.sendFile(path.join(__dirname, '..', 'client', 'build', 'index.html'))
    });
  }

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} 🚀`);
});