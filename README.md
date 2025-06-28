# ChatFlow 💬

A modern, real-time chat application with a stunning glassmorphism UI design. Built with React, Node.js, Express, MongoDB, and Socket.io.

![ChatFlow](https://img.shields.io/badge/ChatFlow-Real--time%20Chat-blue?style=for-the-badge&logo=chat)

## ✨ Features

- 🔐 **Secure Authentication** - JWT-based login/signup
- 💬 **Real-time Messaging** - Instant message delivery
- 👥 **User Conversations** - Beautiful conversation list
- 🟢 **Online Status** - Live user presence indicators
- 📱 **Responsive Design** - Works on all devices
- 🎨 **Modern UI** - Glassmorphism design with animations
- 🔒 **Protected Routes** - Secure API endpoints
- ⚡ **Fast Performance** - Optimized for speed

## 🛠️ Tech Stack

### Frontend
- **React 19** - Latest React with hooks
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router DOM** - Client-side routing
- **Socket.io Client** - Real-time communication
- **Zustand** - Lightweight state management
- **React Hot Toast** - Beautiful notifications

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Socket.io** - Real-time bidirectional communication
- **JWT** - JSON Web Token authentication
- **bcryptjs** - Password hashing

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or cloud)
- npm or yarn

### Installation

1. **Clone the repository**
   ```bash
   git clone <repository-url>
   cd chatApp
   ```

2. **Install dependencies**
   ```bash
   # Install backend dependencies
   npm install
   
   # Install frontend dependencies
   cd frontend
   npm install
   cd ..
   ```

3. **Environment Setup**
   
   Create a `.env` file in the `backend` directory:
   ```env
   MONGO_DB_URL=mongodb://localhost:27017/chatflow
   JWT_SECRET=your_super_secure_jwt_secret_here
   NODE_ENV=development
   PORT=5000
   ```

4. **Start the application**
   ```bash
   # Start backend server (Terminal 1)
   npm run server
   
   # Start frontend (Terminal 2)
   cd frontend
   npm run dev
   ```

5. **Open ChatFlow**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

## 🎨 Design Features

### Glassmorphism UI
- **Backdrop blur effects** for modern glass appearance
- **Gradient backgrounds** with smooth transitions
- **Semi-transparent elements** for depth
- **Smooth animations** and hover effects

### Color Scheme
- **Primary:** Blue to purple gradients
- **Secondary:** Purple to pink accents
- **Background:** Dark theme with gradients
- **Text:** White and light grays
- **Status:** Green for online, red for errors

### Animations
- **Fade-in effects** for smooth loading
- **Hover transformations** for interactivity
- **Loading spinners** with gradients
- **Smooth transitions** throughout the app

## 📱 Screenshots

### Authentication Pages
- Beautiful glassmorphism login/signup forms
- Gradient buttons with hover effects
- Modern input fields with icons
- Responsive design for all devices

### Chat Interface
- Clean sidebar with user avatars
- Real-time message bubbles
- Online status indicators
- Modern search functionality

## 🔧 API Endpoints

### Authentication
- `POST /api/auth/signup` - User registration
- `POST /api/auth/login` - User login
- `POST /api/auth/logout` - User logout

### Users
- `GET /api/users` - Get all users (excluding current user)

### Messages
- `GET /api/messages/:id` - Get messages with a user
- `POST /api/messages/send/:id` - Send message to a user

## 🏗️ Project Structure

```
chatApp/
├── backend/
│   ├── controllers/     # Route controllers
│   ├── db/             # Database connection
│   ├── middleware/     # Custom middleware
│   ├── models/         # MongoDB models
│   ├── routes/         # API routes
│   ├── socket/         # Socket.io configuration
│   ├── utils/          # Utility functions
│   ├── server.js       # Main server file
│   └── .env           # Environment variables
├── frontend/
│   ├── src/
│   │   ├── components/ # React components
│   │   ├── context/    # React context
│   │   ├── hooks/      # Custom hooks
│   │   ├── pages/      # Page components
│   │   ├── zustand/    # State management
│   │   └── main.jsx    # App entry point
│   └── package.json
└── package.json
```

## 🎯 Key Features Implementation

### Real-time Messaging
- **Socket.io integration** for instant message delivery
- **Message persistence** in MongoDB
- **Online/offline status** tracking
- **Typing indicators** (ready for implementation)

### Authentication System
- **JWT tokens** stored in HTTP-only cookies
- **Password hashing** with bcryptjs
- **Protected routes** with middleware
- **Session management** with automatic cleanup

### State Management
- **Zustand** for global state
- **React Context** for authentication
- **Local storage** for user persistence
- **Optimistic updates** for better UX

## 🚀 Deployment

### Backend Deployment
1. Set up environment variables
2. Configure MongoDB connection
3. Set up proper CORS for production
4. Deploy to your preferred platform (Heroku, Railway, etc.)

### Frontend Deployment
1. Build the project: `npm run build`
2. Deploy the `dist` folder to your hosting platform
3. Update API URLs for production

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add tests if applicable
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🙏 Acknowledgments

- **Tailwind CSS** for the beautiful utility classes
- **React Hot Toast** for elegant notifications
- **Socket.io** for real-time capabilities
- **MongoDB** for reliable data storage

---

**ChatFlow** - Where conversations flow beautifully ✨ 