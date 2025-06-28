# Simple Deployment Guide

## 🚀 Deploy to Vercel

This project is optimized for Vercel deployment. Follow these simple steps:

### 1. Prepare Your Project

Make sure you have:
- MongoDB Atlas account (for production database)
- Vercel account
- Git repository with your code

### 2. Deploy to Vercel

**Option A: Using Vercel CLI**
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel

# Follow the prompts
# - Link to existing project or create new
# - Set build command: npm run vercel-build
# - Set output directory: frontend/dist
```

**Option B: Using Vercel Dashboard**
1. Go to [vercel.com](https://vercel.com)
2. Click "New Project"
3. Import your Git repository
4. Configure build settings:
   - Build Command: `npm run vercel-build`
   - Output Directory: `frontend/dist`
   - Install Command: `npm install`

### 3. Set Environment Variables

In your Vercel project dashboard, go to Settings → Environment Variables and add:

```
MONGODB_URI=mongodb+srv://username:password@cluster.mongodb.net/chatapp
JWT_SECRET=your_super_strong_random_secret_key_here
NODE_ENV=production
```

### 4. Deploy

Click "Deploy" and wait for the build to complete. Your app will be live at your Vercel domain!

## 🔧 Troubleshooting

### Common Issues

1. **404 Errors on Main App**
   - Check `vercel.json` routing configuration
   - Ensure frontend build is successful

2. **500 Errors on API Endpoints**
   - Check Vercel function logs
   - Verify environment variables are set
   - Check MongoDB connection string

3. **Build Failures**
   - Check build logs in Vercel dashboard
   - Ensure all dependencies are in package.json

### Checking Logs

1. Go to your Vercel project dashboard
2. Click on "Functions" tab
3. Click on any function to see logs
4. Check for error messages

## 📝 Notes

- Real-time features (WebSocket) are disabled for Vercel deployment
- Messages are stored in MongoDB but not real-time
- Authentication works with JWT tokens
- All API endpoints are serverless functions

## 🎉 Success!

Once deployed, your chat app will be live and accessible to users worldwide! 