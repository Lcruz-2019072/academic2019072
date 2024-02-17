import mongoose from 'mongoose';

const teacherSchema = new mongoose.Schema({
  firstName: {
    type: String,
    required: true,
  },
  lastName: {
    type: String,
    required: true,
  },
  age: {
    type: Number,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  courses: [{ type: mongoose.Schema.Types.ObjectId, ref: 'Course' }]
});

export default mongoose.model('Teacher', teacherSchema); 
