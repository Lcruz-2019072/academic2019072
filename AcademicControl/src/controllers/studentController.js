import Student from '../models/student';
import Teacher from '../models/teacher';

// Controlador para registrar un nuevo estudiante
export const registerStudent = async (req, res) => {
  try {
    // Verificar el rol del usuario que hace la solicitud
    const teacher = await Teacher.findById(req.userId);
    if (!teacher) {
      return res.status(403).json({ message: 'Permission denied. Only teachers can register students' });
    }

    const { firstName, lastName, age, studentId, email, phoneNumber, courses } = req.body;

    // Verificar si el estudiante ya está registrado
    const existingStudent = await Student.findOne({ studentId });
    if (existingStudent) {
      return res.status(400).json({ message: 'Student with the same studentId already exists' });
    }

    // Verificar si el estudiante ya está asignado a 3 cursos
    if (courses && courses.length >= 3) {
      return res.status(400).json({ message: 'Student can only be assigned to a maximum of 3 courses' });
    }

    // Crear un nuevo estudiante
    const newStudent = new Student({ firstName, lastName, age, studentId, email, phoneNumber, courses });
    
    // Guardar el nuevo estudiante en la base de datos
    await newStudent.save();

    // Respuesta exitosa
    res.status(201).json({ message: 'Student registered successfully', student: newStudent });
  } catch (error) {
    // Manejo de errores
    res.status(500).json({ error: error.message });
  }
};
