import express from 'express';
import { getAllProfessors, getProfessorById } from '../controllers/teacherController';
import { checkTeacherPermission } from './authMiddleware'; // Importa el middleware desde el archivo authMiddleware.js

const router = express.Router();

// Middleware para verificar permisos de profesor
router.use(checkTeacherPermission);

// Ruta para obtener todos los profesores
router.get('/professors', getAllProfessors);

// Ruta para obtener un profesor por su ID
router.get('/professors/:id', getProfessorById);

export default router;
