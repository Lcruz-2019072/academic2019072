import express from 'express';
import { getAllStudents, getStudentById, registerStudent, updateStudent, deleteStudent } from '../controllers/studentController';
import { authenticateToken } from '../middleware/authMiddleware';

const router = express.Router();

// Middleware para verificar permisos de profesor
router.use(authenticateToken);

// Ruta para que un profesor obtenga todos los estudiantes
router.get('/students', getAllStudents);

// Ruta para que un profesor obtenga un estudiante por su ID
router.get('/students/:id', getStudentById);

// Ruta para registrar un nuevo estudiante
router.post('/students', registerStudent);

// Ruta para actualizar un estudiante por su ID
router.put('/students/:id', updateStudent);

// Ruta para eliminar un estudiante por su ID
router.delete('/students/:id', deleteStudent);

export default router;
