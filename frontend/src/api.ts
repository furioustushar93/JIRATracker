import axios from 'axios';
import { Project, Ticket, User, Comment, TicketCreate, TicketUpdate } from './types';

const api = axios.create({
  baseURL: 'http://localhost:8000/api',
  headers: {
    'Content-Type': 'application/json',
  },
});

// Projects
export const getProjects = () => api.get<Project[]>('/projects/');
export const getProject = (id: number) => api.get<Project>(`/projects/${id}`);
export const createProject = (data: Omit<Project, 'id'>) => api.post<Project>('/projects/', data);

// Tickets
export const getTickets = (projectId?: number) => {
  const params = projectId ? { project_id: projectId } : {};
  return api.get<Ticket[]>('/tickets/', { params });
};
export const getTicket = (id: number) => api.get<Ticket>(`/tickets/${id}`);
export const createTicket = (data: TicketCreate) => api.post<Ticket>('/tickets/', data);
export const updateTicket = (id: number, data: TicketUpdate) => api.put<Ticket>(`/tickets/${id}`, data);
export const deleteTicket = (id: number) => api.delete(`/tickets/${id}`);

// Users
export const getUsers = () => api.get<User[]>('/users/');
export const getUser = (id: number) => api.get<User>(`/users/${id}`);
export const createUser = (data: Omit<User, 'id' | 'date_joined' | 'manager'>) => api.post<User>('/users/', data);
export const updateUser = (id: number, data: Partial<User>) => api.put<User>(`/users/${id}`, data);

// Comments
export const getTicketComments = (ticketId: number) => api.get<Comment[]>(`/tickets/${ticketId}/comments`);
export const createComment = (data: Omit<Comment, 'id' | 'created_at'>) => api.post<Comment>('/comments/', data);

export default api;

