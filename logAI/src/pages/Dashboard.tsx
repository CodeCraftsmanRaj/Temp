import { useEffect, useState } from 'react';

type TimeRange = '1H' | '6H' | '24H' | '7D';

type Metrics = Record<string, unknown> | null;

export default function Dashboard() {
  const [metrics, setMetrics] = useState<Metrics>(null);
  const [timeRange, setTimeRange] = useState<TimeRange>('6H');
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchMetrics = async () => {
      try {
        const res = await fetch('/api/insights');
        const data = (await res.json()) as Record<string, unknown>;
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
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">System Health Overview</h1>
        <p className="text-gray-600">Real-time performance metrics across all production clusters.</p>
      </div>

      <div className="mb-8 flex items-center gap-4">
        {(['1H', '6H', '24H', '7D'] as const).map((range) => (
          <button
            key={range}
            onClick={() => setTimeRange(range)}
            className={`rounded px-4 py-2 text-sm font-medium ${
              timeRange === range ? 'bg-blue-500 text-white' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
            }`}
          >
            {range}
          </button>
        ))}
        <div className="ml-auto flex gap-2">
          <button className="rounded p-2 hover:bg-gray-100">
            <span className="material-symbols-outlined">filter_list</span>
          </button>
          <button className="rounded p-2 hover:bg-gray-100">
            <span className="material-symbols-outlined">refresh</span>
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-3 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="material-symbols-outlined text-blue-500">api</span>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +12%
            </div>
          </div>
          <p className="text-sm text-gray-600">Total Requests</p>
          <p className="text-2xl font-bold text-gray-900">1,284,092</p>
          <p className="mt-1 text-xs text-gray-500">last 6h</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="material-symbols-outlined text-red-500">error_outline</span>
            <div className="flex items-center gap-1 text-sm font-medium text-green-600">
              <span className="material-symbols-outlined text-sm">trending_up</span>
              +0.02%
            </div>
          </div>
          <p className="text-sm text-gray-600">Error Rate</p>
          <p className="text-2xl font-bold text-gray-900">0.04%</p>
          <p className="mt-1 text-xs text-red-600">target {'<'} 0.01%</p>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <div className="mb-2 flex items-center justify-between">
            <span className="material-symbols-outlined text-blue-500">speed</span>
            <span className="text-sm font-medium text-green-600">Stable</span>
          </div>
          <p className="text-sm text-gray-600">P99 Latency</p>
          <p className="text-2xl font-bold text-gray-900">124ms</p>
          <p className="mt-1 text-xs text-gray-500">global avg</p>
        </div>
      </div>

      <div className="grid grid-cols-2 gap-6">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Requests Over Time (Aggregation: 5m)</h3>
          <div className="flex h-64 items-center justify-center rounded bg-gray-50 text-gray-400">
            Chart placeholder (use Chart.js or Recharts)
          </div>
        </div>

        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <h3 className="mb-4 text-lg font-bold text-gray-900">Error Distribution</h3>
          <div className="space-y-3">
            {[
              { label: '500 Internal Server Error', pct: 64.2 },
              { label: '503 Service Unavailable', pct: 21.8 },
              { label: '404 Not Found', pct: 10.5 },
              { label: '403 Forbidden', pct: 3.5 },
            ].map((item) => (
              <div key={item.label}>
                <div className="mb-1 flex justify-between text-sm">
                  <span className="text-gray-700">{item.label}</span>
                  <span className="font-medium">{item.pct}%</span>
                </div>
                <div className="h-2 w-full rounded-full bg-gray-200">
                  <div className="h-2 rounded-full bg-red-500" style={{ width: `${item.pct}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      <div className="mt-6 rounded-lg border border-gray-200 bg-white p-6">
        <div className="mb-4 flex items-center justify-between">
          <h3 className="text-lg font-bold text-gray-900">Critical Live Stream</h3>
          <button className="rounded px-3 py-1 text-sm text-blue-600 hover:bg-blue-50">View All Logs</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200">
              <tr>
                <th className="px-2 py-2 text-left font-medium text-gray-600">Timestamp</th>
                <th className="px-2 py-2 text-left font-medium text-gray-600">Level</th>
                <th className="px-2 py-2 text-left font-medium text-gray-600">Service</th>
                <th className="px-2 py-2 text-left font-medium text-gray-600">Message</th>
                <th className="px-2 py-2 text-left font-medium text-gray-600">Trace ID</th>
              </tr>
            </thead>
            <tbody>
              {[
                { ts: '2023-10-27 15:42:01.234', level: 'ERROR', service: 'auth-service', msg: 'Connection pool exhausted...', trace: 'tr-58f92a' },
                { ts: '2023-10-27 15:41:59.882', level: 'WARN', service: 'api-gateway', msg: 'High latency detected...', trace: 'tr-c43e112' },
              ].map((log, idx) => (
                <tr key={idx} className="border-b border-gray-100 hover:bg-gray-50">
                  <td className="px-2 py-2 text-gray-700">{log.ts}</td>
                  <td className={`px-2 py-2 font-medium ${log.level === 'ERROR' ? 'text-red-600' : 'text-yellow-600'}`}>
                    {log.level}
                  </td>
                  <td className="px-2 py-2 text-gray-700">{log.service}</td>
                  <td className="px-2 py-2 text-gray-600">{log.msg}</td>
                  <td className="px-2 py-2 font-mono text-xs text-blue-600">{log.trace}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}