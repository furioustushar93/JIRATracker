import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Bug, CheckSquare, Lightbulb, ListTodo } from 'lucide-react';
import { Ticket, TicketType, TicketPriority } from '../types';

interface Props {
  ticket: Ticket;
  onClick: (ticket: Ticket) => void;
}

export default function TicketCard({ ticket, onClick }: Props) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: ticket.id });

  const style = {
    transform: CSS.Transform.toString(transform),
    transition,
    opacity: isDragging ? 0.5 : 1,
  };

  const getTypeIcon = () => {
    switch (ticket.type) {
      case TicketType.BUG:
        return <Bug className="w-4 h-4 text-red-600" />;
      case TicketType.FEATURE:
        return <Lightbulb className="w-4 h-4 text-yellow-600" />;
      case TicketType.STORY:
        return <CheckSquare className="w-4 h-4 text-green-600" />;
      default:
        return <ListTodo className="w-4 h-4 text-blue-600" />;
    }
  };

  const getPriorityColor = () => {
    switch (ticket.priority) {
      case TicketPriority.CRITICAL:
        return 'bg-red-100 text-red-800 border-red-200';
      case TicketPriority.HIGH:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case TicketPriority.MEDIUM:
        return 'bg-yellow-100 text-yellow-800 border-yellow-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      onClick={() => onClick(ticket)}
      className="card hover:shadow-md transition-shadow cursor-pointer bg-white"
    >
      <div className="flex items-start space-x-2 mb-2">
        {getTypeIcon()}
        <div className="flex-1 min-w-0">
          <h4 className="text-sm font-medium text-gray-900 line-clamp-2">
            {ticket.title}
          </h4>
        </div>
      </div>

      {ticket.description && (
        <p className="text-xs text-gray-600 line-clamp-2 mb-3">
          {ticket.description}
        </p>
      )}

      <div className="flex items-center justify-between">
        <span className={`badge border ${getPriorityColor()}`}>
          {ticket.priority}
        </span>
        {ticket.assignee && (
          <div
            className="w-6 h-6 bg-primary-600 rounded-full flex items-center justify-center text-white text-xs font-semibold"
            title={ticket.assignee.full_name}
          >
            {ticket.assignee.full_name.charAt(0).toUpperCase()}
          </div>
        )}
      </div>
    </div>
  );
}

