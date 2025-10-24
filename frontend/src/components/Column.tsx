import { useDroppable } from '@dnd-kit/core';
import { SortableContext, verticalListSortingStrategy } from '@dnd-kit/sortable';
import { Ticket, TicketStatus } from '../types';
import TicketCard from './TicketCard';

interface Props {
  id: TicketStatus;
  title: string;
  tickets: Ticket[];
  onTicketClick: (ticket: Ticket) => void;
}

export default function Column({ id, title, tickets, onTicketClick }: Props) {
  const { setNodeRef } = useDroppable({ id });

  return (
    <div className="flex flex-col bg-gray-100 rounded-lg p-3 min-h-[600px]">
      <div className="flex items-center justify-between mb-3">
        <h3 className="font-semibold text-gray-900 text-sm uppercase tracking-wide">
          {title}
        </h3>
        <span className="text-xs text-gray-500 bg-gray-200 px-2 py-1 rounded-full">
          {tickets.length}
        </span>
      </div>

      <SortableContext
        id={id}
        items={tickets.map((t) => t.id)}
        strategy={verticalListSortingStrategy}
      >
        <div ref={setNodeRef} className="space-y-2 flex-1">
          {tickets.map((ticket) => (
            <TicketCard key={ticket.id} ticket={ticket} onClick={onTicketClick} />
          ))}
        </div>
      </SortableContext>
    </div>
  );
}

