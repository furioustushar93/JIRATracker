import { useState, useEffect } from 'react';
import { X, MessageSquare, Trash2 } from 'lucide-react';
import { format } from 'date-fns';
import { updateTicket, deleteTicket, getTicketComments, createComment } from '../api';
import { Ticket, TicketStatus, TicketPriority, TicketType, User, Comment } from '../types';

interface Props {
  ticket: Ticket;
  users: User[];
  onClose: () => void;
  onUpdate: () => void;
}

export default function TicketDetailModal({ ticket, users, onClose, onUpdate }: Props) {
  const [formData, setFormData] = useState({
    title: ticket.title,
    description: ticket.description || '',
    type: ticket.type,
    priority: ticket.priority,
    status: ticket.status,
    assignee_id: ticket.assignee_id,
  });
  const [comments, setComments] = useState<Comment[]>([]);
  const [newComment, setNewComment] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadComments();
  }, []);

  const loadComments = async () => {
    try {
      const response = await getTicketComments(ticket.id);
      setComments(response.data);
    } catch (error) {
      console.error('Error loading comments:', error);
    }
  };

  const handleUpdate = async () => {
    setLoading(true);
    try {
      await updateTicket(ticket.id, formData);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error updating ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleDelete = async () => {
    if (!confirm('Are you sure you want to delete this ticket?')) return;

    setLoading(true);
    try {
      await deleteTicket(ticket.id);
      onUpdate();
      onClose();
    } catch (error) {
      console.error('Error deleting ticket:', error);
    } finally {
      setLoading(false);
    }
  };

  const handleAddComment = async () => {
    if (!newComment.trim()) return;

    try {
      await createComment({
        content: newComment,
        ticket_id: ticket.id,
        author_id: users[0]?.id || 1, // Using first user for demo
      });
      setNewComment('');
      await loadComments();
    } catch (error) {
      console.error('Error adding comment:', error);
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">Ticket Details</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={handleDelete}
              className="p-2 text-red-600 hover:bg-red-50 rounded-lg"
              disabled={loading}
            >
              <Trash2 className="w-5 h-5" />
            </button>
            <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="grid grid-cols-3 gap-6">
            <div className="col-span-2 space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Title</label>
                <input
                  type="text"
                  className="input"
                  value={formData.title}
                  onChange={(e) => setFormData({ ...formData, title: e.target.value })}
                />
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Description
                </label>
                <textarea
                  className="input"
                  rows={6}
                  value={formData.description}
                  onChange={(e) => setFormData({ ...formData, description: e.target.value })}
                />
              </div>

              <div className="border-t border-gray-200 pt-4">
                <div className="flex items-center space-x-2 mb-3">
                  <MessageSquare className="w-5 h-5 text-gray-600" />
                  <h3 className="font-semibold text-gray-900">
                    Comments ({comments.length})
                  </h3>
                </div>

                <div className="space-y-3 mb-4">
                  {comments.map((comment) => (
                    <div key={comment.id} className="bg-gray-50 rounded-lg p-3">
                      <div className="flex items-center space-x-2 mb-1">
                        <span className="text-sm font-medium text-gray-900">
                          {comment.author?.full_name || 'Unknown'}
                        </span>
                        <span className="text-xs text-gray-500">
                          {format(new Date(comment.created_at), 'MMM d, yyyy h:mm a')}
                        </span>
                      </div>
                      <p className="text-sm text-gray-700">{comment.content}</p>
                    </div>
                  ))}
                </div>

                <div className="flex space-x-2">
                  <input
                    type="text"
                    className="input flex-1"
                    placeholder="Add a comment..."
                    value={newComment}
                    onChange={(e) => setNewComment(e.target.value)}
                    onKeyPress={(e) => e.key === 'Enter' && handleAddComment()}
                  />
                  <button onClick={handleAddComment} className="btn-primary">
                    Add
                  </button>
                </div>
              </div>
            </div>

            <div className="space-y-4">
              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Type</label>
                <select
                  className="input"
                  value={formData.type}
                  onChange={(e) => setFormData({ ...formData, type: e.target.value as TicketType })}
                >
                  {Object.values(TicketType).map((type) => (
                    <option key={type} value={type}>
                      {type}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Priority</label>
                <select
                  className="input"
                  value={formData.priority}
                  onChange={(e) =>
                    setFormData({ ...formData, priority: e.target.value as TicketPriority })
                  }
                >
                  {Object.values(TicketPriority).map((priority) => (
                    <option key={priority} value={priority}>
                      {priority}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Status</label>
                <select
                  className="input"
                  value={formData.status}
                  onChange={(e) =>
                    setFormData({ ...formData, status: e.target.value as TicketStatus })
                  }
                >
                  {Object.values(TicketStatus).map((status) => (
                    <option key={status} value={status}>
                      {status}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">Assignee</label>
                <select
                  className="input"
                  value={formData.assignee_id || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      assignee_id: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                >
                  <option value="">Unassigned</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name}
                    </option>
                  ))}
                </select>
              </div>

              <div className="border-t border-gray-200 pt-4 text-xs text-gray-600 space-y-2">
                <div>
                  <span className="font-medium">Created:</span>
                  <br />
                  {format(new Date(ticket.created_at), 'MMM d, yyyy h:mm a')}
                </div>
                <div>
                  <span className="font-medium">Updated:</span>
                  <br />
                  {format(new Date(ticket.updated_at), 'MMM d, yyyy h:mm a')}
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="flex space-x-3 p-6 border-t border-gray-200">
          <button onClick={handleUpdate} className="btn-primary flex-1" disabled={loading}>
            {loading ? 'Saving...' : 'Save Changes'}
          </button>
          <button onClick={onClose} className="btn-secondary flex-1">
            Cancel
          </button>
        </div>
      </div>
    </div>
  );
}

