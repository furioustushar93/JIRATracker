import { useState } from 'react';
import { X } from 'lucide-react';
import { Project } from '../types';

interface Props {
  onClose: () => void;
  onCreate: (data: Omit<Project, 'id'>) => void;
}

export default function CreateProjectModal({ onClose, onCreate }: Props) {
  const [formData, setFormData] = useState({
    name: '',
    key: '',
    description: '',
  });

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    onCreate(formData);
  };

  const handleNameChange = (name: string) => {
    setFormData({
      ...formData,
      name,
      key: name.toUpperCase().replace(/\s+/g, '').slice(0, 5),
    });
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-md p-6">
        <div className="flex justify-between items-center mb-4">
          <h2 className="text-xl font-bold text-gray-900">Create New Project</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Name *
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., Website Redesign"
              value={formData.name}
              onChange={(e) => handleNameChange(e.target.value)}
              required
            />
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Project Key *
            </label>
            <input
              type="text"
              className="input"
              placeholder="e.g., WEB"
              value={formData.key}
              onChange={(e) => setFormData({ ...formData, key: e.target.value.toUpperCase() })}
              maxLength={10}
              required
            />
            <p className="text-xs text-gray-500 mt-1">
              Short identifier for your project (auto-generated)
            </p>
          </div>

          <div>
            <label className="block text-sm font-medium text-gray-700 mb-1">
              Description
            </label>
            <textarea
              className="input"
              rows={3}
              placeholder="Brief description of your project..."
              value={formData.description}
              onChange={(e) => setFormData({ ...formData, description: e.target.value })}
            />
          </div>

          <div className="flex space-x-3 pt-4">
            <button type="submit" className="btn-primary flex-1">
              Create Project
            </button>
            <button type="button" onClick={onClose} className="btn-secondary flex-1">
              Cancel
            </button>
          </div>
        </form>
      </div>
    </div>
  );
}

