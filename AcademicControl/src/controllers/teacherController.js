import Teacher from '../models/teacher';
import Student from '../models/student';

// Controlador para crear un nuevo profesor
export const createProfessor = async (req, res) => {
  try {
    const { firstName, lastName, age, email } = req.body;
    const newProfessor = new Teacher({ firstName, lastName, age, email });
    await newProfessor.save();
    res.status(201).json(newProfessor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener todos los profesores
export const getAllProfessors = async (req, res) => {
  try {
    const professors = await Teacher.find();
    res.status(200).json(professors);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para obtener un profesor por su ID
export const getProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const professor = await Teacher.findById(id);
    if (!professor) {
      return res.status(404).json({ message: 'Professor not found' });
    }
    res.status(200).json(professor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para actualizar un profesor por su ID
export const updateProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const updatedProfessor = await Teacher.findByIdAndUpdate(id, req.body, { new: true });
    if (!updatedProfessor) {
      return res.status(404).json({ message: 'Professor not found' });
    }
    res.status(200).json(updatedProfessor);
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};

// Controlador para eliminar un profesor por su ID
export const deleteProfessorById = async (req, res) => {
  try {
    const { id } = req.params;
    const deletedProfessor = await Teacher.findByIdAndDelete(id);
    if (!deletedProfessor) {
      return res.status(404).json({ message: 'Professor not found' });
    }
    res.status(200).json({ message: 'Professor deleted successfully' });
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
    const updatedTeacher = await Teacher.findByIdAndUpdate(
      teacherId,
      { $pull: { courses: courseId } },
      { new: true }
    );
    if (!updatedTeacher) {
      return res.status(500).json({ message: 'Failed to remove student from course' });
    }

    // Eliminar el curso del estudiante
    const updatedStudent = await Student.findByIdAndUpdate(
      studentId,
      { $pull: { courses: courseId } },
      { new: true }
    );
    if (!updatedStudent) {
      return res.status(500).json({ message: 'Failed to remove course from student' });
    }

    res.status(200).json({ message: 'Student removed from course successfully' });
  } catch (error) {
    res.status(500).json({ error: error.message });
  }
};
