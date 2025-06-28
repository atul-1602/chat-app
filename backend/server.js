import path from "path";
import express from "express";
import dotenv from "dotenv";
import cookieParser from "cookie-parser";
import helmet from "helmet";
import compression from "compression";
import rateLimit from "express-rate-limit";
import morgan from "morgan";
import { createServer } from "http";

import authRoutes from "./routes/auth.routes.js";
import messageRoutes from "./routes/message.routes.js";
import userRoutes from "./routes/user.routes.js";

import connectToMongoDB from "./db/connectToMongoDB.js";
import { initSocket } from "./socket/socket.js";

dotenv.config();

const app = express();
const server = createServer(app);
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

// Rate limiting - More lenient for development
const limiter = rateLimit({
	windowMs: 1 * 60 * 1000, // 1 minute
	max: NODE_ENV === 'development' ? 1000 : 100, // More requests allowed in development
	message: 'Too many requests from this IP, please try again later.',
	standardHeaders: true,
	legacyHeaders: false,
	skip: (req) => {
		// Skip rate limiting for socket connections
		return req.path.includes('/socket.io/');
	}
});
app.use('/api/', limiter);

// Body parsing middleware
app.use(express.json({ limit: '50mb' }));
app.use(cookieParser());

// CORS configuration - More permissive for development
app.use((req, res, next) => {
	const allowedOrigins = [
		FRONTEND_URL, 
		'http://localhost:3000',
		'http://localhost:3001', 
		'http://localhost:3002',
		'https://vercel.app', 
		'https://*.vercel.app'
	];
	const origin = req.headers.origin;
	
	if (allowedOrigins.includes(origin) || origin?.includes('vercel.app') || origin?.includes('localhost')) {
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

// API routes
app.use("/api/auth", authRoutes);
app.use("/api/messages", messageRoutes);
app.use("/api/users", userRoutes);

// Serve static files in production (for Vercel)
if (NODE_ENV === 'production') {
	// For Vercel, static files are served by the platform
	// This is handled by vercel.json routing
} else {
	// Local development
	app.use(express.static(path.join(__dirname, "/frontend/dist")));
	app.get("*", (req, res) => {
		res.sendFile(path.join(__dirname, "frontend", "dist", "index.html"));
	});
}

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

// Only start server if not in Vercel environment
if (process.env.VERCEL !== '1') {
	server.listen(PORT, () => {
		connectToMongoDB();
		initSocket(server);
		console.log(`🚀 Server Running on port ${PORT} in ${NODE_ENV} mode`);
		console.log(`📱 Frontend URL: ${FRONTEND_URL}`);
		console.log(`🔌 Socket.io initialized`);
	});
}

// Export for Vercel
export default app; 