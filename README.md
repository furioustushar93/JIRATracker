# TaskFlow - JIRA-like Ticketing System

A modern, full-stack project management and ticketing system inspired by JIRA, built with Python (FastAPI) backend and React TypeScript frontend.

## ✨ Features

- 📊 **Kanban Board** - Drag-and-drop tickets between columns (To Do, In Progress, In Review, Done)
- 🎫 **Ticket Management** - Create, update, and delete tickets with rich details
- 📁 **Project Organization** - Organize tickets into different projects
- 👥 **User Management** - Comprehensive user profiles with roles, departments, and reporting structure
  - 8 predefined roles: Admin, Manager, Developer, Designer, QA Engineer, Product Owner, Scrum Master, Viewer
  - Manager/subordinate relationships
  - Department and location tracking
  - Contact information (email, phone)
  - Bio and job title
  - Active/inactive status
- 💬 **Comments** - Add comments and discussions to tickets
- 🎨 **Modern UI** - Beautiful, responsive interface built with TailwindCSS
- 🚀 **Real-time Updates** - Instant UI updates for all operations

## 🛠️ Tech Stack

### Backend
- **FastAPI** - Modern, fast Python web framework
- **SQLAlchemy** - SQL toolkit and ORM
- **SQLite** - Lightweight database (easily switchable to PostgreSQL)
- **Pydantic** - Data validation using Python type hints

### Frontend
- **React 18** - Modern React with hooks
- **TypeScript** - Type-safe JavaScript
- **Vite** - Fast build tool and dev server
- **TailwindCSS** - Utility-first CSS framework
- **@dnd-kit** - Modern drag-and-drop library
- **React Router** - Client-side routing
- **Axios** - HTTP client
- **Lucide React** - Beautiful icon library
- **date-fns** - Date utility library

## 📋 Prerequisites

- Python 3.8 or higher
- Node.js 16 or higher
- npm or yarn

## 🚀 Getting Started

### 1. Clone the Repository

```bash
cd JIRA_Ticket
```

### 2. Backend Setup

```bash
# Navigate to backend directory
cd backend

# Create a virtual environment (recommended)
python -m venv venv
source venv/bin/activate  # On Windows: venv\Scripts\activate

# Install dependencies
pip install -r requirements.txt

# Seed the database with sample data
python seed_data.py

# Start the backend server
uvicorn main:app --reload
```

The backend API will be available at `http://localhost:8000`

API Documentation (Swagger UI): `http://localhost:8000/docs`

### 3. Frontend Setup

Open a new terminal window:

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Start the development server
npm run dev
```

The frontend will be available at `http://localhost:3000`

## 📖 Usage Guide

### Creating a Project

1. Navigate to the home page
2. Click "New Project" button
3. Enter project name, key (auto-generated), and description
4. Click "Create Project"

### Working with Tickets

1. Go to the Board view
2. Select a project from the dropdown
3. Click "New Ticket" to create a ticket
4. Fill in the details:
   - **Title**: Brief summary of the task
   - **Description**: Detailed information
   - **Type**: Bug, Feature, Task, or Story
   - **Priority**: Low, Medium, High, or Critical
   - **Status**: To Do, In Progress, In Review, or Done
   - **Assignee**: Team member responsible

### Drag-and-Drop

- Simply click and drag any ticket card to move it between columns
- The status will automatically update

### Ticket Details

- Click on any ticket card to view full details
- Edit any field directly in the modal
- Add comments for team collaboration
- Delete tickets if needed

### User Profiles

- Click on any user card in the Team section to view their profile
- View comprehensive information:
  - Role and job title
  - Department and location
  - Contact information
  - Manager and reporting structure
  - Bio and join date
- Edit profiles to update:
  - Personal information
  - Role and job title
  - Department and location
  - Manager assignment
  - Active status

## 🏗️ Project Structure

```
JIRA_Ticket/
├── backend/
│   ├── main.py              # FastAPI application and routes
│   ├── models.py            # SQLAlchemy database models
│   ├── schemas.py           # Pydantic schemas for validation
│   ├── database.py          # Database configuration
│   ├── seed_data.py         # Script to populate sample data
│   ├── requirements.txt     # Python dependencies
│   └── jira_tickets.db      # SQLite database (auto-generated)
│
├── frontend/
│   ├── src/
│   │   ├── components/      # React components
│   │   │   ├── Board.tsx
│   │   │   ├── Column.tsx
│   │   │   ├── TicketCard.tsx
│   │   │   ├── TicketDetailModal.tsx
│   │   │   ├── CreateTicketModal.tsx
│   │   │   ├── ProjectList.tsx
│   │   │   └── CreateProjectModal.tsx
│   │   ├── api.ts           # API client functions
│   │   ├── types.ts         # TypeScript type definitions
│   │   ├── App.tsx          # Main application component
│   │   ├── main.tsx         # Application entry point
│   │   └── index.css        # Global styles
│   ├── index.html
│   ├── package.json
│   ├── tsconfig.json
│   ├── vite.config.ts
│   └── tailwind.config.js
│
└── README.md
```

## 🔌 API Endpoints

### Projects
- `GET /api/projects/` - List all projects
- `POST /api/projects/` - Create a new project
- `GET /api/projects/{id}` - Get project details

### Tickets
- `GET /api/tickets/` - List all tickets (filter by project_id)
- `POST /api/tickets/` - Create a new ticket
- `GET /api/tickets/{id}` - Get ticket details
- `PUT /api/tickets/{id}` - Update a ticket
- `DELETE /api/tickets/{id}` - Delete a ticket

### Users
- `GET /api/users/` - List all users
- `GET /api/users/{id}` - Get user details
- `POST /api/users/` - Create a new user
- `PUT /api/users/{id}` - Update a user profile

### Comments
- `GET /api/tickets/{ticket_id}/comments` - Get ticket comments
- `POST /api/comments/` - Add a comment

## 🎨 Customization

### Change Database to PostgreSQL

Edit `backend/database.py`:

```python
SQLALCHEMY_DATABASE_URL = "postgresql://user:password@localhost/dbname"

engine = create_engine(SQLALCHEMY_DATABASE_URL)
```

### Modify Ticket Statuses

Edit both:
- `backend/models.py` - TicketStatus enum
- `frontend/src/types.ts` - TicketStatus enum

### Change Color Theme

Edit `frontend/tailwind.config.js` to customize colors:

```javascript
theme: {
  extend: {
    colors: {
      primary: {
        // Your custom colors
      },
    },
  },
}
```

## 🔐 Authentication (Future Enhancement)

Currently, the system uses a simple user model without authentication. To add authentication:

1. Implement JWT token-based auth in FastAPI
2. Add login/signup pages in React
3. Store auth tokens in localStorage
4. Add auth middleware to protect routes

## 🚀 Deployment

### Backend

```bash
# Install production server
pip install gunicorn

# Run with gunicorn
gunicorn main:app --workers 4 --worker-class uvicorn.workers.UvicornWorker --bind 0.0.0.0:8000
```

### Frontend

```bash
# Build for production
npm run build

# Preview production build
npm run preview
```

Deploy the `dist` folder to any static hosting service (Vercel, Netlify, etc.)

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

## 📝 License

This project is open source and available under the MIT License.

## 🙏 Acknowledgments

- Inspired by Atlassian JIRA
- Built with modern web technologies
- Icons by Lucide

## 📧 Support

For questions or support, please open an issue on GitHub.

---

Built with ❤️ using Python and React

