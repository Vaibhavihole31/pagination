import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id:{type: Number},
  fullName: { type: String, required: [true, 'fullName cannot be empty'] },
  email: { type: String, required: [true, 'email cannot be empty'] },
  mobile: { type: String, required: [true, 'mobile cannot be empty'] },
},
  {
    timestamps: true
  }
)

const Student = mongoose.model('Student', studentSchema);
export default Student;