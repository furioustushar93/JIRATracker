# User Profile System Documentation

## Overview

TaskFlow includes a comprehensive user profile system that allows you to manage team members with detailed information including roles, departments, reporting structure, and more.

## User Roles

The system supports 8 predefined roles:

| Role | Description | Typical Use Case |
|------|-------------|------------------|
| **Admin** | Full system access | System administrators, technical leads |
| **Manager** | Team management | Engineering managers, department heads |
| **Developer** | Software development | Backend, frontend, full-stack developers |
| **Designer** | Design work | UI/UX designers, graphic designers |
| **QA Engineer** | Quality assurance | Testers, QA specialists |
| **Product Owner** | Product management | Product managers, business analysts |
| **Scrum Master** | Agile facilitation | Scrum masters, agile coaches |
| **Viewer** | Read-only access | Stakeholders, observers |

## User Profile Fields

### Required Fields
- **Username**: Unique identifier for the user
- **Email**: User's email address
- **Full Name**: Display name
- **Role**: User's role in the organization

### Optional Fields
- **Job Title**: Official job title (e.g., "Senior Software Engineer")
- **Department**: Department or team (e.g., "Engineering", "Design")
- **Phone**: Contact phone number
- **Location**: Physical location (e.g., "San Francisco, CA")
- **Bio**: Brief description about the user
- **Manager**: User's direct manager (creates reporting hierarchy)
- **Avatar URL**: Profile picture URL
- **Active Status**: Whether the user is currently active

### System Fields
- **User ID**: Unique identifier (auto-generated)
- **Date Joined**: When the user was added to the system

## Features

### 1. Viewing User Profiles

Navigate to the **Team** page to see all users. Each user card displays:
- Name and username
- Role badge (color-coded)
- Job title
- Location
- Email
- Active status

Click on any user card to view their detailed profile.

### 2. Creating Users

1. Click "Add User" button on the Team page
2. Fill in the form:
   - **Required**: Full Name, Username, Email, Role
   - **Optional**: All other fields
3. Select a manager from the dropdown to establish reporting relationships
4. Click "Add User"

### 3. Editing User Profiles

1. Click on a user card to open their profile
2. Click "Edit Profile" button
3. Update any fields
4. Click "Save Changes"

### 4. Manager Relationships

Users can be assigned to managers, creating an organizational hierarchy:
- Each user can have one manager
- Managers can have multiple subordinates
- This creates a reporting structure visible in profiles

**Example Hierarchy:**
```
John Doe (Engineering Manager)
├── Jane Smith (Senior Full Stack Developer)
├── Bob Wilson (Senior UX Designer)
└── Alice Johnson (QA Lead)
```

### 5. Department Organization

Users can be grouped by department:
- Engineering
- Design
- Product
- Quality Assurance
- Sales
- Marketing
- etc.

This helps in organizing teams and filtering users.

### 6. Active/Inactive Status

Users can be marked as active or inactive:
- **Active**: User is currently working and can be assigned tickets
- **Inactive**: User is no longer active (offboarded, on leave, etc.)

Inactive users:
- Are still visible in the system
- Cannot be assigned new tickets (recommended)
- Historical data remains intact

## Backend API

### Get All Users
```http
GET /api/users/
```

**Response:**
```json
[
  {
    "id": 1,
    "username": "john_doe",
    "email": "john@example.com",
    "full_name": "John Doe",
    "role": "Admin",
    "job_title": "Engineering Manager",
    "department": "Engineering",
    "phone": "+1-555-0101",
    "location": "San Francisco, CA",
    "bio": "Experienced engineering manager...",
    "manager_id": null,
    "date_joined": "2024-01-15T10:00:00",
    "is_active": true,
    "manager": null
  }
]
```

### Get Single User
```http
GET /api/users/{user_id}
```

### Create User
```http
POST /api/users/
Content-Type: application/json

{
  "username": "john_doe",
  "email": "john@example.com",
  "full_name": "John Doe",
  "role": "Developer",
  "job_title": "Software Engineer",
  "department": "Engineering",
  "phone": "+1-555-0100",
  "location": "San Francisco, CA",
  "bio": "Software engineer passionate about clean code",
  "manager_id": 2,
  "is_active": true
}
```

### Update User
```http
PUT /api/users/{user_id}
Content-Type: application/json

{
  "role": "Senior Developer",
  "job_title": "Senior Software Engineer",
  "manager_id": 3
}
```

## Frontend Integration

### Types (TypeScript)

```typescript
enum UserRole {
  ADMIN = "Admin",
  MANAGER = "Manager",
  DEVELOPER = "Developer",
  DESIGNER = "Designer",
  QA = "QA Engineer",
  PRODUCT_OWNER = "Product Owner",
  SCRUM_MASTER = "Scrum Master",
  VIEWER = "Viewer"
}

interface User {
  id: number;
  username: string;
  email: string;
  full_name: string;
  avatar_url?: string;
  role: UserRole;
  job_title?: string;
  department?: string;
  phone?: string;
  location?: string;
  bio?: string;
  manager_id?: number;
  date_joined?: string;
  is_active: boolean;
  manager?: User;
}
```

### Components

- **UserManagement**: Main page displaying all users
- **UserProfileModal**: Detailed profile view and editing
- User cards show role badges with color coding

## Best Practices

1. **Set Up Managers Early**: Establish the organizational hierarchy when adding users
2. **Use Consistent Departments**: Define a standard set of department names
3. **Keep Bios Professional**: Use the bio field for work-related information
4. **Update Locations**: Keep location information current for remote/distributed teams
5. **Manage Active Status**: Mark users as inactive when they leave rather than deleting
6. **Assign Appropriate Roles**: Use roles to indicate actual responsibilities
7. **Complete Profiles**: Fill in as many fields as possible for better team visibility

## Future Enhancements

Planned features for user profiles:

- [ ] User avatars and profile pictures
- [ ] Skills and expertise tags
- [ ] Working hours and availability
- [ ] Team membership (multiple teams)
- [ ] Performance metrics
- [ ] Calendar integration
- [ ] Direct messaging
- [ ] Activity timeline
- [ ] Custom fields per organization

## Troubleshooting

**Issue**: Manager dropdown is empty
- **Solution**: Create at least one user before assigning managers

**Issue**: User roles not displaying correctly
- **Solution**: Ensure role enum matches backend (check for typos)

**Issue**: Cannot update user profile
- **Solution**: Check that user_id is valid and user exists

**Issue**: Inactive users still show up everywhere
- **Solution**: Add filtering in ticket assignment and other features (future enhancement)

---

For more information, see the main [README.md](README.md) or open an issue on GitHub.

