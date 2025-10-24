#!/bin/bash

# TaskFlow Startup Script
# This script starts both backend and frontend servers

echo "🚀 Starting TaskFlow..."

# Colors for output
GREEN='\033[0;32m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to check if a port is in use
check_port() {
    if lsof -Pi :$1 -sTCP:LISTEN -t >/dev/null ; then
        echo "⚠️  Port $1 is already in use. Please stop the process or change the port."
        return 1
    fi
    return 0
}

# Check if ports are available
check_port 8000 || exit 1
check_port 3000 || exit 1

# Start backend
echo -e "${BLUE}Starting Backend...${NC}"
cd backend

# Check if virtual environment exists
if [ ! -d "venv" ]; then
    echo "Creating virtual environment..."
    python3 -m venv venv
fi

# Activate virtual environment
source venv/bin/activate

# Install dependencies if needed
if [ ! -f ".dependencies_installed" ]; then
    echo "Installing backend dependencies..."
    pip install -r requirements.txt
    touch .dependencies_installed
fi

# Check if database exists, if not seed it
if [ ! -f "jira_tickets.db" ]; then
    echo "Seeding database with sample data..."
    python seed_data.py
fi

# Start backend server in background
echo "Starting FastAPI server on http://localhost:8000"
uvicorn main:app --reload > ../backend.log 2>&1 &
BACKEND_PID=$!
cd ..

# Wait for backend to start
sleep 3

# Start frontend
echo -e "${BLUE}Starting Frontend...${NC}"
cd frontend

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
    echo "Installing frontend dependencies..."
    npm install
fi

# Start frontend server
echo "Starting React dev server on http://localhost:3000"
npm run dev > ../frontend.log 2>&1 &
FRONTEND_PID=$!
cd ..

# Wait a moment for servers to start
sleep 3

echo ""
echo -e "${GREEN}✅ TaskFlow is running!${NC}"
echo ""
echo "📍 Frontend: http://localhost:3000"
echo "📍 Backend API: http://localhost:8000"
echo "📍 API Docs: http://localhost:8000/docs"
echo ""
echo "📝 Logs:"
echo "   Backend: tail -f backend.log"
echo "   Frontend: tail -f frontend.log"
echo ""
echo "⏹  To stop: Press Ctrl+C"
echo ""

# Function to cleanup on exit
cleanup() {
    echo ""
    echo "🛑 Stopping TaskFlow..."
    kill $BACKEND_PID 2>/dev/null
    kill $FRONTEND_PID 2>/dev/null
    echo "✅ Stopped"
    exit 0
}

# Set trap to catch Ctrl+C
trap cleanup INT TERM

# Keep script running
wait

