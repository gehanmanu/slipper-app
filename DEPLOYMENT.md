# Slipper Distribution Web App - Deployment Guide

This guide provides instructions for deploying the Slipper Distribution Web App to your preferred hosting environment.

## Prerequisites

- Node.js 16.x or higher
- npm or yarn package manager
- Git (optional)

## Local Development Setup

1. **Clone or extract the application files**
   ```bash
   # If using the provided package
   unzip slipper-distribution-package.zip
   cd slipper-distribution-app
   
   # Or if cloning from a repository
   git clone <repository-url>
   cd slipper-distribution-app
   ```

2. **Install dependencies**
   ```bash
   npm install
   # or
   yarn install
   ```

3. **Set up the database**
   ```bash
   # Initialize the database with the schema and sample data
   npx wrangler d1 execute DB --local --file=migrations/0001_initial.sql
   ```

4. **Run the development server**
   ```bash
   npm run dev
   # or
   yarn dev
   ```

5. **Access the application**
   - Open your browser and navigate to `http://localhost:3000`

## Production Deployment Options

### Option 1: Vercel (Recommended)

Vercel is the easiest platform for deploying Next.js applications.

1. **Create a Vercel account** at [vercel.com](https://vercel.com)

2. **Install Vercel CLI**
   ```bash
   npm install -g vercel
   ```

3. **Deploy the application**
   ```bash
   vercel login
   vercel
   ```

4. **Follow the prompts** to complete the deployment

### Option 2: Netlify

1. **Create a Netlify account** at [netlify.com](https://netlify.com)

2. **Install Netlify CLI**
   ```bash
   npm install -g netlify-cli
   ```

3. **Deploy the application**
   ```bash
   netlify login
   netlify deploy
   ```

### Option 3: Traditional Hosting

1. **Build the application**
   ```bash
   npm run build
   ```

2. **Start the production server**
   ```bash
   npm run start
   ```

3. **Use a process manager** like PM2 to keep the application running
   ```bash
   npm install -g pm2
   pm2 start npm --name "slipper-app" -- start
   ```

## Database Configuration

The application uses SQLite by default for simplicity. For production, you might want to use a more robust database:

1. **PostgreSQL**: Update the database configuration in `src/lib/db.ts` to use PostgreSQL
2. **MySQL**: Update the database configuration to use MySQL
3. **MongoDB**: Requires more significant changes to the data models

## Environment Variables

Create a `.env.local` file with the following variables:

```
# Database connection (if using external database)
DATABASE_URL=your_database_connection_string

# Authentication (for enhanced security)
AUTH_SECRET=your_secret_key
```

## Admin Access

After deployment, you can access the admin dashboard with:
- Username: admin
- Password: gehan123

## Troubleshooting

- **Database connection issues**: Ensure your database is properly configured and accessible
- **Build errors**: Make sure all dependencies are installed with `npm install`
- **Runtime errors**: Check the server logs for detailed error messages

## Support

If you encounter any issues with deployment, please contact the development team for assistance.
