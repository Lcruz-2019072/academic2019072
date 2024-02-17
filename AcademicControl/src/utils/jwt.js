import jwt from 'jsonwebtoken';

// Middleware para proteger rutas
export const protect = (req, res, next) => {
  // Verificar si el token está presente en los headers de la solicitud
  const token = req.headers.authorization;

  if (!token) {
    return res.status(401).json({ message: 'No token provided, authorization denied' });
  }

  try {
    // Verificar el token
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    req.userId = decoded.id; // Agregar el ID del usuario decodificado a la solicitud
    next();
  } catch (error) {
    return res.status(401).json({ message: 'Invalid token' });
  }
};
