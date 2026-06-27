import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';

type TraceData = Record<string, unknown> | null;

type Span = {
  name: string;
  op: string;
  duration: number;
  status: 'error' | 'ok';
};

export default function Trace() {
  const { traceId } = useParams<{ traceId: string }>();
  const [trace, setTrace] = useState<TraceData>(null);
  const [loading, setLoading] = useState<boolean>(true);

  useEffect(() => {
    const fetchTrace = async () => {
      try {
        const res = await fetch(`/api/trace/${traceId ?? ''}`);
        const data = (await res.json()) as Record<string, unknown>;
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

  const spans: Span[] = [
    { name: 'api-gateway-v2', op: 'POST /v1/checkout/process', duration: 1245, status: 'error' },
    { name: 'auth-service', op: 'GET /v1/validate-token', duration: 152, status: 'ok' },
    { name: 'inventory-service', op: 'POST /v1/stock/reserve', duration: 984, status: 'error' },
    { name: 'postgres-main', op: 'SELECT * FROM stock WHERE sku = ?', duration: 64, status: 'ok' },
    { name: 'payment-gateway-external', op: 'SocketTimeoutException: Read timed out', duration: 750, status: 'error' },
  ];

  return (
    <div className="mx-auto max-w-7xl p-8">
      <div className="mb-8">
        <div className="mb-4 flex items-center justify-between">
          <h1 className="text-3xl font-bold text-gray-900">Trace</h1>
          <button className="rounded p-2 hover:bg-gray-100">
            <span className="material-symbols-outlined">more_vert</span>
          </button>
        </div>

        <div className="flex w-fit items-center gap-2 rounded border border-blue-200 bg-blue-50 px-3 py-2">
          <code className="font-mono text-sm text-blue-900">{traceId}</code>
          <button className="rounded p-1 text-blue-600 hover:bg-blue-100">
            <span className="material-symbols-outlined text-sm">content_copy</span>
          </button>
        </div>
      </div>

      <div className="mb-8 grid grid-cols-2 gap-4">
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-2 text-sm text-gray-600">Service</p>
          <p className="text-xl font-bold text-gray-900">api-gateway-v2</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-2 text-sm text-gray-600">Status</p>
          <p className="flex items-center gap-2 text-xl font-bold text-red-600">
            <span className="material-symbols-outlined text-base">error</span>
            500 Internal Error
          </p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-2 text-sm text-gray-600">Duration</p>
          <p className="text-xl font-bold text-gray-900">1,245ms</p>
        </div>
        <div className="rounded-lg border border-gray-200 bg-white p-6">
          <p className="mb-2 text-sm text-gray-600">Timestamp</p>
          <p className="font-mono text-lg text-gray-900">2023-10-27 14:22:01.442</p>
        </div>
      </div>

      <div className="mb-8 flex gap-3">
        <button className="flex items-center gap-2 rounded-lg bg-blue-50 px-4 py-2 font-medium text-blue-600 hover:bg-blue-100">
          <span className="material-symbols-outlined">share</span>
          Share Trace
        </button>
        <button className="flex items-center gap-2 rounded-lg bg-gray-100 px-4 py-2 font-medium text-gray-700 hover:bg-gray-200">
          <span className="material-symbols-outlined">download</span>
          Export JSON
        </button>
      </div>

      <div className="mb-8 rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Service & Operation</h3>

        <div className="mb-6 flex items-center gap-4">
          <div className="text-xs text-gray-600">0ms</div>
          <div className="text-xs text-gray-600">250ms</div>
          <div className="text-xs text-gray-600">500ms</div>
          <div className="text-xs text-gray-600">750ms</div>
          <div className="text-xs text-gray-600">1000ms</div>
          <div className="text-xs text-gray-600">1250ms</div>
        </div>

        <div className="space-y-4">
          {spans.map((span, idx) => (
            <div key={idx} className="rounded border border-gray-200 p-4 hover:bg-gray-50">
              <div className="mb-2 flex items-center justify-between">
                <div className="font-medium text-gray-900">{span.name}</div>
                <div className="text-sm text-gray-600">{span.duration}ms</div>
              </div>
              <div className="font-mono text-sm text-gray-600">{span.op}</div>
              <div className="mt-3 overflow-hidden rounded-full bg-gray-200">
                <div
                  className={`h-2 ${span.status === 'error' ? 'bg-red-500' : 'bg-green-500'}`}
                  style={{ width: `${(span.duration / 1245) * 100}%` }}
                />
              </div>
            </div>
          ))}
        </div>

        <div className="mt-6 border-t border-gray-200 pt-4 text-sm text-gray-600">
          <p>Total Spans: 18 | Errors: 2 | Critically Slow Spans: 1</p>
        </div>
      </div>

      <div className="rounded-lg border border-gray-200 bg-white p-6">
        <h3 className="mb-4 text-lg font-bold text-gray-900">Span Details</h3>

        <div className="mb-6 grid grid-cols-2 gap-6">
          <div>
            <p className="mb-1 text-sm text-gray-600">Span ID</p>
            <p className="font-mono text-gray-900">sp-0012-db-42</p>
          </div>
          <div>
            <p className="mb-1 text-sm text-gray-600">Duration</p>
            <p className="font-mono text-gray-900">984.22 ms</p>
          </div>
        </div>

        <div className="mb-6">
          <p className="mb-3 text-sm font-medium text-gray-900">Tags & Attributes</p>
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

        <div className="mb-6 rounded border border-red-200 bg-red-50 p-4">
          <p className="mb-2 flex items-center gap-2 text-sm font-medium text-red-900">
            <span className="material-symbols-outlined text-base">warning</span>
            Exception Stacktrace
          </p>
          <code className="block whitespace-pre-wrap font-mono text-xs text-red-800">
            {`java.net.SocketTimeoutException: Read timed out
  at java.net.SocketInputStream.socketRead0(Native Method)
  at java.net.SocketInputStream.read(SocketInputStream.java:152)
  at com.payment.client.Http.call(Http.java:44)
  at com.app.Service.invoke(Service.java:128)`}
          </code>
        </div>

        <button className="text-sm font-medium text-blue-600 hover:underline">View Logs for this Span</button>
      </div>

      <div className="mt-8 border-t border-gray-200 pt-6 text-center text-sm text-gray-500">
        System Health: Operational | v2.4.0
      </div>
    </div>
  );
}
