import { useEffect, useState } from 'react';

type LogLevel = 'ERROR' | 'WARN' | 'INFO' | 'ANOMALY';

type LogEntry = {
  ts: string;
  level: LogLevel;
  corrId: string;
  endpoint: string;
  msg: string;
};

type FilterState = {
  errors: boolean;
  anomalies: boolean;
  latency: boolean;
};

export default function Logs() {
  const [logs, setLogs] = useState<LogEntry[]>([]);
  const [filters, setFilters] = useState<FilterState>({
    errors: false,
    anomalies: false,
    latency: false,
  });
  const [selectedLog, setSelectedLog] = useState<LogEntry | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let url = '/api/logs';
        if (filters.errors) url = '/api/errors';
        else if (filters.anomalies) url = '/api/anomalies';

        const res = await fetch(url);
        const data = (await res.json()) as LogEntry[];
        setLogs(data);
      } catch (err) {
        console.error('Failed to load logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [filters]);

  const handleFilterChange = (key: keyof FilterState) => {
    setFilters((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])) as FilterState,
      [key]: !prev[key],
    }));
  };

  if (loading) return <div className="p-8">Loading logs...</div>;

  return (
    <div className="mx-auto mb-16 max-w-7xl p-8">
      <div className="mb-8">
        <h1 className="mb-2 text-3xl font-bold text-gray-900">Log Stream</h1>
        <div className="flex items-center gap-4">
          <button className="rounded-lg bg-blue-500 px-3 py-2 font-medium text-white hover:bg-blue-600">
            Live
          </button>
          <button className="rounded-lg bg-gray-200 px-3 py-2 text-gray-700 hover:bg-gray-300">
            Static
          </button>
        </div>
      </div>

      <div className="mb-8 flex flex-wrap gap-3">
        <button
          onClick={() => handleFilterChange('errors')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
            filters.errors ? 'border border-red-300 bg-red-100 text-red-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined text-base">error_outline</span>
          Errors
        </button>
        <button
          onClick={() => handleFilterChange('anomalies')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
            filters.anomalies ? 'border border-yellow-300 bg-yellow-100 text-yellow-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined text-base">auto_awesome</span>
          Anomalies
        </button>
        <button
          onClick={() => handleFilterChange('latency')}
          className={`flex items-center gap-2 rounded-lg px-4 py-2 font-medium ${
            filters.latency ? 'border border-orange-300 bg-orange-100 text-orange-700' : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined text-base">timer</span>
          Latency {'>'}500ms
        </button>
        <button className="ml-auto flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200">
          <span className="material-symbols-outlined text-base">filter_list</span>
          More Filters
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200">
          <span className="material-symbols-outlined text-base">calendar_today</span>
          Oct 24
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200">
          <span className="material-symbols-outlined text-base">refresh</span>
        </button>
      </div>

      <div className="mb-8 overflow-hidden rounded-lg border border-gray-200 bg-white">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="border-b border-gray-200 bg-gray-50">
              <tr>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Timestamp</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Level</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Correlation ID</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Endpoint</th>
                <th className="px-4 py-3 text-left font-medium text-gray-600">Message</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  ts: '2023-10-24 14:22:01.452',
                  level: 'ERROR' as const,
                  corrId: 'req-7a2f-91bc',
                  endpoint: 'POST /api/v1/transaction/commit',
                  msg: 'Database connection timeout: pool exhausted (size=50)',
                },
                {
                  ts: '2023-10-24 14:21:59.812',
                  level: 'INFO' as const,
                  corrId: 'req-4c3d-11ef',
                  endpoint: 'GET /api/v1/user/profile',
                  msg: 'Authenticated user ID: 88129, scope: [READ_PROFILE]',
                },
                {
                  ts: '2023-10-24 14:21:58.102',
                  level: 'ANOMALY' as const,
                  corrId: 'req-91ab-0021',
                  endpoint: 'GET /healthz',
                  msg: 'Unusual latency detected (1.4s), previous average: 12ms',
                },
                {
                  ts: '2023-10-24 14:21:55.004',
                  level: 'WARN' as const,
                  corrId: 'req-665a-bcde',
                  endpoint: 'POST /api/v1/logging/config',
                  msg: "Deprecated field 'retention_days' used in request payload",
                },
                {
                  ts: '2023-10-24 14:21:54.211',
                  level: 'INFO' as const,
                  corrId: 'req-fe12-3321',
                  endpoint: 'GET /metrics',
                  msg: 'Prometheus scraping initiated',
                },
              ].map((log, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedLog(log)}
                  className={`cursor-pointer border-b border-gray-100 hover:bg-gray-50 ${selectedLog === log ? 'bg-blue-50' : ''}`}
                >
                  <td className="px-4 py-3 text-gray-700">{log.ts}</td>
                  <td
                    className={`px-4 py-3 font-medium ${
                      log.level === 'ERROR'
                        ? 'text-red-600'
                        : log.level === 'WARN'
                          ? 'text-yellow-600'
                          : log.level === 'ANOMALY'
                            ? 'text-orange-600'
                            : 'text-green-600'
                    }`}
                  >
                    {log.level}
                  </td>
                  <td className="px-4 py-3 font-mono text-xs text-gray-700">{log.corrId}</td>
                  <td className="px-4 py-3 text-gray-600">{log.endpoint}</td>
                  <td className="px-4 py-3 truncate text-gray-600">{log.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        <div className="flex items-center justify-between border-t border-gray-200 bg-gray-50 px-4 py-4 text-sm text-gray-600">
          <span>Showing 1-100 of 14,291 logs</span>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="rounded border border-gray-300 px-2 py-1 text-gray-900">
              <option>100</option>
              <option>500</option>
              <option>1000</option>
            </select>
          </div>
        </div>
      </div>

      {selectedLog && (
        <div className="fixed bottom-0 right-0 max-h-96 w-96 overflow-y-auto rounded-lg border border-gray-200 bg-white p-6 shadow-lg">
          <div className="mb-4 flex items-center justify-between">
            <h3 className="font-bold text-gray-900">Log Details</h3>
            <button onClick={() => setSelectedLog(null)} className="text-gray-400 hover:text-gray-600">
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="mb-1 font-medium text-gray-600">Message</p>
              <p className="break-words rounded bg-gray-50 p-2 text-gray-900">{selectedLog.msg}</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600">Level</p>
              <p className="text-gray-900">{selectedLog.level}</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600">Correlation ID</p>
              <p className="rounded bg-gray-50 p-2 font-mono text-gray-900">{selectedLog.corrId}</p>
            </div>
            <div>
              <p className="mb-1 font-medium text-gray-600">JSON Payload</p>
              <code className="block max-h-32 overflow-auto rounded bg-gray-50 p-2 text-xs text-gray-700">
                {`{
  "timestamp": "${selectedLog.ts}",
  "level": "${selectedLog.level}",
  "meta": {
    "node_id": "us-east-1a-01"
  }
}`}
              </code>
            </div>
            <button className="w-full rounded bg-blue-50 py-2 text-sm font-medium text-blue-600 hover:bg-blue-100">
              Copy Trace Link
            </button>
          </div>
        </div>
      )}

      <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
