# Database Setup Guide

This guide will help you set up the PostgreSQL database for the herStory application.

## Prerequisites

- PostgreSQL installed and running on your system
- Node.js and pnpm installed

## Step 1: Install PostgreSQL

If you don't have PostgreSQL installed:

**macOS:**
```bash
brew install postgresql@15
brew services start postgresql@15
```

**Linux (Ubuntu/Debian):**
```bash
sudo apt-get update
sudo apt-get install postgresql postgresql-contrib
sudo systemctl start postgresql
```

**Windows:**
Download and install from [PostgreSQL official website](https://www.postgresql.org/download/windows/)

## Step 2: Create Database

Create a new database for the application:

```bash
# Connect to PostgreSQL
psql postgres

# Create database
CREATE DATABASE herstory;

# Exit psql
\q
```

## Step 3: Configure Environment Variables

Create a `.env` file in the root directory:

```bash
cp .env.example .env
```

Edit `.env` and update the `DATABASE_URL`:

```env
DATABASE_URL="postgresql://username:password@localhost:5432/herstory?schema=public"
JWT_SECRET="your-super-secret-jwt-key-change-this-in-production"
PORT=8080
NODE_ENV=development
SERVER_PORT=3001

# Optional: Admin credentials (defaults to admin/password)
ADMIN_USERNAME=admin
ADMIN_PASSWORD=password

# Optional: Seed sample blog posts
SEED_POSTS=true
```

**Important:** Replace `username` and `password` with your PostgreSQL credentials.

## Step 4: Install Dependencies

```bash
pnpm install
```

## Step 5: Generate Prisma Client

```bash
pnpm db:generate
```

## Step 6: Run Database Migrations

```bash
pnpm db:migrate
```

This will:
- Create the database schema (Admin and BlogPost tables)
- Apply migrations

Alternatively, you can use `db:push` for development (faster, but doesn't create migration files):

```bash
pnpm db:push
```

## Step 7: Seed the Database

Create the initial admin user and optionally seed sample blog posts:

```bash
pnpm db:seed
```

This will create:
- An admin user (default: username `admin`, password `password`)
- Optionally, 2 sample blog posts (if `SEED_POSTS=true` in `.env`)

## Step 8: Start Development Server

```bash
pnpm dev
```

This will start:
- API server on `http://localhost:3001`
- Vite dev server on `http://localhost:5173` (proxies API requests)

## Database Management

### View Database in Prisma Studio

```bash
pnpm db:studio
```

This opens a visual database browser at `http://localhost:5555`

### Create New Migration

After changing the Prisma schema:

```bash
pnpm db:migrate
```

### Reset Database (⚠️ WARNING: Deletes all data)

```bash
pnpm db:push --force-reset
pnpm db:seed
```

## Troubleshooting

### Connection Error

If you get a connection error:
1. Verify PostgreSQL is running: `pg_isready`
2. Check your `DATABASE_URL` in `.env`
3. Ensure the database exists: `psql -l | grep herstory`

### Migration Issues

If migrations fail:
1. Check Prisma schema syntax: `pnpm db:generate`
2. Reset and recreate: `pnpm db:push --force-reset`

### Port Already in Use

If port 3001 or 5173 is in use:
- Change `SERVER_PORT` in `.env` for API server
- Change port in `vite.config.ts` for Vite dev server

## Production Setup

For production:
1. Use a managed PostgreSQL service (e.g., AWS RDS, Heroku Postgres, Supabase)
2. Set `NODE_ENV=production` in your environment
3. Use a strong `JWT_SECRET`
4. Change default admin credentials
5. Run migrations: `pnpm db:migrate deploy` (in production, use `migrate deploy` instead of `migrate dev`)

