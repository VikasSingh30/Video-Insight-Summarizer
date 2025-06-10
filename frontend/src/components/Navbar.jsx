import { useContext } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { isAuthenticated, logout } = useContext(AuthContext);
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  return (
    <nav className="bg-gray-800 text-white px-4 py-3 flex justify-between items-center">
      <Link to="/home" className="font-bold text-xl text-white hover:text-gray-300">
        🎥 Video Insight
      </Link>

      <div className="space-x-4 text-sm sm:text-base">
        {isAuthenticated ? (
          <>
            <Link to="/dashboard" className="hover:text-gray-300">Dashboard</Link>
            <Link to="/upgrade" className="hover:text-gray-300">Upgrade</Link>
            <Link to="/admin" className="hover:text-gray-300">Admin</Link>
            <button
              onClick={handleLogout}
              className="bg-red-600 px-3 py-1 rounded hover:bg-red-700"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link to="/" className="hover:text-gray-300">Login</Link>
            <Link to="/signup" className="hover:text-gray-300">Signup</Link>
          </>
        )}
      </div>
    </nav>
  );
}
