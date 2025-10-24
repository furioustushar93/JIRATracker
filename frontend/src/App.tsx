import { BrowserRouter as Router, Routes, Route, Link } from 'react-router-dom';
import { LayoutDashboard, Settings, Users } from 'lucide-react';
import Board from './components/Board';
import ProjectList from './components/ProjectList';
import UserManagement from './components/UserManagement';
import './App.css';

function App() {
  return (
    <Router>
      <div className="min-h-screen bg-gray-50">
        {/* Header */}
        <header className="bg-white border-b border-gray-200 sticky top-0 z-50">
          <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <div className="flex justify-between items-center h-16">
              <div className="flex items-center space-x-8">
                <Link to="/" className="flex items-center space-x-2">
                  <LayoutDashboard className="w-8 h-8 text-primary-600" />
                  <span className="text-xl font-bold text-gray-900">TaskFlow</span>
                </Link>
                <nav className="hidden md:flex space-x-6">
                  <Link to="/" className="text-gray-700 hover:text-primary-600 font-medium">
                    Projects
                  </Link>
                  <Link to="/board" className="text-gray-700 hover:text-primary-600 font-medium">
                    Board
                  </Link>
                  <Link to="/users" className="text-gray-700 hover:text-primary-600 font-medium">
                    Team
                  </Link>
                </nav>
              </div>
              <div className="flex items-center space-x-4">
                <Link to="/users" className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                  <Users className="w-5 h-5" />
                </Link>
                <button className="p-2 text-gray-600 hover:text-gray-900 rounded-lg hover:bg-gray-100">
                  <Settings className="w-5 h-5" />
                </button>
                <div className="w-8 h-8 bg-primary-600 rounded-full flex items-center justify-center text-white font-semibold">
                  U
                </div>
              </div>
            </div>
          </div>
        </header>

        {/* Main Content */}
        <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
          <Routes>
            <Route path="/" element={<ProjectList />} />
            <Route path="/board" element={<Board />} />
            <Route path="/board/:projectId" element={<Board />} />
            <Route path="/users" element={<UserManagement />} />
          </Routes>
        </main>
      </div>
    </Router>
  );
}

export default App;

