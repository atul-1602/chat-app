import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { createServer } from "http";

import authRoutes from "../backend/routes/auth.routes.js";
import messageRoutes from "../backend/routes/message.routes.js";
import userRoutes from "../backend/routes/user.routes.js";

import connectToMongoDB from "../backend/db/connectToMongoDB.js";
import { initSocket } from "../backend/socket/socket.js";

dotenv.config();

const app = express();
const server = createServer(app);
const __dirname = path.resolve();
const NODE_ENV = process.env.NODE_ENV || 'production';
const FRONTEND_URL = process.env.FRONTEND_URL || 'https://vercel.app';

// Security middleware
app.use(helmet({
  contentSecurityPolicy: {
    directives: {
      defaultSrc: ["'self'"],
      styleSrc: ["'self'", "'unsafe-inline'"],
      scriptSrc: ["'self'"],
      imgSrc: ["'self'", "data:", "https:"],
    },
  },
}));

// Compression middleware
app.use(compression());

// Logging middleware
if (NODE_ENV === 'production') {
  app.use(morgan('combined'));
} else {
  app.use(morgan('dev'));
}

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.',
  standardHeaders: true,
  legacyHeaders: false,
});
app.use('/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// CORS configuration
app.use((req, res, next) => {
  const allowedOrigins = [FRONTEND_URL, 'https://vercel.app', 'https://*.vercel.app', 'http://localhost:3000'];
  const origin = req.headers.origin;
  
  if (allowedOrigins.includes(origin) || origin?.includes('vercel.app')) {
    res.header('Access-Control-Allow-Origin', origin);
  }
  
  res.header('Access-Control-Allow-Credentials', 'true');
  res.header('Access-Control-Allow-Methods', 'GET, POST, PUT, DELETE, OPTIONS');
  res.header('Access-Control-Allow-Headers', 'Origin, X-Requested-With, Content-Type, Accept, Authorization');
  
  if (req.method === 'OPTIONS') {
    res.sendStatus(200);
  } else {
    next();
  }
});

// Connect to MongoDB on first request
let isConnected = false;
app.use(async (req, res, next) => {
  if (!isConnected) {
    try {
      await connectToMongoDB();
      isConnected = true;
    } catch (error) {
      console.error('Failed to connect to MongoDB:', error);
      return res.status(500).json({ error: 'Database connection failed' });
    }
  }
  next();
});

// Initialize socket for local development
if (NODE_ENV === 'development') {
  initSocket(server);
}

// API routes
app.use("/auth", authRoutes);
app.use("/messages", messageRoutes);
app.use("/users", userRoutes);

// Error handling middleware
app.use((err, req, res, next) => {
  console.error(err.stack);
  
  if (NODE_ENV === 'production') {
    res.status(500).json({ error: 'Something went wrong!' });
  } else {
    res.status(500).json({ 
      error: 'Something went wrong!',
      message: err.message,
      stack: err.stack
    });
  }
});

// 404 handler
app.use('*', (req, res) => {
  console.log('404 handler called for:', req.url);
  res.status(404).json({ error: 'Route not found', url: req.url });
});

// Export for Vercel serverless
export default app; 