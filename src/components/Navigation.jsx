import React from 'react';
import { Link, useLocation } from 'react-router-dom';

export default function Navigation() {
  const location = useLocation();

  const isActive = (path) => location.pathname === path ? 'text-blue-500 border-b-2 border-blue-500' : 'text-gray-600 hover:text-gray-900';

  return (
    <nav className="sticky top-0 z-50 bg-white border-b border-gray-200 shadow-sm">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center gap-8">
            <Link to="/" className="font-bold text-xl text-gray-900">
              <span className="text-blue-500">LogAnalyzer</span> Pro
            </Link>
            <div className="flex gap-6 items-center">
              <Link to="/" className={`text-sm font-medium pb-4 ${isActive('/')}`}>
                Dashboard
              </Link>
              <Link to="/logs" className={`text-sm font-medium pb-4 ${isActive('/logs')}`}>
                Logs
              </Link>
              <Link to="/search" className={`text-sm font-medium pb-4 ${isActive('/search')}`}>
                Search
              </Link>
            </div>
          </div>
          <div className="flex items-center gap-4">
            <button className="text-gray-600 hover:text-gray-900">
              <span className="material-symbols-outlined">notifications</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <span className="material-symbols-outlined">settings</span>
            </button>
            <button className="text-gray-600 hover:text-gray-900">
              <span className="material-symbols-outlined">help</span>
            </button>
          </div>
        </div>
      </div>
    </nav>
  );
}
