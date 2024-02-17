import express from 'express';
import { protect } from '../utils/validator.js';
import {
  createCourse,
  getAllCourses,
  getCourseById,
  updateCourseById,
  deleteCourseById,
  addStudentToCourse,
  removeStudentFromCourse
} from '../controllers/courseController';

const router = express.Router();

// Proteger todas las rutas de los cursos
router.use(protect);

// Rutas para CRUD de cursos
router.post('/', createCourse); // Crear un nuevo curso
router.get('/', getAllCourses); // Obtener todos los cursos
router.get('/:id', getCourseById); // Obtener un curso por su ID
router.put('/:id', updateCourseById); // Actualizar un curso por su ID
router.delete('/:id', deleteCourseById); // Eliminar un curso por su ID

// Rutas para añadir y eliminar estudiantes de un curso
router.put('/:courseId/add-student/:studentId', addStudentToCourse); // Añadir un estudiante a un curso
router.put('/:courseId/remove-student/:studentId', removeStudentFromCourse); // Eliminar un estudiante de un curso

export default router;
