import { useEffect, useState } from 'react';
import { Users as UsersIcon, Plus, X, MapPin, Briefcase } from 'lucide-react';
import { getUsers, createUser } from '../api';
import { User, UserRole } from '../types';
import UserProfileModal from './UserProfileModal';

export default function UserManagement() {
  const [users, setUsers] = useState<User[]>([]);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedUser, setSelectedUser] = useState<User | null>(null);
  const [formData, setFormData] = useState({
    username: '',
    email: '',
    full_name: '',
    avatar_url: '',
    role: UserRole.DEVELOPER,
    job_title: '',
    department: '',
    phone: '',
    location: '',
    bio: '',
    manager_id: undefined as number | undefined,
    is_active: true,
  });
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    loadUsers();
  }, []);

  const loadUsers = async () => {
    try {
      const response = await getUsers();
      setUsers(response.data);
    } catch (error) {
      console.error('Error loading users:', error);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await createUser(formData);
      await loadUsers();
      setIsModalOpen(false);
      setFormData({
        username: '',
        email: '',
        full_name: '',
        avatar_url: '',
        role: UserRole.DEVELOPER,
        job_title: '',
        department: '',
        phone: '',
        location: '',
        bio: '',
        manager_id: undefined,
        is_active: true,
      });
    } catch (error) {
      console.error('Error creating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleBadgeColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-purple-100 text-purple-800';
      case UserRole.MANAGER:
        return 'bg-blue-100 text-blue-800';
      case UserRole.DEVELOPER:
        return 'bg-green-100 text-green-800';
      case UserRole.DESIGNER:
        return 'bg-pink-100 text-pink-800';
      case UserRole.QA:
        return 'bg-orange-100 text-orange-800';
      default:
        return 'bg-gray-100 text-gray-800';
    }
  };

  return (
    <div>
      <div className="flex justify-between items-center mb-6">
        <div>
          <h1 className="text-3xl font-bold text-gray-900">Team Members</h1>
          <p className="text-gray-600 mt-1">Manage users and team members</p>
        </div>
        <button onClick={() => setIsModalOpen(true)} className="btn-primary flex items-center space-x-2">
          <Plus className="w-5 h-5" />
          <span>Add User</span>
        </button>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4">
        {users.map((user) => (
          <div
            key={user.id}
            onClick={() => setSelectedUser(user)}
            className="card hover:shadow-md transition-shadow cursor-pointer"
          >
            <div className="flex items-start space-x-3 mb-3">
              <div className="w-12 h-12 bg-primary-600 rounded-full flex items-center justify-center text-white text-lg font-semibold flex-shrink-0">
                {user.full_name.charAt(0).toUpperCase()}
              </div>
              <div className="flex-1 min-w-0">
                <h3 className="font-semibold text-gray-900 truncate">{user.full_name}</h3>
                <p className="text-sm text-gray-600 truncate">@{user.username}</p>
              </div>
              <span className={`badge ${getRoleBadgeColor(user.role)} text-xs`}>
                {user.role}
              </span>
            </div>
            
            {user.job_title && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-1">
                <Briefcase className="w-3 h-3" />
                <span className="truncate">{user.job_title}</span>
              </div>
            )}
            
            {user.location && (
              <div className="flex items-center space-x-2 text-sm text-gray-600 mb-2">
                <MapPin className="w-3 h-3" />
                <span className="truncate">{user.location}</span>
              </div>
            )}
            
            <div className="flex items-center justify-between pt-2 border-t border-gray-200">
              <span className="text-xs text-gray-500">{user.email}</span>
              <span className={`text-xs ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                {user.is_active ? '● Active' : '● Inactive'}
              </span>
            </div>
          </div>
        ))}
      </div>

      {selectedUser && (
        <UserProfileModal
          user={selectedUser}
          users={users}
          onClose={() => setSelectedUser(null)}
          onUpdate={loadUsers}
        />
      )}

      {isModalOpen && (
        <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 overflow-y-auto">
          <div className="bg-white rounded-lg shadow-xl w-full max-w-2xl p-6 m-4 max-h-[90vh] overflow-y-auto">
            <div className="flex justify-between items-center mb-4">
              <h2 className="text-xl font-bold text-gray-900">Add New User</h2>
              <button onClick={() => setIsModalOpen(false)} className="text-gray-400 hover:text-gray-600">
                <X className="w-5 h-5" />
              </button>
            </div>

            <form onSubmit={handleSubmit} className="space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Full Name *
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="John Doe"
                    value={formData.full_name}
                    onChange={(e) => setFormData({ ...formData, full_name: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Username *
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="john_doe"
                    value={formData.username}
                    onChange={(e) => setFormData({ ...formData, username: e.target.value })}
                    required
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Email *
                  </label>
                  <input
                    type="email"
                    className="input"
                    placeholder="john@example.com"
                    value={formData.email}
                    onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                    required
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Phone
                  </label>
                  <input
                    type="tel"
                    className="input"
                    placeholder="+1-555-0100"
                    value={formData.phone}
                    onChange={(e) => setFormData({ ...formData, phone: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Role *
                  </label>
                  <select
                    className="input"
                    value={formData.role}
                    onChange={(e) => setFormData({ ...formData, role: e.target.value as UserRole })}
                  >
                    {Object.values(UserRole).map((role) => (
                      <option key={role} value={role}>
                        {role}
                      </option>
                    ))}
                  </select>
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Job Title
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Software Engineer"
                    value={formData.job_title}
                    onChange={(e) => setFormData({ ...formData, job_title: e.target.value })}
                  />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Department
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="Engineering"
                    value={formData.department}
                    onChange={(e) => setFormData({ ...formData, department: e.target.value })}
                  />
                </div>

                <div>
                  <label className="block text-sm font-medium text-gray-700 mb-1">
                    Location
                  </label>
                  <input
                    type="text"
                    className="input"
                    placeholder="San Francisco, CA"
                    value={formData.location}
                    onChange={(e) => setFormData({ ...formData, location: e.target.value })}
                  />
                </div>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Manager
                </label>
                <select
                  className="input"
                  value={formData.manager_id || ''}
                  onChange={(e) =>
                    setFormData({
                      ...formData,
                      manager_id: e.target.value ? parseInt(e.target.value) : undefined,
                    })
                  }
                >
                  <option value="">No Manager</option>
                  {users.map((user) => (
                    <option key={user.id} value={user.id}>
                      {user.full_name} - {user.role}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label className="block text-sm font-medium text-gray-700 mb-1">
                  Bio
                </label>
                <textarea
                  className="input"
                  rows={3}
                  placeholder="Brief description about the user..."
                  value={formData.bio}
                  onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                />
              </div>

              <div className="flex space-x-3 pt-4">
                <button type="submit" className="btn-primary flex-1" disabled={loading}>
                  {loading ? 'Adding...' : 'Add User'}
                </button>
                <button type="button" onClick={() => setIsModalOpen(false)} className="btn-secondary flex-1">
                  Cancel
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}

