# Deployment Guide: herStory Application

This guide covers deploying your herStory application to **Render** (recommended for full-stack) and **Vercel** (for frontend-only deployment).

## Quick Start (Render - Recommended)

1. **Push code to GitHub**
2. **Create Neon PostgreSQL database**
   - Sign up at [neon.tech](https://neon.tech)
   - Create a new project → Copy connection string
3. **Deploy web service**
   - Option A: Use Blueprint with `render.yaml` (easiest)
   - Option B: Manual setup (see detailed steps below)
4. **Set DATABASE_URL** in Render dashboard with your Neon connection string
5. **Run migrations** (in Render Shell):
   ```bash
   npx prisma migrate deploy
   npm run db:seed  # Optional
   ```
6. **Done!** Your app is live 🎉

## Table of Contents

1. [Render Deployment (Full-Stack - Recommended)](#render-deployment-full-stack---recommended)
2. [Vercel Deployment (Frontend Only)](#vercel-deployment-frontend-only)
3. [Environment Variables](#environment-variables)
4. [Database Setup](#database-setup)
5. [Post-Deployment Steps](#post-deployment-steps)

---

## Render Deployment (Full-Stack - Recommended)

Render is ideal for this application since it serves both the frontend and backend together.

### Prerequisites

- A GitHub account with your repository pushed
- A Render account (sign up at [render.com](https://render.com))

### Step 1: Create Neon PostgreSQL Database

1. Go to [neon.tech](https://neon.tech) and sign up/login
2. Click **"Create a project"** or **"New Project"**
3. Configure:
   - **Project Name**: `herstory` (or your preferred name)
   - **Region**: Choose closest to your users (same region as Render service recommended)
   - **PostgreSQL Version**: Latest (15+ recommended)
   - **Plan**: Free tier is available for development
4. Click **"Create Project"**
5. Wait for the database to be provisioned (usually instant)
6. Once created, you'll see the connection string. Click **"Connection Details"** or find it in the dashboard
7. Copy the **Connection String** - it looks like:
   ```
   postgresql://user:password@ep-xxx-xxx.region.aws.neon.tech/dbname?sslmode=require
   ```
   **Important**: Use the connection string that includes `?sslmode=require` for production

### Step 2: Deploy Web Service

#### Option A: Using render.yaml (Recommended)

1. Make sure `render.yaml` is committed to your repository
2. **Before deploying**: Ensure your lockfile is up to date:

   ```bash
   # Update npm lockfile (render.yaml uses npm)
   npm install
   git add package-lock.json
   git commit -m "Update npm lockfile"
   git push
   ```

3. In Render dashboard, click **"New +"** → **"Blueprint"**
4. Connect your GitHub repository
5. Render will automatically detect `render.yaml` and create the services
6. Review the configuration and click **"Apply"**
7. **Important**: After the service is created, go to the service settings → **"Environment"** tab
8. Set the `DATABASE_URL` environment variable with your Neon connection string:
   - Key: `DATABASE_URL`
   - Value: Your Neon connection string (from Step 1)
   - Make sure it includes `?sslmode=require` at the end

#### Option B: Manual Setup

1. In Render dashboard, click **"New +"** → **"Web Service"**
2. Connect your GitHub repository
3. Configure the service:
   - **Name**: `herstory-app`
   - **Environment**: `Node`
   - **Region**: Same as your database
   - **Branch**: `main` (or your production branch)
   - **Root Directory**: Leave empty (root)
   - **Build Command**: `npm install && npm run build && npx prisma generate`
   - **Start Command**: `npm start`
4. Add Environment Variables:
   - `NODE_ENV` = `production`
   - `DATABASE_URL` = (Neon connection string from Step 1 - must include `?sslmode=require`)
   - `JWT_SECRET` = (Generate a strong random string)
   - `PORT` = `10000` (Render sets this automatically, but good to have)
5. Click **"Create Web Service"**

### Step 3: Run Database Migrations

After the first deployment:

1. Go to your web service in Render
2. Click on **"Shell"** tab
3. Run the following commands:
   ```bash
   npx prisma migrate deploy
   npm run db:seed  # Optional: seed initial data
   ```

### Step 4: Verify Deployment

1. Wait for the build to complete (5-10 minutes for first build)
2. Visit your Render URL (e.g., `https://herstory-app.onrender.com`)
3. Check the health endpoint: `https://herstory-app.onrender.com/api/ping`
4. Test the application functionality

---

## Vercel Deployment (Frontend Only)

If you want to deploy the frontend separately on Vercel and backend on Render:

### Prerequisites

- Backend deployed on Render (follow steps above)
- Vercel account (sign up at [vercel.com](https://vercel.com))

### Step 1: Update API Configuration

You'll need to update the client code to use the Render backend URL. Create an environment variable for the API URL.

1. Create a `.env.production` file:

   ```env
   VITE_API_URL=https://your-render-app.onrender.com
   ```

2. Update API calls to use the environment variable (if needed). The current setup uses relative paths, so you'll need to configure Vercel rewrites or update the fetch calls.

### Step 2: Deploy to Vercel

1. Go to [vercel.com](https://vercel.com) and sign in
2. Click **"Add New..."** → **"Project"**
3. Import your GitHub repository
4. Configure:
   - **Framework Preset**: Vite
   - **Root Directory**: Leave as root
   - **Build Command**: `npm run build:client`
   - **Output Directory**: `dist/spa`
   - **Install Command**: `npm install`
5. Add Environment Variables:
   - `VITE_API_URL` = `https://your-render-app.onrender.com`
6. Click **"Deploy"**

### Step 3: Configure CORS on Render Backend

Update your Render backend to allow requests from Vercel:

1. In your Render service, add environment variable:
   - `CORS_ORIGIN` = `https://your-vercel-app.vercel.app`

2. Update `server/node-build.ts` to use CORS origin from env:
   ```typescript
   app.use(
     cors({
       origin: process.env.CORS_ORIGIN || "*",
       credentials: true,
     }),
   );
   ```

---

## Environment Variables

### Required Variables

| Variable       | Description                       | Example                                                                     |
| -------------- | --------------------------------- | --------------------------------------------------------------------------- |
| `DATABASE_URL` | Neon PostgreSQL connection string | `postgresql://user:pass@ep-xxx.region.aws.neon.tech/dbname?sslmode=require` |
| `JWT_SECRET`   | Secret key for JWT tokens         | (Generate a strong random string)                                           |
| `NODE_ENV`     | Environment mode                  | `production`                                                                |
| `PORT`         | Server port                       | `10000` (Render) or `8080` (default)                                        |

### Optional Variables

| Variable      | Description         | Default          |
| ------------- | ------------------- | ---------------- |
| `CORS_ORIGIN` | Allowed CORS origin | `*` (allows all) |

### Generating JWT_SECRET

You can generate a secure JWT secret using:

```bash
node -e "console.log(require('crypto').randomBytes(64).toString('hex'))"
```

---

## Database Setup

### Initial Migration

After deploying, run migrations:

```bash
# In Render Shell or locally with DATABASE_URL set
npx prisma migrate deploy
```

### Seeding Data (Optional)

```bash
npm run db:seed
```

### Database Studio (Optional)

Access Prisma Studio:

```bash
npx prisma studio
```

---

## Post-Deployment Steps

### 1. Create Admin User

You'll need to create an admin user. You can do this by:

**Option A: Using Prisma Studio**

1. Run `npx prisma studio` locally with `DATABASE_URL` pointing to your Render database
2. Navigate to the `admins` table
3. Create a new admin with a hashed password

**Option B: Create a seed script or API endpoint**

- Add a one-time admin creation script or endpoint

**Option C: Use Render Shell**

1. Go to Render Shell
2. Run your seed script: `npm run db:seed`

### 2. Verify All Features

- [ ] Home page loads
- [ ] Blog posts display
- [ ] Admin login works
- [ ] Blog CRUD operations work
- [ ] Database connection is stable

### 3. Set Up Custom Domain (Optional)

**Render:**

1. Go to your service settings
2. Click **"Custom Domains"**
3. Add your domain and follow DNS instructions

**Vercel:**

1. Go to project settings
2. Click **"Domains"**
3. Add your domain

### 4. Monitor and Optimize

- Monitor Render logs for errors
- Set up uptime monitoring
- Consider upgrading plans for production traffic
- Enable auto-deploy from main branch

---

## Troubleshooting

### Common Issues

**1. Database Connection Errors**

- Verify `DATABASE_URL` is correct and includes `?sslmode=require`
- Check if Neon database is running (check Neon dashboard)
- Ensure Neon database allows connections from Render service IPs
- Verify the connection string format matches: `postgresql://user:pass@host.neon.tech/dbname?sslmode=require`
- Check Neon dashboard for connection logs if issues persist

**2. Build Failures**

- Check Node.js version (Render uses Node 18+ by default)
- Verify all dependencies are in `package.json`
- Check build logs for specific errors

**2a. Lockfile Mismatch / Package Manager Issues**

If you see errors like "specifiers in the lockfile don't match specifiers in package.json" or "vite: not found":

- **The `render.yaml` is configured to use npm** (more reliable on Render). Make sure:
  - `package-lock.json` is committed to your repository
  - Run `npm install` locally to ensure lockfile is up to date before committing
  - Commit and push the updated `package-lock.json`

- **If you were using pnpm**: The configuration has been switched to npm because Render auto-detects pnpm and uses `--frozen-lockfile` by default, which can cause issues. You can keep `pnpm-lock.yaml` for local development, but Render will use npm.

- **Ensure devDependencies are installed**: Build tools like `vite` are in devDependencies and must be installed for the build to work. `npm install` installs devDependencies by default.

- **To update lockfile before deploying**:
  ```bash
  npm install
  git add package-lock.json
  git commit -m "Update npm lockfile"
  git push
  ```

**3. CORS Errors (Vercel + Render)**

- Verify `CORS_ORIGIN` is set correctly
- Check that backend allows your Vercel domain

**4. Prisma Client Errors**

- Ensure `npx prisma generate` runs during build
- Check that `@prisma/client` is in dependencies (not devDependencies)

**5. Static Files Not Loading**

- Verify `dist/spa` directory exists after build
- Check that static file serving is configured correctly

---

## Cost Estimates

### Render (Free Tier)

- Web Service: Free (with limitations)
- **Total**: Free for development/testing

### Render (Production)

- Web Service: $7/month (Starter) or $25/month (Standard)
- **Total**: ~$7-25/month

### Neon Database

- **Free Tier**: 0.5 GB storage, 1 project (great for development)
- **Launch Plan**: $19/month (10 GB storage, better performance)
- **Scale Plan**: $69/month (50 GB storage, production-ready)
- **Note**: Neon offers generous free tier for development and testing

### Vercel

- Frontend: Free (Hobby plan) for personal projects
- Pro: $20/month for team features

---

## Support

For issues:

- Render: [render.com/docs](https://render.com/docs)
- Vercel: [vercel.com/docs](https://vercel.com/docs)
- Prisma: [prisma.io/docs](https://www.prisma.io/docs)
