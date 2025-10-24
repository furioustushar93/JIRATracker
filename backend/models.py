from sqlalchemy import Column, Integer, String, Text, DateTime, ForeignKey, Enum
from sqlalchemy.orm import relationship
from database import Base
import enum

class TicketStatus(enum.Enum):
    TODO = "To Do"
    IN_PROGRESS = "In Progress"
    IN_REVIEW = "In Review"
    DONE = "Done"

class TicketPriority(enum.Enum):
    LOW = "Low"
    MEDIUM = "Medium"
    HIGH = "High"
    CRITICAL = "Critical"

class TicketType(enum.Enum):
    BUG = "Bug"
    FEATURE = "Feature"
    TASK = "Task"
    STORY = "Story"

class UserRole(enum.Enum):
    ADMIN = "Admin"
    MANAGER = "Manager"
    DEVELOPER = "Developer"
    DESIGNER = "Designer"
    QA = "QA Engineer"
    PRODUCT_OWNER = "Product Owner"
    SCRUM_MASTER = "Scrum Master"
    VIEWER = "Viewer"

class Project(Base):
    __tablename__ = "projects"
    
    id = Column(Integer, primary_key=True, index=True)
    name = Column(String, unique=True, index=True)
    key = Column(String, unique=True, index=True)  # e.g., "PROJ"
    description = Column(Text, nullable=True)
    
    tickets = relationship("Ticket", back_populates="project", cascade="all, delete-orphan")

class User(Base):
    __tablename__ = "users"
    
    id = Column(Integer, primary_key=True, index=True)
    username = Column(String, unique=True, index=True)
    email = Column(String, unique=True, index=True)
    full_name = Column(String)
    avatar_url = Column(String, nullable=True)
    role = Column(Enum(UserRole), default=UserRole.DEVELOPER)
    job_title = Column(String, nullable=True)
    department = Column(String, nullable=True)
    phone = Column(String, nullable=True)
    location = Column(String, nullable=True)
    bio = Column(Text, nullable=True)
    manager_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    date_joined = Column(DateTime, nullable=True)
    is_active = Column(Integer, default=1)  # Using Integer for SQLite compatibility
    
    assigned_tickets = relationship("Ticket", back_populates="assignee")
    comments = relationship("Comment", back_populates="author")
    manager = relationship("User", remote_side=[id], backref="team_members")

class Ticket(Base):
    __tablename__ = "tickets"
    
    id = Column(Integer, primary_key=True, index=True)
    title = Column(String, index=True)
    description = Column(Text, nullable=True)
    status = Column(Enum(TicketStatus), default=TicketStatus.TODO)
    priority = Column(Enum(TicketPriority), default=TicketPriority.MEDIUM)
    type = Column(Enum(TicketType), default=TicketType.TASK)
    project_id = Column(Integer, ForeignKey("projects.id"))
    assignee_id = Column(Integer, ForeignKey("users.id"), nullable=True)
    created_at = Column(DateTime)
    updated_at = Column(DateTime)
    
    project = relationship("Project", back_populates="tickets")
    assignee = relationship("User", back_populates="assigned_tickets")
    comments = relationship("Comment", back_populates="ticket", cascade="all, delete-orphan")

class Comment(Base):
    __tablename__ = "comments"
    
    id = Column(Integer, primary_key=True, index=True)
    content = Column(Text)
    ticket_id = Column(Integer, ForeignKey("tickets.id"))
    author_id = Column(Integer, ForeignKey("users.id"))
    created_at = Column(DateTime)
    
    ticket = relationship("Ticket", back_populates="comments")
    author = relationship("User", back_populates="comments")

