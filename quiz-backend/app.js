const express = require('express');
const cors = require('cors');
const bodyParser = require('body-parser');
require('dotenv').config();

// Route Imports
const authRoutes = require('./routes/auth');
const quizRoutes = require('./routes/quiz');
const dashboardRoutes = require('./routes/dashboard');
const adminRoutes = require('./routes/admin');

// Database Connection
const connectDB = require('./config/db');

// Create Express app
const app = express();

// Middleware
app.use(cors()); // Enable CORS for cross-origin requests
app.use(bodyParser.json()); // Parse JSON request bodies

// Connect to Database
connectDB();

// Health Check Route
app.get('/health', (req, res) => {
  res.status(200).json({ message: 'Server is running and healthy!' });
});

// Routes
app.use('/api/auth', authRoutes); // Authentication routes
app.use('/api/quiz', quizRoutes); // Quiz-related routes
app.use('/api/dashboard', dashboardRoutes); // Dashboard-related routes
app.use('/api/admin', adminRoutes); // Admin routes

// Catch Unhandled Routes
app.use((req, res, next) => {
  res.status(404).json({ error: 'Route not found' });
});

// Global Error Handling Middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
});

module.exports = app;
