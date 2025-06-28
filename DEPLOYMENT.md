# 🚀 Production Deployment Guide

## Prerequisites

- Node.js 18+ installed
- MongoDB database (local or cloud)
- Domain name (for production)
- SSL certificate (for HTTPS)

## Environment Setup

### 1. Backend Environment Variables

Create a `.env` file in the `backend` directory:

```env
# Database Configuration
MONGO_DB_URL=mongodb+srv://username:password@cluster.mongodb.net/chatflow

# JWT Configuration
JWT_SECRET=your_super_secure_jwt_secret_here

# Server Configuration
PORT=5000
NODE_ENV=production

# Frontend URL (for CORS)
FRONTEND_URL=https://yourdomain.com

# Cookie Domain (optional, for subdomain support)
COOKIE_DOMAIN=.yourdomain.com
```

### 2. Frontend Environment Variables

Create a `.env` file in the `frontend` directory:

```env
# API Configuration
VITE_API_URL=https://api.yourdomain.com

# Socket Configuration
VITE_SOCKET_URL=https://api.yourdomain.com

# App Configuration
VITE_APP_NAME=ChatFlow
VITE_APP_VERSION=1.0.0
```

## Deployment Options

### Option 1: Single Server Deployment

1. **Install dependencies:**
   ```bash
   npm install
   cd frontend && npm install && cd ..
   ```

2. **Build frontend:**
   ```bash
   npm run build:frontend
   ```

3. **Start production server:**
   ```bash
   npm run start:prod
   ```

### Option 2: Separate Frontend/Backend Deployment

#### Backend Deployment (e.g., Railway, Heroku, DigitalOcean)

1. **Set environment variables** in your hosting platform
2. **Deploy backend code** to your hosting platform
3. **Ensure MongoDB connection** is working

#### Frontend Deployment (e.g., Vercel, Netlify, GitHub Pages)

1. **Set environment variables** in your hosting platform
2. **Deploy frontend code** to your hosting platform
3. **Configure build command:** `npm run build`
4. **Set output directory:** `dist`

### Option 3: Docker Deployment

Create a `Dockerfile` in the root directory:

```dockerfile
# Build stage
FROM node:18-alpine AS builder

WORKDIR /app
COPY package*.json ./
RUN npm ci --only=production

COPY frontend/package*.json ./frontend/
RUN cd frontend && npm ci

COPY . .
RUN npm run build:frontend

# Production stage
FROM node:18-alpine

WORKDIR /app
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production

COPY --from=builder /app/backend ./backend
COPY --from=builder /app/frontend/dist ./frontend/dist

EXPOSE 5000
CMD ["npm", "run", "start:prod"]
```

## Security Checklist

- [ ] **Environment variables** are properly set
- [ ] **JWT_SECRET** is a strong, random string
- [ ] **HTTPS** is enabled for production
- [ ] **CORS** is configured for your domain
- [ ] **Rate limiting** is enabled
- [ ] **Security headers** are set (Helmet)
- [ ] **Database** is secured and accessible
- [ ] **Logs** are being monitored
- [ ] **Backup strategy** is in place

## Monitoring & Maintenance

### Health Check Endpoint

Monitor your application health:
```
GET https://api.yourdomain.com/api/health
```

### Logs

Monitor application logs for errors and performance:
```bash
# If using PM2
pm2 logs

# If using Docker
docker logs container-name

# If using systemd
journalctl -u your-app.service
```

### Database Monitoring

- Monitor MongoDB connection status
- Set up database backups
- Monitor query performance

## Performance Optimization

### Backend

- Database connection pooling (configured)
- Rate limiting (configured)
- Compression (configured)
- Proper error handling (configured)

### Frontend

- Code splitting (configured)
- Minification (configured)
- Static asset optimization
- CDN for static assets

## Troubleshooting

### Common Issues

1. **CORS errors**: Check FRONTEND_URL environment variable
2. **Socket connection fails**: Verify VITE_SOCKET_URL
3. **Database connection fails**: Check MONGO_DB_URL
4. **JWT errors**: Verify JWT_SECRET is set

### Debug Commands

```bash
# Check environment variables
echo $NODE_ENV
echo $MONGO_DB_URL

# Test database connection
node -e "require('dotenv').config(); console.log(process.env.MONGO_DB_URL)"

# Check build output
ls -la frontend/dist/
```

## SSL/HTTPS Setup

### Using Let's Encrypt (Nginx)

1. Install Certbot
2. Configure Nginx reverse proxy
3. Obtain SSL certificate
4. Configure automatic renewal

### Using Cloudflare

1. Add domain to Cloudflare
2. Configure DNS records
3. Enable SSL/TLS encryption
4. Configure security settings

## Backup Strategy

### Database Backups

```bash
# MongoDB backup
mongodump --uri="mongodb+srv://username:password@cluster.mongodb.net/chatflow" --out=./backup

# Restore
mongorestore --uri="mongodb+srv://username:password@cluster.mongodb.net/chatflow" ./backup
```

### Application Backups

- Version control (Git)
- Environment variable backups
- Configuration file backups

## Scaling Considerations

### Horizontal Scaling

- Load balancer setup
- Session management
- Database clustering
- Redis for session storage

### Vertical Scaling

- Increase server resources
- Optimize database queries
- Implement caching strategies

---

**Need help?** Check the logs and ensure all environment variables are properly configured. 