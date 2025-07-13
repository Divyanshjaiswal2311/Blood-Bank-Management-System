/**
 * Blood Bank Management System - Server Entry Point
 * 
 * This file sets up the Express server, connects to MongoDB,
 * configures middleware, and defines API routes for the application.
 * 
 * The server handles authentication, inventory management, analytics,
 * and administrative operations for the blood bank system.
 */

// Import external dependencies
const express = require("express");  // Web framework
const dotenv = require("dotenv");    // Environment variable management
const colors = require("colors");    // Console text styling
const morgan = require("morgan");    // HTTP request logger
const cors = require("cors");        // Cross-Origin Resource Sharing

// Import local modules
const connectDB = require("./config/db");  // Database connection function

// Load environment variables from .env file
dotenv.config();

// Initialize MongoDB connection
connectDB();

// Create Express application instance
const app = express();

// Configure middleware
app.use(express.json());             // Parse JSON request bodies
app.use(morgan("dev"));             // Log HTTP requests in development mode

// Configure CORS to specifically allow requests from client application
const allowedOrigins = [
  "http://localhost:3000", 
  "http://localhost:5001", 
  "http://127.0.0.1:3000", 
  "http://127.0.0.1:5001",
  process.env.FRONTEND_URL // Add production frontend URL
].filter(Boolean); // Remove undefined values

app.use(cors({
  origin: function (origin, callback) {
    // Allow requests with no origin (like mobile apps or curl requests)
    if (!origin) return callback(null, true);
    
    if (allowedOrigins.indexOf(origin) !== -1) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  methods: ["GET", "POST", "PUT", "DELETE"],
  allowedHeaders: ["Content-Type", "Authorization"],
  credentials: true
}));

// Log all incoming requests
app.use((req, res, next) => {
  console.log(`${req.method} ${req.url} - ${new Date().toISOString()}`);
  next();
});

// Define API routes
// Test route for checking API connectivity
app.use("/api/v1/test", require("./routes/testRoutes"));
// Authentication routes (login, register, etc.)
app.use("/api/v1/auth", require("./routes/authRoutes"));
// Blood inventory management routes
app.use("/api/v1/inventory", require("./routes/inventoryRoutes"));
// Data analytics and reporting routes
app.use("/api/v1/analytics", require("./routes/analyticsRoutes"));
// Admin-specific routes for system management
app.use("/api/v1/admin", require("./routes/adminRoutes"));

// Add a basic health check route
app.get("/health", (req, res) => {
  res.status(200).json({
    status: "OK",
    message: "Server is running",
    timestamp: new Date().toISOString(),
  });
});

// Set server port from environment variables or use default
const PORT = process.env.PORT || 8080;

// Start the server and listen on configured port
app.listen(PORT, () => {
  console.log(
    `Node Server Running In ${process.env.DEV_MODE} Mode On Port ${process.env.PORT}`
      .bgBlue.white
  );
  console.log(`Server URL: http://localhost:${PORT}`);
});
