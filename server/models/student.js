import mongoose from "mongoose";

const studentSchema = new mongoose.Schema({
  id:{type: Number},
  fullName: { type: String, required: [true, 'fullName cannot be empty'] },
  email: { type: String, required: [true, 'email cannot be empty'] },
  mobile: { type: String, required: [true, 'mobile cannot be empty'] },
  reg: {type: "String"}
},
  {
    timestamps: true
  }
)

studentSchema.pre('save', async function(){
  this.reg = Math.floor(Math.random() * 10000);
})

studentSchema.post('save', function(doc) {
  console.log(`${doc.email} is saved`);
});

const Student = mongoose.model('Student', studentSchema);



export default Student;