# LogAnalyzer Pro Frontend

A React + Vite dashboard for analyzing and monitoring distributed system logs, traces, and metrics.

## Features

- **Dashboard**: System health overview with real-time metrics
- **Global Search**: Query logs with JIRA-style syntax
- **Log Stream**: Tabular view of logs with filtering and anomaly detection
- **Trace Viewer**: Distributed request tracing with service timeline
- **Sticky Navigation**: Always-visible top nav for easy page switching
- **Tailwind CSS**: Clean, professional, responsive UI

## Quick Start

### Prerequisites

- Node.js 16+
- Backend running on `http://localhost:8000`

### Installation & Development

```bash
# Install dependencies
npm install

# Start dev server (runs on http://localhost:3000)
npm run dev

# Build for production
npm run build

# Preview production build
npm run preview
```

### Project Structure

```
frontend/
├── src/
│   ├── components/
│   │   └── Navigation.jsx        # Top navigation bar
│   ├── pages/
│   │   ├── Dashboard.jsx         # System metrics overview
│   │   ├── Logs.jsx              # Log stream with filters
│   │   ├── Search.jsx            # Global search interface
│   │   └── Trace.jsx             # Trace viewer
│   ├── App.jsx                   # Main app with router
│   └── main.jsx                  # Entry point
├── index.html                    # HTML template
├── vite.config.js                # Vite configuration with proxy
└── package.json                  # Dependencies & scripts
```

## Backend Integration

The frontend is configured to proxy requests to the backend. All API calls starting with `/api` are forwarded to `http://localhost:8000`.

### Expected Backend Endpoints

```
GET /logs                          # All logs
GET /logs?correlation_id=xxx       # Filter by correlation ID
GET /errors                        # Error logs only
GET /anomalies                     # ML-detected anomalies
GET /trace/{correlation_id}        # Full request-response trace
GET /latency                       # Slow API calls
GET /insights                      # Dashboard summary
```

### Making API Calls

In your React components, simply fetch from `/api`:

```javascript
const res = await fetch('/api/logs');
const data = await res.json();
```

The Vite proxy (configured in `vite.config.js`) automatically strips `/api` and forwards to the backend:

```
/api/logs  →  http://localhost:8000/logs
```

## Configuration

### Proxy Settings

Edit `vite.config.js` if your backend is on a different host/port:

```javascript
proxy: {
  '/api': {
    target: 'http://localhost:8000',  // Change this
    changeOrigin: true,
    rewrite: (path) => path.replace(/^\/api/, '')
  }
}
```

### Environment Variables

Create a `.env` file for environment-specific settings:

```env
VITE_API_URL=http://localhost:8000
```

Then in components:

```javascript
const apiUrl = import.meta.env.VITE_API_URL;
```

## Styling

- **Tailwind CSS**: Configured via CDN in `index.html`
- **Material Symbols**: Icon font loaded from Google Fonts
- **Color Scheme**: Light blue primary, pure white secondary, technical aesthetic

To customize colors, edit the Tailwind classes in components or the CDN link in `index.html`.

## Deployment

### Build Production

```bash
npm run build
```

Creates an optimized `dist/` folder ready to serve.

### Serve Frontend & Backend Together

Option 1: Run both on same machine
```bash
# Terminal 1: Backend
cd ..  # go to project root
uvicorn src.main:app --host 0.0.0.0 --port 8000

# Terminal 2: Frontend
cd frontend
npm run dev
```

Option 2: Serve frontend from backend
```bash
# Build frontend
cd frontend && npm run build

# Copy dist to backend's static folder (if needed)
# Then serve from backend's static route
```

## Development Tips

- **Hot Module Replacement (HMR)**: Vite auto-reloads on file changes
- **DevTools**: Use React Developer Tools extension for browser debugging
- **Console Logging**: Check browser console for API errors
- **Network Tab**: Monitor `/api` calls to verify backend connectivity

## Troubleshooting

### CORS Errors

The proxy handles CORS automatically. If you still see errors:
1. Ensure backend is running on `localhost:8000`
2. Check `vite.config.js` proxy settings
3. Restart dev server: `npm run dev`

### 404 on API Calls

- Verify backend endpoint exists: `curl http://localhost:8000/logs`
- Check proxy rewrite is removing `/api` correctly
- Inspect network tab to see actual request URL

### Port Conflicts

Change Vite port in `vite.config.js`:
```javascript
server: {
  port: 3001,  // Use different port
  // ...
}
```

## Next Steps

1. Replace hardcoded mock data in pages with real API calls
2. Add error handling and loading states
3. Integrate chart libraries (Recharts, Chart.js) for Dashboard metrics
4. Add TypeScript for type safety
5. Set up unit tests with Vitest

---

**Version**: 0.1.0  
**Last Updated**: 2024
# Temp
