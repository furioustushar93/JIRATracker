export enum TicketStatus {
  TODO = "To Do",
  IN_PROGRESS = "In Progress",
  IN_REVIEW = "In Review",
  DONE = "Done"
}

export enum TicketPriority {
  LOW = "Low",
  MEDIUM = "Medium",
  HIGH = "High",
  CRITICAL = "Critical"
}

export enum TicketType {
  BUG = "Bug",
  FEATURE = "Feature",
  TASK = "Task",
  STORY = "Story"
}

export enum UserRole {
  ADMIN = "Admin",
  MANAGER = "Manager",
  DEVELOPER = "Developer",
  DESIGNER = "Designer",
  QA = "QA Engineer",
  PRODUCT_OWNER = "Product Owner",
  SCRUM_MASTER = "Scrum Master",
  VIEWER = "Viewer"
}

export interface User {
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

export interface Project {
  id: number;
  name: string;
  key: string;
  description?: string;
}

export interface Ticket {
  id: number;
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  project_id: number;
  assignee_id?: number;
  created_at: string;
  updated_at: string;
  project?: Project;
  assignee?: User;
}

export interface Comment {
  id: number;
  content: string;
  ticket_id: number;
  author_id: number;
  created_at: string;
  author?: User;
}

export interface TicketCreate {
  title: string;
  description?: string;
  status: TicketStatus;
  priority: TicketPriority;
  type: TicketType;
  project_id: number;
  assignee_id?: number;
}

export interface TicketUpdate {
  title?: string;
  description?: string;
  status?: TicketStatus;
  priority?: TicketPriority;
  type?: TicketType;
  assignee_id?: number;
}

