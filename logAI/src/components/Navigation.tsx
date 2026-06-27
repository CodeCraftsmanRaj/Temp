import { Link, useLocation } from 'react-router-dom';

function Navigation() {
  const location = useLocation();

  const isActive = (path: string) =>
    location.pathname === path
      ? 'border-b-2 border-blue-500 text-blue-500'
      : 'text-gray-600 hover:text-gray-900';

  return (
    <nav className="sticky top-0 z-50 border-b border-gray-200 bg-white shadow-sm">
      <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
        <div className="flex h-16 items-center justify-between">
          <div className="flex items-center gap-8">
            <Link to="/" className="text-xl font-bold text-gray-900">
              <span className="text-blue-500">LogAnalyzer</span> Pro
            </Link>
            <div className="flex items-center gap-6">
              <Link to="/" className={`pb-4 text-sm font-medium ${isActive('/')}`}>
                Dashboard
              </Link>
              <Link to="/logs" className={`pb-4 text-sm font-medium ${isActive('/logs')}`}>
                Logs
              </Link>
              <Link to="/search" className={`pb-4 text-sm font-medium ${isActive('/search')}`}>
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

export default Navigation;
