const express = require('express');
const morgan = require('morgan');
const cors = require('cors');
const helmet = require('helmet');
const connection = require('./database/mongo');

const app = express();

// Middlewares
app.use(express.json());
app.use(express.urlencoded({ extended: false }));
app.use(morgan('dev'));
app.use(cors());
app.use(helmet());

// Rutas
app.use('/api/students', require('./routes/studentRoutes'));
app.use('/api/teachers', require('./routes/teacherRoutes'));
app.use('/api/courses', require('./routes/courseRoutes'));

module.exports = app;
