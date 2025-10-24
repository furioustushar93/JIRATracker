import { useState, useEffect } from 'react';
import { X, Mail, Phone, MapPin, Briefcase, Building2, Calendar, User as UserIcon } from 'lucide-react';
import { format } from 'date-fns';
import { User, UserRole } from '../types';
import { updateUser } from '../api';

interface Props {
  user: User;
  users: User[];
  onClose: () => void;
  onUpdate: () => void;
}

export default function UserProfileModal({ user, users, onClose, onUpdate }: Props) {
  const [isEditing, setIsEditing] = useState(false);
  const [formData, setFormData] = useState({
    username: user.username,
    email: user.email,
    full_name: user.full_name,
    role: user.role,
    job_title: user.job_title || '',
    department: user.department || '',
    phone: user.phone || '',
    location: user.location || '',
    bio: user.bio || '',
    manager_id: user.manager_id,
    is_active: user.is_active,
  });
  const [loading, setLoading] = useState(false);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);

    try {
      await updateUser(user.id, formData);
      onUpdate();
      setIsEditing(false);
    } catch (error) {
      console.error('Error updating user:', error);
    } finally {
      setLoading(false);
    }
  };

  const getRoleColor = (role: UserRole) => {
    switch (role) {
      case UserRole.ADMIN:
        return 'bg-purple-100 text-purple-800 border-purple-200';
      case UserRole.MANAGER:
        return 'bg-blue-100 text-blue-800 border-blue-200';
      case UserRole.DEVELOPER:
        return 'bg-green-100 text-green-800 border-green-200';
      case UserRole.DESIGNER:
        return 'bg-pink-100 text-pink-800 border-pink-200';
      case UserRole.QA:
        return 'bg-orange-100 text-orange-800 border-orange-200';
      case UserRole.PRODUCT_OWNER:
        return 'bg-indigo-100 text-indigo-800 border-indigo-200';
      case UserRole.SCRUM_MASTER:
        return 'bg-teal-100 text-teal-800 border-teal-200';
      default:
        return 'bg-gray-100 text-gray-800 border-gray-200';
    }
  };

  return (
    <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div className="bg-white rounded-lg shadow-xl w-full max-w-4xl max-h-[90vh] overflow-hidden flex flex-col">
        <div className="flex justify-between items-center p-6 border-b border-gray-200">
          <h2 className="text-xl font-bold text-gray-900">User Profile</h2>
          <button onClick={onClose} className="text-gray-400 hover:text-gray-600">
            <X className="w-5 h-5" />
          </button>
        </div>

        <div className="flex-1 overflow-y-auto p-6">
          <div className="flex flex-col md:flex-row gap-6">
            {/* Left Column - Profile Info */}
            <div className="md:w-1/3">
              <div className="text-center mb-6">
                <div className="w-32 h-32 bg-primary-600 rounded-full flex items-center justify-center text-white text-4xl font-semibold mx-auto mb-4">
                  {user.full_name.charAt(0).toUpperCase()}
                </div>
                <h3 className="text-2xl font-bold text-gray-900">{user.full_name}</h3>
                <p className="text-gray-600">@{user.username}</p>
                <span className={`badge border mt-2 ${getRoleColor(user.role)}`}>
                  {user.role}
                </span>
              </div>

              {!isEditing && (
                <div className="space-y-3 text-sm">
                  {user.email && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Mail className="w-4 h-4 text-gray-400" />
                      <span>{user.email}</span>
                    </div>
                  )}
                  {user.phone && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Phone className="w-4 h-4 text-gray-400" />
                      <span>{user.phone}</span>
                    </div>
                  )}
                  {user.location && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <MapPin className="w-4 h-4 text-gray-400" />
                      <span>{user.location}</span>
                    </div>
                  )}
                  {user.job_title && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Briefcase className="w-4 h-4 text-gray-400" />
                      <span>{user.job_title}</span>
                    </div>
                  )}
                  {user.department && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Building2 className="w-4 h-4 text-gray-400" />
                      <span>{user.department}</span>
                    </div>
                  )}
                  {user.date_joined && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <Calendar className="w-4 h-4 text-gray-400" />
                      <span>Joined {format(new Date(user.date_joined), 'MMM d, yyyy')}</span>
                    </div>
                  )}
                  {user.manager && (
                    <div className="flex items-center space-x-2 text-gray-700">
                      <UserIcon className="w-4 h-4 text-gray-400" />
                      <span>Reports to {user.manager.full_name}</span>
                    </div>
                  )}
                </div>
              )}

              {user.bio && !isEditing && (
                <div className="mt-6">
                  <h4 className="font-semibold text-gray-900 mb-2">About</h4>
                  <p className="text-sm text-gray-700">{user.bio}</p>
                </div>
              )}
            </div>

            {/* Right Column - Edit Form */}
            <div className="md:w-2/3">
              {isEditing ? (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-2 gap-4">
                    <div>
                      <label className="block text-sm font-medium text-gray-700 mb-1">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        className="input"
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
                      {users
                        .filter((u) => u.id !== user.id)
                        .map((u) => (
                          <option key={u.id} value={u.id}>
                            {u.full_name} - {u.role}
                          </option>
                        ))}
                    </select>
                  </div>

                  <div>
                    <label className="block text-sm font-medium text-gray-700 mb-1">Bio</label>
                    <textarea
                      className="input"
                      rows={4}
                      value={formData.bio}
                      onChange={(e) => setFormData({ ...formData, bio: e.target.value })}
                      placeholder="Tell us about yourself..."
                    />
                  </div>

                  <div className="flex items-center space-x-2">
                    <input
                      type="checkbox"
                      id="is_active"
                      checked={formData.is_active}
                      onChange={(e) => setFormData({ ...formData, is_active: e.target.checked })}
                      className="rounded"
                    />
                    <label htmlFor="is_active" className="text-sm text-gray-700">
                      Active User
                    </label>
                  </div>

                  <div className="flex space-x-3 pt-4">
                    <button type="submit" className="btn-primary flex-1" disabled={loading}>
                      {loading ? 'Saving...' : 'Save Changes'}
                    </button>
                    <button
                      type="button"
                      onClick={() => setIsEditing(false)}
                      className="btn-secondary flex-1"
                    >
                      Cancel
                    </button>
                  </div>
                </form>
              ) : (
                <div className="space-y-6">
                  <div>
                    <h4 className="font-semibold text-gray-900 mb-3">Details</h4>
                    <div className="grid grid-cols-2 gap-4 text-sm">
                      <div>
                        <span className="text-gray-600">Status:</span>
                        <span className={`ml-2 ${user.is_active ? 'text-green-600' : 'text-red-600'}`}>
                          {user.is_active ? 'Active' : 'Inactive'}
                        </span>
                      </div>
                      <div>
                        <span className="text-gray-600">User ID:</span>
                        <span className="ml-2 text-gray-900">#{user.id}</span>
                      </div>
                    </div>
                  </div>

                  <button onClick={() => setIsEditing(true)} className="btn-primary w-full">
                    Edit Profile
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

