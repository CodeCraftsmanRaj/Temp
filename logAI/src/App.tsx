import { BrowserRouter, Routes, Route } from 'react-router-dom';
import Navigation from './components/Navigation';
import Dashboard from './pages/Dashboard';
import Logs from './pages/Logs';
import Search from './pages/Search';
import Trace from './pages/Trace';

export default function App() {
  return (
    <BrowserRouter>
      <div className="flex min-h-screen flex-col bg-white">
        <Navigation />
        <main className="flex-1">
          <Routes>
            <Route path="/" element={<Dashboard />} />
            <Route path="/logs" element={<Logs />} />
            <Route path="/search" element={<Search />} />
            <Route path="/trace/:traceId" element={<Trace />} />
          </Routes>
        </main>
      </div>
    </BrowserRouter>
  );
}
