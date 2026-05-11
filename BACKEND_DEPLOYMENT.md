# Backend Deployment Guide

## Option 1: Deploy to Railway (Recommended)

1. **Create Railway Account**
   - Go to [railway.app](https://railway.app)
   - Sign up with GitHub

2. **Deploy Your Backend**
   - Connect your GitHub repository
   - Railway will detect your Node.js project
   - Set environment variable: `DB_PASSWORD` = your actual password
   - Deploy!

3. **Update Frontend**
   - Get your Railway URL (e.g., `https://your-project.railway.app`)
   - Create `.env` file locally:
     ```
     VITE_API_BASE=https://your-project.railway.app
     ```
   - Or set it in GitHub Actions (see below)

---

## Option 2: Deploy to Render

1. Go to [render.com](https://render.com)
2. Create account and connect GitHub
3. Create new Web Service from your repo
4. Set runtime: Node
5. Build command: `npm install`
6. Start command: `node src/game-cafe-system/server.js`
7. Add environment variables:
   - `DB_PASSWORD` = your password
   - `NODE_ENV` = production

---

## Option 3: Deploy to Vercel (for Express backend)

1. Go to [vercel.com](https://vercel.com)
2. Connect GitHub repository
3. Configure as serverless function

---

## Local Testing

1. **Start Backend Locally**
   ```bash
   DB_PASSWORD='your_password' npm run api
   ```

2. **Start Frontend Dev Server**
   ```bash
   npm run dev
   ```

3. **Build for Production**
   ```bash
   npm run build
   ```

---

## Updating Frontend API URL for Production

After deploying backend, you have two options:

### Option A: Environment Variable (Recommended)
1. Create `.env` file:
   ```
   VITE_API_BASE=https://your-deployed-backend-url.com
   ```
2. The frontend will use this when built

### Option B: Update Vite Config
Modify `vite.config.js` to pass API URL during build

---

## CORS Configuration

Your backend server in `server.js` should have CORS enabled (it already does with express-cors), allowing requests from your GitHub Pages domain:
```
https://bbahena22.github.io/CS315-VideoGameCafe-Database/
```

---

## Database Connection

Make sure your deployed backend can connect to your MySQL database. The database connection string in your `server.js` should be accessible from the cloud service.

If using localhost database, you'll need to either:
- Expose your database to the internet (not recommended for security)
- Deploy database to a cloud service (MySQL Cloud, AWS RDS, etc.)
