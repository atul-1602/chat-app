# Chat App

A modern chat application with a stunning glassmorphism UI design. Built with React, Node.js, Express, and MongoDB. Optimized for Vercel deployment.
<img width="1512" alt="Screenshot 2025-06-28 at 10 48 07 AM" src="https://github.com/user-attachments/assets/e136dc61-0045-45df-9452-5e0e7890b124" />


## 🚀 Features

- **User Authentication** - Secure login and registration
- **Real-time Messaging** - Send and receive messages instantly
- **User Profiles** - Manage your profile and view other users
- **Responsive Design** - Beautiful UI that works on all devices
- **Modern UI** - Glassmorphism design with smooth animations
- **Production Ready** - Optimized for Vercel deployment

## 🛠️ Tech Stack

### Frontend
- **React 19** - Modern UI library
- **Vite** - Fast build tool
- **Tailwind CSS** - Utility-first CSS framework
- **React Router** - Client-side routing
- **React Hot Toast** - Beautiful notifications
- **Zustand** - State management

### Backend
- **Node.js** - JavaScript runtime
- **Express.js** - Web framework
- **MongoDB** - NoSQL database
- **Mongoose** - MongoDB object modeling
- **JWT** - Authentication tokens
- **bcryptjs** - Password hashing

## 📁 Project Structure

```
chatApp/
├── api/                    # Vercel API routes
│   ├── auth/              # Authentication endpoints
│   ├── messages/          # Message endpoints
│   └── users/             # User endpoints
├── backend/               # Backend source code
│   ├── controllers/       # Route controllers
│   ├── db/               # Database connection
│   ├── middleware/       # Custom middleware
│   ├── models/           # MongoDB models
│   ├── routes/           # API routes
│   └── utils/            # Utility functions
├── frontend/             # Frontend source code
│   ├── public/           # Static assets
│   ├── src/              # React components
│   │   ├── components/   # Reusable components
│   │   ├── context/      # React context
│   │   ├── hooks/        # Custom hooks
│   │   ├── pages/        # Page components
│   │   └── utils/        # Utility functions
│   └── dist/             # Build output
├── vercel.json           # Vercel configuration
├── package.json          # Backend dependencies
└── README.md            # Project documentation
```

## 🚀 Quick Start

### Prerequisites
- Node.js (v18 or higher)
- MongoDB (local or Atlas)
- Vercel account

### Local Development

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

3. **Set up environment variables**
   ```bash
   # Backend (.env in root)
   MONGODB_URI=your_mongodb_connection_string
   JWT_SECRET=your_jwt_secret_key
   PORT=5000
   NODE_ENV=development
   
   # Frontend (.env in frontend/)
   VITE_API_URL=http://localhost:5000/api
   ```

4. **Start development servers**
   ```bash
   # Start backend (from root)
   npm start
   
   # Start frontend (in another terminal)
   cd frontend
   npm run dev
   ```

5. **Open your browser**
   - Frontend: http://localhost:3000
   - Backend API: http://localhost:5000

### Production Deployment (Vercel)

1. **Deploy to Vercel**
   ```bash
   # Install Vercel CLI
   npm i -g vercel
   
   # Deploy
   vercel
   ```

2. **Set environment variables in Vercel dashboard**
   - `MONGODB_URI`: Your MongoDB Atlas connection string
   - `JWT_SECRET`: A strong random string for JWT signing
   - `NODE_ENV`: production

3. **Your app will be live at your Vercel domain!**

## 🔧 Configuration

### Environment Variables

**Backend (.env)**
```env
MONGODB_URI=mongodb://localhost:27017/chatapp
JWT_SECRET=your_super_secret_jwt_key
PORT=5000
NODE_ENV=development
FRONTEND_URL=http://localhost:3000
```

**Frontend (.env)**
```env
VITE_API_URL=http://localhost:5000/api
```

### MongoDB Setup

1. **Local MongoDB**
   ```bash
   # Install MongoDB locally
   # Start MongoDB service
   mongod
   ```

2. **MongoDB Atlas (Recommended for production)**
   - Create account at [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a new cluster
   - Get your connection string
   - Add it to your environment variables

## 🚀 Deployment

This project is optimized for Vercel deployment:

- **Serverless Functions** - API routes in `/api` directory
- **Static Site Generation** - Frontend built with Vite
- **Environment Variables** - Secure configuration management
- **Automatic Deployments** - Git integration

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Test thoroughly
5. Submit a pull request

## 📄 License

This project is licensed under the ISC License.

## 🆘 Support

If you encounter any issues:

1. Check the [Vercel documentation](https://vercel.com/docs)
2. Review the environment variables
3. Check MongoDB connection
4. Look at Vercel function logs

---

**Note**: This version is optimized for Vercel deployment and doesn't include real-time WebSocket features since Vercel serverless functions don't support persistent connections. 
