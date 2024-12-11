// const express = require('express');
// const cors = require('cors');
// const bodyParser = require('body-parser');
// require('dotenv').config();

// // Route Imports
// const authRoutes = require('./routes/auth');
// const quizRoutes = require('./routes/quiz');
// const dashboardRoutes = require('./routes/dashboard');
// const adminRoutes = require('./routes/admin');

// // Database Connection
// const connectDB = require('./config/db');

// // Create Express app
// const app = express();

// // Middleware

// app.use(cors({
//   origin: 'https://survey-app-nous.vercel.pp/', // Replace with your actual frontend domain
//   methods: ['GET', 'POST', 'PUT', 'DELETE'],
//   credentials: true,
// }));
// app.use(bodyParser.json()); // Parse JSON request bodies

// // Connect to Database
// connectDB();

// // Health Check Route
// app.get('/health', (req, res) => {
//   res.status(200).json({ message: 'Server is running and healthy!' });
// });

// // Routes
// app.use('/api/auth', authRoutes); // Authentication routes
// app.use('/api/quiz', quizRoutes); // Quiz-related routes
// app.use('/api/dashboard', dashboardRoutes); // Dashboard-related routes
// app.use('/api/admin', adminRoutes); // Admin routes

// // Catch Unhandled Routes
// app.use((req, res, next) => {
//   res.status(404).json({ error: 'Route not found' });
// });

// // Global Error Handling Middleware
// app.use((err, req, res, next) => {
//   console.error(err.stack);
//   res.status(err.status || 500).json({ error: err.message || 'Internal Server Error' });
// });

// module.exports = app;

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

// CORS Configuration
const allowedOrigins = ['https://survey-app-nous.vercel.app'];  // Frontend domain(s)
const corsOptions = {
  origin: function (origin, callback) {
    // Allow requests with no origin (mobile apps, curl requests, etc.)
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ['GET', 'POST', 'PUT', 'DELETE', 'OPTIONS'],  // Allowed methods
  allowedHeaders: ['Content-Type', 'Authorization'],     // Allowed headers
  credentials: true,  // Allow cookies and authorization headers
};

// Middleware
app.use(cors(corsOptions)); // Enable CORS with custom options
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
