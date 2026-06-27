import React, { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';

export default function Trace() {
  const { traceId } = useParams();
  const [trace, setTrace] = useState(null);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchTrace = async () => {
      try {
        const res = await fetch(`/api/trace/${traceId}`);
        const data = await res.json();
        setTrace(data);
      } catch (err) {
        console.error('Failed to load trace:', err);
      } finally {
        setLoading(false);
      }
    };
    fetchTrace();
  }, [traceId]);

  if (loading) return <div className="p-8">Loading trace...</div>;
  if (!trace) return <div className="p-8">Trace not found</div>;

  return (
    <div className="p-8 max-w-7xl mx-auto">
      {/* Header */}
      <div className="mb-8">
        <div className="flex items-center justify-between mb-4">
          <h1 className="text-3xl font-bold text-gray-900">Trace</h1>
          <button className="p-2 hover:bg-gray-100 rounded">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>
        
        <div className="flex items-center gap-2 bg-blue-50 border border-blue-200 rounded px-3 py-2 w-fit">
          <code className="font-mono text-sm text-blue-900">{traceId}</code>
          <button className="text-blue-600 hover:bg-blue-100 p-1 rounded">
            <span className="material-symbols-outlined text-sm">content_copy</span>
          </button>
        </div>
      </div>

      {/* Trace Info Cards */}
      <div className="grid grid-cols-2 gap-4 mb-8">
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Service</p>
          <p className="text-xl font-bold text-gray-900">api-gateway-v2</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Status</p>
          <p className="text-xl font-bold text-red-600 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">error</span>
            500 Internal Error
          </p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Duration</p>
          <p className="text-xl font-bold text-gray-900">1,245ms</p>
        </div>
        <div className="bg-white border border-gray-200 rounded-lg p-6">
          <p className="text-gray-600 text-sm mb-2">Timestamp</p>
          <p className="text-lg font-mono text-gray-900">2023-10-27 14:22:01.442</p>
        </div>
      </div>

      {/* Action Buttons */}
      <div className="flex gap-3 mb-8">
        <button className="px-4 py-2 bg-blue-50 text-blue-600 rounded-lg hover:bg-blue-100 flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined">share</span>
          Share Trace
        </button>
        <button className="px-4 py-2 bg-gray-100 text-gray-700 rounded-lg hover:bg-gray-200 flex items-center gap-2 font-medium">
          <span className="material-symbols-outlined">download</span>
          Export JSON
        </button>
      </div>

      {/* Timeline */}
      <div className="bg-white border border-gray-200 rounded-lg p-6 mb-8">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Service & Operation</h3>
        
        {/* Timeline visualization */}
        <div className="mb-6 flex items-center gap-4">
          <div className="text-xs text-gray-600">0ms</div>
          <div className="text-xs text-gray-600">250ms</div>
          <div className="text-xs text-gray-600">500ms</div>
          <div className="text-xs text-gray-600">750ms</div>
          <div className="text-xs text-gray-600">1000ms</div>
          <div className="text-xs text-gray-600">1250ms</div>
        </div>

        {/* Spans */}
        <div className="space-y-4">
          {[
            { name: 'api-gateway-v2', op: 'POST /v1/checkout/process', duration: 1245, status: 'error' },
            { name: 'auth-service', op: 'GET /v1/validate-token', duration: 152, status: 'ok' },
            { name: 'inventory-service', op: 'POST /v1/stock/reserve', duration: 984, status: 'error' },
            { name: 'postgres-main', op: 'SELECT * FROM stock WHERE sku = ?', duration: 64, status: 'ok' },
            { name: 'payment-gateway-external', op: 'SocketTimeoutException: Read timed out', duration: 750, status: 'error' },
          ].map((span, idx) => (
            <div key={idx} className="border border-gray-200 rounded p-4 hover:bg-gray-50">
              <div className="flex items-center justify-between mb-2">
                <div className="font-medium text-gray-900">{span.name}</div>
                <div className="text-sm text-gray-600">{span.duration}ms</div>
              </div>
              <div className="text-sm text-gray-600 font-mono">{span.op}</div>
              <div className="mt-3 bg-gray-200 rounded-full h-2 overflow-hidden">
                <div
                  className={`h-full ${span.status === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${(span.duration / 1245) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 pt-4 border-t border-gray-200 text-sm text-gray-600">
          <p>Total Spans: 18 | Errors: 2 | Critically Slow Spans: 1</p>
        </div>
      </div>

      {/* Span Details */}
      <div className="bg-white border border-gray-200 rounded-lg p-6">
        <h3 className="text-lg font-bold text-gray-900 mb-4">Span Details</h3>
        
        <div className="grid grid-cols-2 gap-6 mb-6">
          <div>
            <p className="text-gray-600 text-sm mb-1">Span ID</p>
            <p className="font-mono text-gray-900">sp-0012-db-42</p>
          </div>
          <div>
            <p className="text-gray-600 text-sm mb-1">Duration</p>
            <p className="font-mono text-gray-900">984.22 ms</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="text-sm font-medium text-gray-900 mb-3">Tags & Attributes</p>
          <div className="grid grid-cols-3 gap-4 text-sm">
            <div>
              <p className="text-gray-600">http.method</p>
              <p className="font-mono text-gray-900">POST</p>
            </div>
            <div>
              <p className="text-gray-600">db.type</p>
              <p className="font-mono text-gray-900">postgresql</p>
            </div>
            <div>
              <p className="text-gray-600">node.name</p>
              <p className="font-mono text-gray-900">inv-svc-04.prod</p>
            </div>
          </div>
        </div>

        <div className="mb-6 p-4 bg-red-50 border border-red-200 rounded">
          <p className="text-sm font-medium text-red-900 mb-2 flex items-center gap-2">
            <span className="material-symbols-outlined text-base">warning</span>
            Exception Stacktrace
          </p>
          <code className="text-xs text-red-800 font-mono block whitespace-pre-wrap">
{`java.net.SocketTimeoutException: Read timed out
  at java.net.SocketInputStream.socketRead0(Native Method)
  at java.net.SocketInputStream.read(SocketInputStream.java:152)
  at com.payment.client.Http.call(Http.java:44)
  at com.app.Service.invoke(Service.java:128)`}
          </code>
        </div>

        <button className="text-blue-600 hover:underline text-sm font-medium">
          View Logs for this Span
        </button>
      </div>

      {/* Footer */}
      <div className="mt-8 pt-6 border-t border-gray-200 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
