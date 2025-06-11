import React, { useState } from 'react';
import { Link, useLocation, useNavigate } from 'react-router-dom';
import {
  Youtube,
  Crown,
  Clock,
  LogOut,
  Menu,
  X,
  Shield
} from 'lucide-react';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
  const { user, logout, dailyCount } = useAuth();
  const [showMobileMenu, setShowMobileMenu] = useState(false);
  const location = useLocation();
  const navigate = useNavigate();

  const handleLogout = () => {
    logout();
    navigate('/');
  };

  const handleUpgrade = () => {
    navigate('/upgrade');
  };

  const isActiveRoute = (path) => {
    return location.pathname === path;
  };

  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between items-center h-16">
          <div className="flex items-center gap-3">
            <div className="inline-flex items-center justify-center w-10 h-10 bg-gradient-to-r from-purple-600 to-blue-600 rounded-lg">
              <Youtube className="w-6 h-6 text-white" />
            </div>
            <h1 className="text-xl font-bold text-gray-900">Video Insight</h1>
          </div>

          <nav className="hidden md:flex items-center gap-6">
            <Link
              to="/home"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                isActiveRoute('/home') ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              Summarize
            </Link>
            <Link
              to="/dashboard"
              className={`px-3 py-2 rounded-md font-medium transition-colors ${
                isActiveRoute('/dashboard') ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600'
              }`}
            >
              History
            </Link>
            {user?.isAdmin && (
              <Link
                to="/admin"
                className={`px-3 py-2 rounded-md font-medium transition-colors flex items-center gap-1 ${
                  isActiveRoute('/admin') ? 'text-purple-600 bg-purple-50' : 'text-gray-700 hover:text-purple-600'
                }`}
              >
                <Shield className="w-4 h-4" />
                Admin
              </Link>
            )}
          </nav>

          <div className="flex items-center gap-4">
            {!user?.isPremium && (
              <div className="hidden sm:flex items-center gap-2 text-sm text-gray-600">
                <Clock className="w-4 h-4" />
                <span>{dailyCount}/3 daily summaries</span>
              </div>
            )}
            
            {!user?.isPremium && (
              <button
                onClick={handleUpgrade}
                className="bg-gradient-to-r from-amber-500 to-orange-500 text-white px-4 py-2 rounded-lg font-medium hover:from-amber-600 hover:to-orange-600 transition-all duration-200 flex items-center gap-2"
              >
                <Crown className="w-4 h-4" />
                <span className="hidden sm:inline">Upgrade</span>
              </button>
            )}

            {user?.isPremium && (
              <div className="flex items-center gap-2 bg-gradient-to-r from-amber-500 to-orange-500 text-white px-3 py-1 rounded-full text-sm font-medium">
                <Crown className="w-4 h-4" />
                Premium
              </div>
            )}

            <div className="flex items-center gap-2">
              <div className="hidden sm:block text-right">
                <p className="text-sm font-medium text-gray-900">{user?.name}</p>
                <p className="text-xs text-gray-500">{user?.email}</p>
              </div>
              <button
                onClick={handleLogout}
                className="p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100 transition-colors"
              >
                <LogOut className="w-5 h-5" />
              </button>
            </div>

            <button
              onClick={() => setShowMobileMenu(!showMobileMenu)}
              className="md:hidden p-2 text-gray-400 hover:text-gray-600 rounded-lg hover:bg-gray-100"
            >
              {showMobileMenu ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {showMobileMenu && (
          <div className="md:hidden py-4 border-t border-gray-200">
            <nav className="flex flex-col gap-2">
              <Link
                to="/home"
                onClick={() => setShowMobileMenu(false)}
                className="text-left px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                Summarize
              </Link>
              <Link
                to="/dashboard"
                onClick={() => setShowMobileMenu(false)}
                className="text-left px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50"
              >
                History
              </Link>
              {user?.isAdmin && (
                <Link
                  to="/admin"
                  onClick={() => setShowMobileMenu(false)}
                  className="text-left px-3 py-2 rounded-md font-medium text-gray-700 hover:text-purple-600 hover:bg-purple-50 flex items-center gap-2"
                >
                  <Shield className="w-4 h-4" />
                  Admin Panel
                </Link>
              )}
              {!user?.isPremium && (
                <div className="px-3 py-2 text-sm text-gray-600 flex items-center gap-2">
                  <Clock className="w-4 h-4" />
                  {dailyCount}/3 daily summaries
                </div>
              )}
            </nav>
          </div>
        )}
      </div>
    </header>
  );
};

export default Navbar;