import React, { useState, useEffect } from 'react';

export default function Logs() {
  const [logs, setLogs] = useState([]);
  const [filters, setFilters] = useState({
    errors: false,
    anomalies: false,
    latency: false,
  });
  const [selectedLog, setSelectedLog] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchLogs = async () => {
      try {
        let url = '/api/logs';
        if (filters.errors) url = '/api/errors';
        else if (filters.anomalies) url = '/api/anomalies';
        
        const res = await fetch(url);
        const data = await res.json();
        setLogs(data);
      } catch (err) {
        console.error('Failed to load logs:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchLogs();
  }, [filters]);

  const handleFilterChange = (key) => {
    setFilters((prev) => ({
      ...Object.fromEntries(Object.entries(prev).map(([k]) => [k, false])),
      [key]: !prev[key],
    }));
  };

  if (loading) return <div className="p-8">Loading logs...</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <h1 className="text-3xl font-bold text-gray-900 mb-2">Log Stream</h1>
        <div className="flex items-center gap-4">
          <button className="px-3 py-2 bg-blue-500 text-white rounded-lg hover:bg-blue-600 font-medium">
            Live
          </button>
          <button className="px-3 py-2 bg-gray-200 text-gray-700 rounded-lg hover:bg-gray-300">
            Static
          </button>
        </div>
      </div>

      {/* Filters */}
      <div className="flex flex-wrap gap-3 mb-8">
        <button
          onClick={() => handleFilterChange('errors')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium ${
            filters.errors
              ? 'bg-red-100 text-red-700 border border-red-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined text-base">error_outline</span>
          Errors
        </button>
        <button
          onClick={() => handleFilterChange('anomalies')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium ${
            filters.anomalies
              ? 'bg-yellow-100 text-yellow-700 border border-yellow-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined text-base">auto_awesome</span>
          Anomalies
        </button>
        <button
          onClick={() => handleFilterChange('latency')}
          className={`px-4 py-2 rounded-lg flex items-center gap-2 font-medium ${
            filters.latency
              ? 'bg-orange-100 text-orange-700 border border-orange-300'
              : 'bg-gray-100 text-gray-700 hover:bg-gray-200'
          }`}
        >
          <span className="material-symbols-outlined text-base">timer</span>
          Latency {'>'}500ms
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium ml-auto">
          <span className="material-symbols-outlined text-base">filter_list</span>
          More Filters
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-base">calendar_today</span>
          Oct 24
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined text-base">refresh</span>
        </button>
      </div>

      {/* Logs Table */}
      <div className="bg-white border border-gray-200 rounded-lg overflow-hidden mb-8">
        <div className="overflow-x-auto">
          <table className="w-full text-sm">
            <thead className="bg-gray-50 border-b border-gray-200">
              <tr>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Timestamp</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Level</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Correlation ID</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Endpoint</th>
                <th className="text-left py-3 px-4 text-gray-600 font-medium">Message</th>
              </tr>
            </thead>
            <tbody>
              {[
                {
                  ts: '2023-10-24 14:22:01.452',
                  level: 'ERROR',
                  corrId: 'req-7a2f-91bc',
                  endpoint: 'POST /api/v1/transaction/commit',
                  msg: 'Database connection timeout: pool exhausted (size=50)',
                },
                {
                  ts: '2023-10-24 14:21:59.812',
                  level: 'INFO',
                  corrId: 'req-4c3d-11ef',
                  endpoint: 'GET /api/v1/user/profile',
                  msg: 'Authenticated user ID: 88129, scope: [READ_PROFILE]',
                },
                {
                  ts: '2023-10-24 14:21:58.102',
                  level: 'ANOMALY',
                  corrId: 'req-91ab-0021',
                  endpoint: 'GET /healthz',
                  msg: 'Unusual latency detected (1.4s), previous average: 12ms',
                },
                {
                  ts: '2023-10-24 14:21:55.004',
                  level: 'WARN',
                  corrId: 'req-665a-bcde',
                  endpoint: 'POST /api/v1/logging/config',
                  msg: "Deprecated field 'retention_days' used in request payload",
                },
                {
                  ts: '2023-10-24 14:21:54.211',
                  level: 'INFO',
                  corrId: 'req-fe12-3321',
                  endpoint: 'GET /metrics',
                  msg: 'Prometheus scraping initiated',
                },
              ].map((log, idx) => (
                <tr
                  key={idx}
                  onClick={() => setSelectedLog(log)}
                  className={`border-b border-gray-100 cursor-pointer hover:bg-gray-50 ${
                    selectedLog === log ? 'bg-blue-50' : ''
                  }`}
                >
                  <td className="py-3 px-4 text-gray-700">{log.ts}</td>
                  <td className={`py-3 px-4 font-medium ${
                    log.level === 'ERROR' ? 'text-red-600' :
                    log.level === 'WARN' ? 'text-yellow-600' :
                    log.level === 'ANOMALY' ? 'text-orange-600' :
                    'text-green-600'
                  }`}>
                    {log.level}
                  </td>
                  <td className="py-3 px-4 text-gray-700 font-mono text-xs">{log.corrId}</td>
                  <td className="py-3 px-4 text-gray-600">{log.endpoint}</td>
                  <td className="py-3 px-4 text-gray-600 truncate">{log.msg}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>

        {/* Pagination */}
        <div className="flex items-center justify-between px-4 py-4 bg-gray-50 border-t border-gray-200 text-sm text-gray-600">
          <span>Showing 1-100 of 14,291 logs</span>
          <div className="flex items-center gap-2">
            <span>Rows per page:</span>
            <select className="border border-gray-300 rounded px-2 py-1 text-gray-900">
              <option>100</option>
              <option>500</option>
              <option>1000</option>
            </select>
          </div>
        </div>
      </div>

      {/* Log Detail Panel */}
      {selectedLog && (
        <div className="bg-white border border-gray-200 rounded-lg p-6 fixed bottom-0 right-0 w-96 max-h-96 overflow-y-auto shadow-lg">
          <div className="flex items-center justify-between mb-4">
            <h3 className="font-bold text-gray-900">Log Details</h3>
            <button
              onClick={() => setSelectedLog(null)}
              className="text-gray-400 hover:text-gray-600"
            >
              <span className="material-symbols-outlined">close</span>
            </button>
          </div>

          <div className="space-y-4 text-sm">
            <div>
              <p className="text-gray-600 font-medium mb-1">Message</p>
              <p className="text-gray-900 bg-gray-50 p-2 rounded break-words">{selectedLog.msg}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Level</p>
              <p className="text-gray-900">{selectedLog.level}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">Correlation ID</p>
              <p className="font-mono text-gray-900 bg-gray-50 p-2 rounded">{selectedLog.corrId}</p>
            </div>
            <div>
              <p className="text-gray-600 font-medium mb-1">JSON Payload</p>
              <code className="text-xs text-gray-700 bg-gray-50 p-2 rounded block overflow-auto max-h-32">
{`{
  "timestamp": "${selectedLog.ts}",
  "level": "${selectedLog.level}",
  "meta": {
    "node_id": "us-east-1a-01"
  }
}`}
              </code>
            </div>
            <button className="w-full py-2 bg-blue-50 text-blue-600 rounded hover:bg-blue-100 font-medium text-sm">
              Copy Trace Link
            </button>
          </div>
        </div>
      )}

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
