import React, { useState, useEffect } from 'react';

export default function Dashboard() {
  const [metrics, setMetrics] = useState(null);
  const [timeRange, setTimeRange] = useState('6h');
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/insights');
        const data = await res.json();
        setMetrics(data);
      } catch (err) {
        console.error('Failed to load metrics:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchMetrics();
  }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">System Health Overview</h1>
        <p className="text-gray-600">Real-time performance metrics across all production clusters.</p>
      </div>

      {/* Time Range Filters */}
      <div className="flex gap-4 items-center mb-8">
        {['1H', '6H', '24H', '7D'].map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`px-4 py-2 rounded text-sm font-medium ${
              timeRange === range
                ? 'bg-blue-500 text-white'
                : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button className="p-2 hover:bg-gray-100 rounded">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <button className="p-2 hover:bg-gray-100 rounded">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>

      {/* Metrics Cards */}
      <div className="grid grid-cols-3 gap-6 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-blue-500">api</span>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12%
            </div>
          </div>
          <p className="text-gray-600 text-sm">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">1,284,092</p>
          <p className="text-gray-500 text-xs mt-1">last 6h</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-red-500">error_outline</span>
            <div className="flex items-center gap-1 text-green-600 text-sm font-medium">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +0.02%
            </div>
          </div>
          <p className="text-gray-600 text-sm">Error Rate</p>
          <p className="text-2xl font-bold text-gray-900">0.04%</p>
          <p className="text-red-600 text-xs mt-1">target &lt; 0.01%</p>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <div className="flex items-center justify-between mb-2">
            <span className="material-symbols-outlined text-blue-500">speed</span>
            <span className="text-green-600 text-sm font-medium">Stable</span>
          </div>
          <p className="text-gray-600 text-sm">P99 Latency</p>
          <p className="text-2xl font-bold text-gray-900">124ms</p>
          <p className="text-gray-500 text-xs mt-1">global avg</p>
        </div>
      </div>

      {/* Charts & Tables */}
      <div className="grid grid-cols-2 gap-6">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Requests Over Time (Aggregation: 5m)</h3>
          <div className="h-64 bg-gray-50 rounded flex items-center justify-center text-gray-400">
            Chart placeholder (use Chart.js or Recharts)
          </div>
        </div>

        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <h3 className="text-lg font-bold text-gray-900 mb-4">Error Distribution</h3>
          <div className="space-y-3">
            {[
              { label: '500 Internal Server Error', pct: 64.2 },
              { label: '503 Service Unavailable', pct: 21.8 },
              { label: '404 Not Found', pct: 10.5 },
              { label: '403 Forbidden', pct: 3.5 }
            ].map((item) => (
              <div key={item.label}>
                <div className="flex justify-between text-sm mb-1">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium">{item.pct}%</span>
                </div>
                <div className="w-full bg-gray-200 rounded-full h-2">
                  <div
                    className="bg-red-500 h-2 rounded-full"
                    style={{ width: `${item.pct}%` }}
                  />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Live Stream */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mt-6">
        <div className="flex items-center justify-between mb-4">
          <h3 className="text-lg font-bold text-gray-900">Critical Live Stream</h3>
          <button className="px-3 py-1 text-sm text-blue-600 hover:bg-blue-50 rounded">
            View All Logs
          </button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="text-left py-2 px-2 text-gray-600 font-medium">Timestamp</th>
                <th className="text-left py-2 px-2 text-gray-600 font-medium">Level</th>
                <th className="text-left py-2 px-2 text-gray-600 font-medium">Service</th>
                <th className="text-left py-2 px-2 text-gray-600 font-medium">Message</th>
                <th className="text-left py-2 px-2 text-gray-600 font-medium">Trace ID</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ts: '2023-10-27 15:42:01.234', level: 'ERROR', service: 'auth-service', msg: 'Connection pool exhausted...', trace: 'tr-58f92a' },
                { ts: '2023-10-27 15:41:59.882', level: 'WARN', service: 'api-gateway', msg: 'High latency detected...', trace: 'tr-c43e112' },
              ].map((log, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="py-2 px-2 text-gray-700">{log.ts}</td>
                  <td className={`py-2 px-2 font-medium ${log.level === 'ERROR' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {log.level}
                  </td>
                  <td className="py-2 px-2 text-gray-700">{log.service}</td>
                  <td className="py-2 px-2 text-gray-600">{log.msg}</td>
                  <td className="py-2 px-2 text-blue-600 font-mono text-xs">{log.trace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
