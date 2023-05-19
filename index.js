import express from "express";
import mongoose from 'mongoose';
import dotennv from 'dotenv';

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

app.listen(PORT, () => {
    console.log(`Server listening on port ${PORT} 🚀`);
});