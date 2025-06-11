import React from 'react';
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();
  const location = useLocation();

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <Link to="/" className="text-lg font-semibold text-purple-600">Video Insight</Link>
      
      <nav className="space-x-4">
        {user && (
          <>
            <Link
              to="/"
              className={location.pathname === '/' ? 'font-semibold text-purple-700' : ''}
            >
              Summarize
            </Link>

            <Link
              to="/history"
              className={location.pathname === '/history' ? 'font-semibold text-purple-700' : ''}
            >
              History
            </Link>

            {user?.isAdmin && (
              <Link
                to="/admin"
                className={location.pathname === '/admin' ? 'font-semibold text-purple-700' : ''}
              >
                Admin
              </Link>
            )}
          </>
        )}

        {!user ? (
          <>
            <Link to="/login" className="text-purple-600 font-medium">Login</Link>
            <Link to="/signup" className="text-purple-600 font-medium">Signup</Link>
          </>
        ) : (
          <button
            onClick={handleLogout}
            className="text-red-500 hover:text-red-700 font-medium"
          >
            Logout
          </button>
        )}
      </nav>
    </header>
  );
}
