import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';

export default function Search() {
  const [query, setQuery] = useState('');
  const [recentSearches, setRecentSearches] = useState([
    { id: 1, query: 'correlation_id: "tx-9942-af-01" AND level: ERROR', time: '2 minutes ago', cluster: 'Production', region: 'US-East-1' },
    { id: 2, query: 'endpoint: "/api/v1/checkout" AND duration: >1000ms', time: '45 minutes ago', cluster: 'Production', region: 'US-West-2' },
    { id: 3, query: '"NullPointerException" AND "gateway-service"', time: '3 hours ago', cluster: 'Staging', region: 'Global' },
  ]);
  const [savedFilters] = useState([
    { id: 1, name: 'Critical', icon: 'star', desc: '5xx Error Spikes', details: 'Monitors HTTP 500-599 on ingress gateways.' },
    { id: 2, name: 'Perf', icon: 'star', desc: 'Slow Auth Queries', details: 'Auth service latency benchmarks > 200ms.' },
    { id: 3, name: 'DevOps', icon: 'star', desc: 'Container Restarts', details: 'K8s event logs for OOMKilled events.' },
  ]);
  const navigate = useNavigate();

  const handleSearch = () => {
    if (query.trim()) {
      // In a real app, this would trigger a search and display results
      console.log('Search query:', query);
    }
  };

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Global Search</h1>
        <p className="text-gray-600">Query logs across all clusters, services, and environments.</p>
      </div>

      {/* Search Bar */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <div className="flex gap-2 items-center mb-4">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder='Try: service:"auth-api" level:ERROR duration:>500ms'
            className="flex-1 outline-none text-gray-900"
          />
          <kbd className="text-xs text-gray-400">⌘K</kbd>
        </div>
        <button
          onClick={handleSearch}
          className="w-full py-2 bg-blue-500 text-white rounded font-medium hover:bg-blue-600"
        >
          Run Query
        </button>
      </div>

      {/* Syntax Help */}
      <div className="bg-blue-50 border border-blue-200 rounded-lg p-4 mb-8">
        <p className="text-sm text-blue-900 font-medium">Syntax help:</p>
        <code className="text-xs text-blue-800 font-mono block mt-2">
          service:"auth-api" level:ERROR duration:{'>'}500ms
        </code>
      </div>

      <div className="grid grid-cols-2 gap-6">
        {/* Recent Searches */}
        <div>
          <div className="flex items-center justify-between mb-4">
            <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2">
              <span className="material-symbols-outlined">history</span>
              Recent Searches
            </h2>
            <button className="text-sm text-blue-600 hover:underline">Clear All</button>
          </div>
          <div className="space-y-3">
            {recentSearches.map((search) => (
              <div
                key={search.id}
                className="bg-white border border-gray-200 rounded p-3 hover:shadow-md cursor-pointer transition"
                onClick={() => setQuery(search.query)}
              >
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-gray-400 flex-shrink-0">manage_search</span>
                  <div className="flex-1 min-w-0">
                    <p className="text-sm text-gray-700 font-mono truncate">{search.query}</p>
                    <p className="text-xs text-gray-500 mt-1">
                      {search.time} • {search.cluster} • {search.region}
                    </p>
                  </div>
                  <span className="material-symbols-outlined text-gray-400 flex-shrink-0">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Saved Filters */}
        <div>
          <h2 className="text-lg font-bold text-gray-900 flex items-center gap-2 mb-4">
            <span className="material-symbols-outlined">bookmarks</span>
            Saved Filters
          </h2>
          <div className="space-y-3">
            {savedFilters.map((filter) => (
              <div key={filter.id} className="bg-white border border-gray-200 rounded p-3 hover:shadow-md transition">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-yellow-500">{filter.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{filter.name}</p>
                    <p className="text-sm text-gray-700">{filter.desc}</p>
                    <p className="text-xs text-gray-600 mt-1">{filter.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Active Indices & Stats */}
      <div className="grid grid-cols-3 gap-6 mt-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Active Indices</p>
            <span className="material-symbols-outlined text-green-600 text-sm">arrow_upward</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">142</p>
          <p className="text-sm text-green-600 mt-1">+12%</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Query Performance</p>
          <p className="text-2xl font-bold text-gray-900">1.4s</p>
          <p className="text-sm text-gray-600 mt-1">p95 avg</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <p className="text-gray-600 text-sm">Daily Ingest</p>
            <span className="material-symbols-outlined text-red-500 text-sm">warning</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.2 TB</p>
          <p className="text-sm text-red-600 mt-1">High Load</p>
        </div>
      </div>

      {/* Config Footer */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-8">
        <div className="flex items-center justify-between">
          <div>
            <p className="font-medium text-gray-900 mb-1">Cluster: PROD-USA-EAST</p>
            <p className="text-sm text-gray-600">Log Retention: 30 Days</p>
          </div>
          <div className="flex gap-2">
            <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              JSON
            </button>
            <button className="px-3 py-2 bg-gray-100 hover:bg-gray-200 rounded text-sm font-medium flex items-center gap-2">
              <span className="material-symbols-outlined text-sm">download</span>
              CSV
            </button>
          </div>
        </div>
      </div>

      {/* Health Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
