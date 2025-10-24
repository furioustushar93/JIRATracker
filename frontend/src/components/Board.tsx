import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { Plus } from 'lucide-react';
import {
  DndContext,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
  PointerSensor,
  useSensor,
  useSensors,
} from '@dnd-kit/core';
import { getTickets, getProjects, updateTicket, getUsers } from '../api';
import { Ticket, TicketStatus, User, Project } from '../types';
import Column from './Column';
import TicketCard from './TicketCard';
import CreateTicketModal from './CreateTicketModal';
import TicketDetailModal from './TicketDetailModal';

export default function Board() {
  const { projectId } = useParams();
  const [tickets, setTickets] = useState<Ticket[]>([]);
  const [users, setUsers] = useState<User[]>([]);
  const [projects, setProjects] = useState<Project[]>([]);
  const [selectedProject, setSelectedProject] = useState<number | null>(null);
  const [activeTicket, setActiveTicket] = useState<Ticket | null>(null);
  const [isCreateModalOpen, setIsCreateModalOpen] = useState(false);
  const [selectedTicket, setSelectedTicket] = useState<Ticket | null>(null);
  const [loading, setLoading] = useState(true);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns = [
    { id: TicketStatus.TODO, title: 'To Do' },
    { id: TicketStatus.IN_PROGRESS, title: 'In Progress' },
    { id: TicketStatus.IN_REVIEW, title: 'In Review' },
    { id: TicketStatus.DONE, title: 'Done' },
  ];

  useEffect(() => {
    loadData();
  }, [projectId, selectedProject]);

  const loadData = async () => {
    try {
      setLoading(true);
      const [ticketsRes, usersRes, projectsRes] = await Promise.all([
        getTickets(projectId ? parseInt(projectId) : selectedProject || undefined),
        getUsers(),
        getProjects(),
      ]);
      setTickets(ticketsRes.data);
      setUsers(usersRes.data);
      setProjects(projectsRes.data);
      
      if (projectId && !selectedProject) {
        setSelectedProject(parseInt(projectId));
      }
    } catch (error) {
      console.error('Error loading data:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDragStart = (event: DragStartEvent) => {
    const ticket = tickets.find((t) => t.id === event.active.id);
    if (ticket) {
      setActiveTicket(ticket);
    }
  };

  const handleDragEnd = async (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveTicket(null);

    if (!over) return;

    const ticketId = active.id as number;
    const newStatus = over.id as TicketStatus;

    const ticket = tickets.find((t) => t.id === ticketId);
    if (!ticket || ticket.status === newStatus) return;

    try {
      await updateTicket(ticketId, { status: newStatus });
      setTickets((prev) =>
        prev.map((t) => (t.id === ticketId ? { ...t, status: newStatus } : t))
      );
    } catch (error) {
      console.error('Error updating ticket:', error);
    }
  };

  const getTicketsByStatus = (status: TicketStatus) => {
    return tickets.filter((ticket) => ticket.status === status);
  };

  if (loading) {
    return (
      <div className="flex items-center justify-center h-64">
        <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-primary-600"></div>
      </div>
    );
  }

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Board</h1>
          <div className="flex items-center space-x-3 mt-2">
            <label className="text-sm text-gray-600">Project:</label>
            <select
              className="input py-1 text-sm"
              value={selectedProject || ''}
              onChange={(e) => setSelectedProject(parseInt(e.target.value))}
            >
              <option value="">All Projects</option>
              {projects.map((project) => (
                <option key={project.id} value={project.id}>
                  {project.name} ({project.key})
                </option>
              ))}
            </select>
          </div>
        </div>
        <button
          onClick={() => setIsCreateModalOpen(true)}
          className="btn-primary flex items-center space-x-2"
          disabled={!selectedProject && projects.length > 0}
        >
          <Plus className="w-5 h-5" />
          <span>New Ticket</span>
        </button>
      </div>

      {projects.length === 0 ? (
        <div className="text-center py-16">
          <h3 className="text-lg font-medium text-gray-900 mb-2">No projects found</h3>
          <p className="text-gray-600">Create a project first to start adding tickets</p>
        </div>
      ) : (
        <DndContext
          sensors={sensors}
          onDragStart={handleDragStart}
          onDragEnd={handleDragEnd}
        >
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4">
            {columns.map((column) => (
              <Column
                key={column.id}
                id={column.id}
                title={column.title}
                tickets={getTicketsByStatus(column.id)}
                onTicketClick={setSelectedTicket}
              />
            ))}
          </div>

          <DragOverlay>
            {activeTicket ? (
              <div className="rotate-3 opacity-80">
                <TicketCard ticket={activeTicket} onClick={() => {}} />
              </div>
            ) : null}
          </DragOverlay>
        </DndContext>
      )}

      {isCreateModalOpen && selectedProject && (
        <CreateTicketModal
          projectId={selectedProject}
          users={users}
          onClose={() => setIsCreateModalOpen(false)}
          onCreated={loadData}
        />
      )}

      {selectedTicket && (
        <TicketDetailModal
          ticket={selectedTicket}
          users={users}
          onClose={() => setSelectedTicket(null)}
          onUpdate={loadData}
        />
      )}
    </div>
  );
}

