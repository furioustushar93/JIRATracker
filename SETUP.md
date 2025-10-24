# Quick Setup Guide

Follow these steps to get TaskFlow running on your machine.

## Step 1: Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create virtual environment
python -m venv venv

# Activate virtual environment
# On macOS/Linux:
source venv/bin/activate
# On Windows:
venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Initialize database with sample data
python seed_data.py

# Start the backend server
uvicorn main:app --reload
```

✅ Backend is now running at `http://localhost:8000`

## Step 2: Frontend Setup

Open a **new terminal** window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

✅ Frontend is now running at `http://localhost:3000`

## Step 3: Access the Application

Open your browser and go to: `http://localhost:3000`

### Sample Data

After running `seed_data.py`, you'll have:

**Users:**
- John Doe (john@example.com) - Admin / Engineering Manager - San Francisco, CA
- Jane Smith (jane@example.com) - Developer / Senior Full Stack Developer - New York, NY
- Bob Wilson (bob@example.com) - Designer / Senior UX Designer - Austin, TX
- Alice Johnson (alice@example.com) - QA Engineer / QA Lead - Seattle, WA
- Mike Brown (mike@example.com) - Product Owner - Boston, MA

**Projects:**
- Website Redesign (WEB)
- Mobile App (MOB)
- API Development (API)

## Troubleshooting

### Port Already in Use

**Backend (8000):**
```bash
# Find process
lsof -ti:8000
# Kill process
kill -9 $(lsof -ti:8000)
```

**Frontend (3000):**
```bash
# Find process
lsof -ti:3000
# Kill process
kill -9 $(lsof -ti:3000)
```

### Database Issues

Delete the database and recreate:
```bash
cd backend
rm jira_tickets.db
python seed_data.py
```

### Module Not Found

Make sure virtual environment is activated:
```bash
source venv/bin/activate  # macOS/Linux
venv\Scripts\activate     # Windows
```

### npm Installation Fails

Try clearing cache:
```bash
npm cache clean --force
rm -rf node_modules package-lock.json
npm install
```

## Next Steps

1. Create your first project
2. Add tickets to the board
3. Drag tickets between columns
4. Add comments and assign team members
5. Explore the API docs at `http://localhost:8000/docs`

## Development Tips

- **Hot Reload**: Both frontend and backend support hot reload
- **API Docs**: FastAPI provides interactive API docs at `/docs`
- **Database Viewer**: Use DB Browser for SQLite to inspect the database
- **React DevTools**: Install React Developer Tools browser extension

Enjoy using TaskFlow! 🚀

