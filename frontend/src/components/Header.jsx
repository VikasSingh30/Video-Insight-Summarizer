import React from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

export default function Header() {
  const { user, logout } = useAuth();
  const navigate = useNavigate();

  return (
    <header className="bg-white shadow-sm p-4 flex justify-between items-center">
      <h1 className="text-lg font-semibold text-purple-600">Video Insight</h1>
      <nav className="space-x-4">
        <Link to="/">Summarize</Link>
        <Link to="/history">History</Link>
        {user?.isAdmin && <Link to="/admin">Admin</Link>}
        {user ? (
          <button onClick={() => { logout(); navigate('/login'); }} className="text-red-500">Logout</button>
        ) : (
          <Link to="/login">Login</Link>
        )}
      </nav>
    </header>
  );
}
