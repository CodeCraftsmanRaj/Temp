import { useState } from 'react';

type RecentSearch = {
  id: number;
  query: string;
  time: string;
  cluster: string;
  region: string;
};

type SavedFilter = {
  id: number;
  name: string;
  icon: string;
  desc: string;
  details: string;
};

export default function Search() {
  const [query, setQuery] = useState<string>('');
  const [recentSearches] = useState<RecentSearch[]>([
    { id: 1, query: 'correlation_id: "tx-9942-af-01" AND level: ERROR', time: '2 minutes ago', cluster: 'Production', region: 'US-East-1' },
    { id: 2, query: 'endpoint: "/api/v1/checkout" AND duration: >1000ms', time: '45 minutes ago', cluster: 'Production', region: 'US-West-2' },
    { id: 3, query: '"NullPointerException" AND "gateway-service"', time: '3 hours ago', cluster: 'Staging', region: 'Global' },
  ]);
  const [savedFilters] = useState<SavedFilter[]>([
    { id: 1, name: 'Critical', icon: 'star', desc: '5xx Error Spikes', details: 'Monitors HTTP 500-599 on ingress gateways.' },
    { id: 2, name: 'Perf', icon: 'star', desc: 'Slow Auth Queries', details: 'Auth service latency benchmarks > 200ms.' },
    { id: 3, name: 'DevOps', icon: 'star', desc: 'Container Restarts', details: 'K8s event logs for OOMKilled events.' },
  ]);

  const handleSearch = () => {
    if (query.trim()) {
      console.log('Search query:', query);
    }
  };

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Global Search</h1>
        <p className="text-gray-600">Query logs across all clusters, services, and environments.</p>
      </div>

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center gap-2">
          <span className="material-symbols-outlined text-gray-400">search</span>
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
            placeholder='Try: service:"auth-api" level:ERROR duration:>500ms'
            className="flex-1 text-gray-900 outline-none"
          />
          <kbd className="text-xs text-gray-400">⌘K</kbd>
        </div>
        <button onClick={handleSearch} className="w-full rounded bg-blue-500 py-2 font-medium text-white hover:bg-blue-600">
          Run Query
        </button>
      </div>

      <div className="mb-8 rounded-lg border border-blue-200 bg-blue-50 p-4">
        <p className="text-sm font-medium text-blue-900">Syntax help:</p>
        <code className="mt-2 block font-mono text-xs text-blue-800">service:&quot;auth-api&quot; level:ERROR duration:{'>'}500ms</code>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div>
          <div className="mb-4 flex items-center justify-between">
            <h2 className="flex items-center gap-2 text-lg font-bold text-gray-900">
              <span className="material-symbols-outlined">history</span>
              Recent Searches
            </h2>
            <button className="text-sm text-blue-600 hover:underline">Clear All</button>
          </div>
          <div className="space-y-3">
            {recentSearches.map((search) => (
              <div
                key={search.id}
                className="cursor-pointer rounded border border-gray-200 bg-white p-3 transition hover:shadow-md"
                onClick={() => setQuery(search.query)}
              >
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined flex-shrink-0 text-gray-400">manage_search</span>
                  <div className="min-w-0 flex-1">
                    <p className="truncate font-mono text-sm text-gray-700">{search.query}</p>
                    <p className="mt-1 text-xs text-gray-500">
                      {search.time} • {search.cluster} • {search.region}
                    </p>
                  </div>
                  <span className="material-symbols-outlined flex-shrink-0 text-gray-400">chevron_right</span>
                </div>
              </div>
            ))}
          </div>
        </div>

        <div>
          <h2 className="mb-4 flex items-center gap-2 text-lg font-bold text-gray-900">
            <span className="material-symbols-outlined">bookmarks</span>
            Saved Filters
          </h2>
          <div className="space-y-3">
            {savedFilters.map((filter) => (
              <div key={filter.id} className="rounded border border-gray-200 bg-white p-3 transition hover:shadow-md">
                <div className="flex items-start gap-2">
                  <span className="material-symbols-outlined text-yellow-500">{filter.icon}</span>
                  <div className="flex-1">
                    <p className="font-medium text-gray-900">{filter.name}</p>
                    <p className="text-sm text-gray-700">{filter.desc}</p>
                    <p className="mt-1 text-xs text-gray-600">{filter.details}</p>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-8 grid grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600">Active Indices</p>
            <span className="material-symbols-outlined text-sm text-green-600">arrow_upward</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">142</p>
          <p className="mt-1 text-sm text-green-600">+12%</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-2 text-sm text-gray-600">Query Performance</p>
          <p className="text-2xl font-bold text-gray-900">1.4s</p>
          <p className="mt-1 text-sm text-gray-600">p95 avg</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <p className="text-sm text-gray-600">Daily Ingest</p>
            <span className="material-symbols-outlined text-sm text-red-500">warning</span>
          </div>
          <p className="text-2xl font-bold text-gray-900">4.2 TB</p>
          <p className="mt-1 text-sm text-red-600">High Load</p>
        </div>
      </div>

      <div className="mt-8 rounded-lg border border-gray-200 bg-white p-6">
        <div className="flex items-center justify-between">
          <div>
            <p className="mb-1 font-medium text-gray-900">Cluster: PROD-USA-EAST</p>
            <p className="text-sm text-gray-600">Log Retention: 30 Days</p>
          </div>
          <div className="flex gap-2">
            <button className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200">
              <span className="material-symbols-outlined text-sm">download</span>
              JSON
            </button>
            <button className="flex items-center gap-2 rounded bg-gray-100 px-3 py-2 text-sm font-medium hover:bg-gray-200">
              <span className="material-symbols-outlined text-sm">download</span>
              CSV
            </button>
          </div>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
