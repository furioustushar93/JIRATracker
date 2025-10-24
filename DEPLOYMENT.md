# Deployment Guide

This guide covers different deployment options for TaskFlow.

## 📦 Quick Deploy with Docker (Coming Soon)

Docker support is planned for a future release.

## ☁️ Cloud Deployment

### Backend (FastAPI)

#### Option 1: Heroku

1. Install Heroku CLI
2. Create `Procfile` in backend/:
   ```
   web: uvicorn main:app --host 0.0.0.0 --port $PORT
   ```
3. Deploy:
   ```bash
   heroku create your-app-name
   git subtree push --prefix backend heroku main
   ```

#### Option 2: Railway

1. Go to [Railway.app](https://railway.app)
2. Create new project from GitHub repo
3. Set root directory to `backend`
4. Railway will auto-detect FastAPI
5. Add PostgreSQL database
6. Update `database.py` with DATABASE_URL env var

#### Option 3: Render

1. Go to [Render.com](https://render.com)
2. Create new Web Service
3. Connect your repo
4. Settings:
   - Root Directory: `backend`
   - Build Command: `pip install -r requirements.txt`
   - Start Command: `uvicorn main:app --host 0.0.0.0 --port $PORT`
5. Add PostgreSQL database from Render dashboard

#### Option 4: AWS (EC2)

1. Launch EC2 instance (Ubuntu)
2. SSH into instance
3. Install dependencies:
   ```bash
   sudo apt update
   sudo apt install python3-pip python3-venv nginx
   ```
4. Clone your repo
5. Setup virtual environment and install packages
6. Configure Nginx as reverse proxy
7. Use systemd to run as service

### Frontend (React)

#### Option 1: Vercel (Recommended)

1. Go to [Vercel.com](https://vercel.com)
2. Import your GitHub repo
3. Settings:
   - Root Directory: `frontend`
   - Build Command: `npm run build`
   - Output Directory: `dist`
4. Set environment variables:
   - `VITE_API_URL`: Your backend URL
5. Deploy!

#### Option 2: Netlify

1. Go to [Netlify.com](https://netlify.com)
2. New site from Git
3. Settings:
   - Base directory: `frontend`
   - Build command: `npm run build`
   - Publish directory: `frontend/dist`
4. Add `_redirects` file in `public/`:
   ```
   /* /index.html 200
   ```
5. Deploy!

#### Option 3: AWS S3 + CloudFront

1. Build the frontend:
   ```bash
   cd frontend
   npm run build
   ```
2. Create S3 bucket
3. Enable static website hosting
4. Upload `dist/` contents to bucket
5. Create CloudFront distribution
6. Point to S3 bucket

## 🗄️ Database

### PostgreSQL (Production)

Update `backend/database.py`:

```python
import os

SQLALCHEMY_DATABASE_URL = os.getenv(
    "DATABASE_URL",
    "sqlite:///./jira_tickets.db"
)

# Fix for Heroku postgres:// URL
if SQLALCHEMY_DATABASE_URL.startswith("postgres://"):
    SQLALCHEMY_DATABASE_URL = SQLALCHEMY_DATABASE_URL.replace(
        "postgres://", "postgresql://", 1
    )

engine = create_engine(SQLALCHEMY_DATABASE_URL)
```

### Migrations

For production, use Alembic for database migrations:

```bash
pip install alembic
alembic init alembic
alembic revision --autogenerate -m "Initial migration"
alembic upgrade head
```

## 🔒 Environment Variables

### Backend
```bash
DATABASE_URL=postgresql://user:pass@host:5432/dbname
SECRET_KEY=your-secret-key-here
ENVIRONMENT=production
```

### Frontend
```bash
VITE_API_URL=https://your-api-url.com
```

## 🔐 Security Checklist

- [ ] Change default SECRET_KEY
- [ ] Enable HTTPS
- [ ] Set up CORS properly
- [ ] Use environment variables for secrets
- [ ] Enable rate limiting
- [ ] Set up monitoring
- [ ] Regular backups
- [ ] Update dependencies regularly

## 📊 Monitoring

### Backend Monitoring

**Option 1: Sentry**
```bash
pip install sentry-sdk
```

Add to `main.py`:
```python
import sentry_sdk

sentry_sdk.init(
    dsn="your-sentry-dsn",
    traces_sample_rate=1.0,
)
```

**Option 2: DataDog, New Relic, etc.**

### Frontend Monitoring

Add Sentry, LogRocket, or similar service.

## 🔄 CI/CD

### GitHub Actions Example

Create `.github/workflows/deploy.yml`:

```yaml
name: Deploy

on:
  push:
    branches: [ main ]

jobs:
  deploy:
    runs-on: ubuntu-latest
    
    steps:
    - uses: actions/checkout@v2
    
    - name: Deploy to Vercel
      uses: amondnet/vercel-action@v20
      with:
        vercel-token: ${{ secrets.VERCEL_TOKEN }}
        vercel-org-id: ${{ secrets.ORG_ID }}
        vercel-project-id: ${{ secrets.PROJECT_ID }}
```

## 🚀 Performance Optimization

1. **Backend**
   - Use Gunicorn with multiple workers
   - Enable response compression
   - Add Redis caching
   - Database connection pooling

2. **Frontend**
   - Enable production build optimizations
   - Use CDN for assets
   - Lazy load components
   - Code splitting

## 📝 Post-Deployment

1. Test all features
2. Set up monitoring and alerts
3. Configure backups
4. Document the deployment
5. Set up SSL/TLS certificates
6. Configure domain and DNS

## 🆘 Troubleshooting

**CORS Issues:**
- Update CORS settings in `main.py`
- Add your frontend URL to allowed origins

**Database Connection:**
- Check DATABASE_URL format
- Verify database is accessible
- Check firewall rules

**Build Failures:**
- Check Node/Python versions
- Verify all dependencies are listed
- Check build logs for errors

---

Need help? Open an issue on GitHub!

