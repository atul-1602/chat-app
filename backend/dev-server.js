import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import http from 'http';

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";

dotenv.config();

const app = express();
const server = http.createServer(app);
const __dirname = path.resolve();
const PORT = process.env.PORT || 5000;
const NODE_ENV = process.env.NODE_ENV || 'development';
const FRONTEND_URL = process.env.FRONTEND_URL || 'http://localhost:3000';

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
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// CORS configuration
app.use((req, res, next) => {
	const allowedOrigins = [FRONTEND_URL, 'https://vercel.app', 'https://*.vercel.app'];
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

// Test endpoint for debugging
app.get('/api/test', (req, res) => {
	res.status(200).json({ 
		message: 'API is working!',
		timestamp: new Date().toISOString(),
		environment: NODE_ENV
	});
});

// Health check endpoint
app.get('/api/health', (req, res) => {
	res.status(200).json({ 
		status: 'OK', 
		timestamp: new Date().toISOString(),
		environment: NODE_ENV,
		uptime: process.uptime()
	});
});

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files in development
app.use(express.static(path.join(__dirname, "/frontend/dist")));
app.get("*", (req, res) => {
	res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
});

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
	res.status(404).json({ error: 'Route not found' });
});

server.listen(PORT, () => {
	connectToMongoDB();
	console.log(`🚀 Development Server Running on port ${PORT} in ${NODE_ENV} mode`);
	console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
});

export default app; 