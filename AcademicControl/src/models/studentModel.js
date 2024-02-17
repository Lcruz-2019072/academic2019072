import mongoose from 'mongoose';

const studentSchema = new mongoose.Schema({
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
    min: 16, // El estudiante debe tener al menos 16 años
  },
  studentId: {
    type: String,
    required: true,
    unique: true,
    match: [/^\d{8}$/, 'El carné debe tener 8 dígitos'], // El carné debe tener 8 dígitos numéricos
  },
  email: {
    type: String,
    required: true,
    unique: true,
    match: [/\S+@\S+\.\S+/, 'El correo electrónico no es válido'], // Validación básica de formato de correo electrónico
  },
  phoneNumber: {
    type: String,
    required: true,
    match: [/^\d{8}$/, 'El número de teléfono debe tener 8 dígitos'], // El número de teléfono debe tener 8 dígitos numéricos
  },
});

export default mongoose.model('Student', studentSchema);