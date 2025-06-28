# 🚀 Vercel Deployment Guide

## Prerequisites

- Vercel account (free tier available)
- MongoDB Atlas account (free tier available)
- GitHub repository with your code

## Step 1: Prepare Your Repository

### 1.1 Environment Variables Setup

Create environment variables in Vercel dashboard:

**Backend Environment Variables:**
```env
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/chatflow
JWT_SECRET=your_super_secure_jwt_secret_here
NODE_ENV=production
FRONTEND_URL=https://your-app.vercel.app
```

**Frontend Environment Variables:**
```env
VITE_API_URL=https://your-app.vercel.app
VITE_SOCKET_URL=https://your-app.vercel.app
```

### 1.2 MongoDB Atlas Setup

1. **Create MongoDB Atlas Cluster:**
   - Go to [MongoDB Atlas](https://www.mongodb.com/atlas)
   - Create a free cluster
   - Set up database access (username/password)
   - Set up network access (allow all IPs: 0.0.0.0/0)

2. **Get Connection String:**
   - Click "Connect" on your cluster
   - Choose "Connect your application"
   - Copy the connection string
   - Replace `<password>` with your actual password

## Step 2: Deploy to Vercel

### 2.1 Connect Repository

1. **Go to [Vercel Dashboard](https://vercel.com/dashboard)**
2. **Click "New Project"**
3. **Import your GitHub repository**
4. **Configure project settings:**

### 2.2 Project Configuration

**Framework Preset:** `Other`
**Root Directory:** `./` (root of your project)
**Build Command:** `npm run build:full`
**Output Directory:** `frontend/dist`
**Install Command:** `npm install`

### 2.3 Environment Variables

Add these in Vercel dashboard:

**Backend:**
- `MONGO_DB_URL` - Your MongoDB Atlas connection string
- `JWT_SECRET` - A strong random string (32+ characters)
- `NODE_ENV` - `production`
- `FRONTEND_URL` - Your Vercel app URL

**Frontend:**
- `VITE_API_URL` - Your Vercel app URL
- `VITE_SOCKET_URL` - Your Vercel app URL

### 2.4 Deploy

1. **Click "Deploy"**
2. **Wait for build to complete**
3. **Check deployment logs for any errors**

## Step 3: Post-Deployment Setup

### 3.1 Verify Deployment

1. **Check your app URL** (e.g., `https://your-app.vercel.app`)
2. **Test the health endpoint:** `https://your-app.vercel.app/api/health`
3. **Test authentication endpoints**

### 3.2 Custom Domain (Optional)

1. **Go to your project settings in Vercel**
2. **Click "Domains"**
3. **Add your custom domain**
4. **Update environment variables with new domain**

## Step 4: Testing Your Deployment

### 4.1 Test Authentication

1. **Visit your app URL**
2. **Try to sign up with a new account**
3. **Try to log in**
4. **Check if JWT cookies are set**

### 4.2 Test Real-time Features

1. **Open app in two different browsers/incognito windows**
2. **Log in with different accounts**
3. **Send messages between users**
4. **Check if real-time updates work**

### 4.3 Test API Endpoints

```bash
# Health check
curl https://your-app.vercel.app/api/health

# Sign up
curl -X POST https://your-app.vercel.app/api/auth/signup \
  -H "Content-Type: application/json" \
  -d '{"fullName":"Test User","userName":"testuser","password":"password123","confirmPassword":"password123","gender":"male"}'
```

## Step 5: Monitoring & Maintenance

### 5.1 Vercel Analytics

- **Enable Vercel Analytics** in project settings
- **Monitor performance** and user behavior
- **Check for errors** in the dashboard

### 5.2 Function Logs

- **View function logs** in Vercel dashboard
- **Monitor API performance**
- **Check for cold starts**

### 5.3 Database Monitoring

- **Monitor MongoDB Atlas** dashboard
- **Set up alerts** for connection issues
- **Monitor database performance**

## Troubleshooting

### Common Issues

1. **Build Failures:**
   ```bash
   # Check build logs in Vercel dashboard
   # Ensure all dependencies are in package.json
   # Verify build command is correct
   ```

2. **CORS Errors:**
   ```javascript
   // Check if FRONTEND_URL is set correctly
   // Ensure CORS origins include your Vercel domain
   ```

3. **Socket Connection Issues:**
   ```javascript
   // Vercel doesn't support WebSocket in serverless functions
   // Consider using a separate WebSocket service like:
   // - Socket.io Cloud
   // - Pusher
   // - Ably
   ```

4. **Database Connection Issues:**
   ```bash
   # Check MONGO_DB_URL format
   # Ensure MongoDB Atlas network access allows all IPs
   # Verify username/password are correct
   ```

### Debug Commands

```bash
# Check environment variables
echo $MONGO_DB_URL
echo $JWT_SECRET

# Test MongoDB connection locally
node -e "
require('dotenv').config();
const mongoose = require('mongoose');
mongoose.connect(process.env.MONGO_DB_URL)
  .then(() => console.log('Connected to MongoDB'))
  .catch(err => console.error('Connection failed:', err));
"
```

## Performance Optimization

### 1. Function Optimization

- **Keep functions lightweight**
- **Use connection pooling** for database
- **Implement caching** where possible

### 2. Frontend Optimization

- **Enable Vercel Edge Functions** for static assets
- **Use CDN** for better global performance
- **Optimize bundle size**

### 3. Database Optimization

- **Use MongoDB Atlas M10+** for production
- **Implement proper indexing**
- **Monitor query performance**

## Security Considerations

### 1. Environment Variables

- **Never commit secrets** to repository
- **Use Vercel's environment variable system**
- **Rotate JWT secrets** regularly

### 2. CORS Configuration

- **Restrict origins** to your domain only
- **Use HTTPS** in production
- **Validate input** on all endpoints

### 3. Rate Limiting

- **Implement rate limiting** (already configured)
- **Monitor for abuse**
- **Set up alerts** for unusual traffic

## Scaling Considerations

### 1. Vercel Limits

- **Free tier:** 100GB bandwidth/month
- **Pro tier:** 1TB bandwidth/month
- **Enterprise:** Custom limits

### 2. MongoDB Atlas Limits

- **Free tier:** 512MB storage
- **Paid tiers:** Based on cluster size

### 3. When to Scale

- **Upgrade Vercel plan** for more bandwidth
- **Upgrade MongoDB Atlas** for more storage
- **Consider separate WebSocket service** for real-time features

---

**Need help?** Check Vercel's documentation or reach out to their support team. 