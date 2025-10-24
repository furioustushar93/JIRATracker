from pydantic import BaseModel
from typing import Optional, List
from datetime import datetime
from enum import Enum

class TicketStatus(str, Enum):
    TODO = "To Do"
    IN_PROGRESS = "In Progress"
    IN_REVIEW = "In Review"
    DONE = "Done"

class TicketPriority(str, Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class TicketType(str, Enum):
    BUG = "Bug"
    FEATURE = "Feature"
    TASK = "Task"
    STORY = "Story"

class UserRole(str, Enum):
    ADMIN = "Admin"
    MANAGER = "Manager"
    DEVELOPER = "Developer"
    DESIGNER = "Designer"
    QA = "QA Engineer"
    PRODUCT_OWNER = "Product Owner"
    SCRUM_MASTER = "Scrum Master"
    VIEWER = "Viewer"

# User schemas
class UserBase(BaseModel):
    username: str
    email: str
    full_name: str
    avatar_url: Optional[str] = None
    role: UserRole = UserRole.DEVELOPER
    job_title: Optional[str] = None
    department: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    manager_id: Optional[int] = None
    is_active: bool = True

class UserCreate(UserBase):
    pass

class UserUpdate(BaseModel):
    username: Optional[str] = None
    email: Optional[str] = None
    full_name: Optional[str] = None
    avatar_url: Optional[str] = None
    role: Optional[UserRole] = None
    job_title: Optional[str] = None
    department: Optional[str] = None
    phone: Optional[str] = None
    location: Optional[str] = None
    bio: Optional[str] = None
    manager_id: Optional[int] = None
    is_active: Optional[bool] = None

class User(UserBase):
    id: int
    date_joined: Optional[datetime] = None
    manager: Optional['User'] = None
    
    class Config:
        from_attributes = True

# Project schemas
class ProjectBase(BaseModel):
    name: str
    key: str
    description: Optional[str] = None

class ProjectCreate(ProjectBase):
    pass

class Project(ProjectBase):
    id: int
    
    class Config:
        from_attributes = True

# Comment schemas
class CommentBase(BaseModel):
    content: str
    ticket_id: int
    author_id: int

class CommentCreate(CommentBase):
    pass

class Comment(CommentBase):
    id: int
    created_at: datetime
    author: Optional[User] = None
    
    class Config:
        from_attributes = True

# Ticket schemas
class TicketBase(BaseModel):
    title: str
    description: Optional[str] = None
    status: TicketStatus = TicketStatus.TODO
    priority: TicketPriority = TicketPriority.MEDIUM
    type: TicketType = TicketType.TASK
    project_id: int
    assignee_id: Optional[int] = None

class TicketCreate(TicketBase):
    pass

class TicketUpdate(BaseModel):
    title: Optional[str] = None
    description: Optional[str] = None
    status: Optional[TicketStatus] = None
    priority: Optional[TicketPriority] = None
    type: Optional[TicketType] = None
    assignee_id: Optional[int] = None

class Ticket(TicketBase):
    id: int
    created_at: datetime
    updated_at: datetime
    project: Optional[Project] = None
    assignee: Optional[User] = None
    
    class Config:
        from_attributes = True

