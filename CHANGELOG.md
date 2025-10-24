# Changelog

All notable changes to TaskFlow will be documented in this file.

## [1.1.0] - 2025-10-24

### Added - Enhanced User Profile System

#### Backend Changes
- **New User Fields**:
  - `role` - User role with 8 predefined options (Admin, Manager, Developer, Designer, QA Engineer, Product Owner, Scrum Master, Viewer)
  - `job_title` - Official job title
  - `department` - Department or team
  - `phone` - Contact phone number
  - `location` - Physical location
  - `bio` - Brief description
  - `manager_id` - Foreign key to establish manager relationships
  - `date_joined` - Timestamp when user was added
  - `is_active` - Active/inactive status

- **New API Endpoints**:
  - `GET /api/users/{id}` - Get single user details
  - `PUT /api/users/{id}` - Update user profile

- **Enhanced Database Schema**:
  - Added `UserRole` enum
  - Added self-referencing foreign key for manager relationships
  - Updated User model with all new fields

#### Frontend Changes
- **New Components**:
  - `UserProfileModal` - Comprehensive profile view and editing interface
  - Enhanced `UserManagement` with profile cards

- **User Interface Improvements**:
  - Color-coded role badges
  - Profile cards showing key information (role, job title, location)
  - Click-to-view detailed profiles
  - Inline profile editing
  - Manager assignment dropdown
  - Active/inactive status indicators

- **Enhanced Features**:
  - Create users with full profile information
  - View user profiles with all details
  - Edit profiles inline
  - See manager relationships
  - Visual role indicators

#### Sample Data
- Updated seed script with 5 sample users instead of 3
- Each user has complete profile information
- Established manager relationships (reporting structure)
- Multiple departments represented

### Technical Details

**Database Migration**:
```
- Deleted old database
- Recreated with new schema
- Seeded with enhanced user profiles
```

**Breaking Changes**:
- User model structure changed (requires database recreation)
- User API responses now include additional fields

### Documentation
- Added `USER_PROFILES.md` - Comprehensive guide to user profile system
- Updated `README.md` with user management features
- Updated `SETUP.md` with new sample data
- Created this `CHANGELOG.md`

---

## [1.0.0] - 2025-10-24

### Initial Release

#### Features
- Kanban board with drag-and-drop
- Ticket management (CRUD operations)
- Project organization
- Basic user management
- Comments system
- FastAPI backend
- React TypeScript frontend
- TailwindCSS styling
- SQLite database
- Interactive API documentation

#### Components
- Board view with 4 columns
- Ticket cards with priorities and types
- Project management
- User assignment
- Comment threads

---

## Version Numbering

We use [Semantic Versioning](https://semver.org/):
- **Major** version for incompatible API changes
- **Minor** version for new functionality in a backwards compatible manner
- **Patch** version for backwards compatible bug fixes

