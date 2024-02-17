import Course from '../models/course';
import Teacher from '../models/teacher';
import Student from '../models/student';

// Controlador para crear un nuevo curso
export const createCourse = async (req, res) => {
  try {
    const { name, description } = req.body;
    const teacherId = req.userId; // El ID del profesor se obtiene del token de autenticación
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const newCourse = new Course({ name, description, teacher: teacherId });
    await newCourse.save();
    res.status(201).json(newCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los cursos
export const getAllCourses = async (req, res) => {
  try {
    const courses = await Course.find().populate('teacher').populate('students');
    res.status(200).json(courses);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un curso por su ID
export const getCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const course = await Course.findById(id).populate('teacher').populate('students');
    if (!course) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(course);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un curso por su ID
export const updateCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedCourse = await Course.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un curso por su ID
export const deleteCourseById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedCourse = await Course.findByIdAndDelete(id);
    if (!deletedCourse) {
      return res.status(404).json({ message: 'Course not found' });
    }
    res.status(200).json({ message: 'Course deleted successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para agregar un estudiante a un curso por su ID de estudiante y ID de curso
export const addStudentToCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    
    // Verificar si el curso existe y el profesor lo tiene
    const teacherId = req.userId;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const courseIndex = teacher.courses.indexOf(courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found or not assigned to this teacher' });
    }

    // Verificar si el estudiante existe
    const student = await Student.findById(studentId);
    if (!student) {
      return res.status(404).json({ message: 'Student not found' });
    }

    // Agregar al estudiante al curso
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $addToSet: { students: studentId } }, // Usamos $addToSet para evitar duplicados
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(500).json({ message: 'Failed to add student to course' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un estudiante de un curso por su ID de estudiante y ID de curso
export const removeStudentFromCourse = async (req, res) => {
  try {
    const { courseId, studentId } = req.params;
    
    // Verificar si el curso existe y el profesor lo tiene
    const teacherId = req.userId;
    const teacher = await Teacher.findById(teacherId);
    if (!teacher) {
      return res.status(404).json({ message: 'Teacher not found' });
    }
    const courseIndex = teacher.courses.indexOf(courseId);
    if (courseIndex === -1) {
      return res.status(404).json({ message: 'Course not found or not assigned to this teacher' });
    }

    // Eliminar al estudiante del curso
    const updatedCourse = await Course.findByIdAndUpdate(
      courseId,
      { $pull: { students: studentId } },
      { new: true }
    );
    if (!updatedCourse) {
      return res.status(500).json({ message: 'Failed to remove student from course' });
    }

    res.status(200).json(updatedCourse);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
