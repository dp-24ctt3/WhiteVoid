import { router } from './routes';
import { RouterProvider } from 'react-router-dom';
import { useEffect, useState } from 'react';

const BASE_URL = "http://localhost:8000";

export default function App() {
  const [backendDown, setBackendDown] = useState(false);

  useEffect(() => {
    fetch(BASE_URL + "/health")
      .then(r => r.json())
      .then(data => { if (data.status !== "ok") setBackendDown(true); })
      .catch(() => setBackendDown(true));
  }, []);

  return (
    (backendDown) ? (
      <div className="backend-down">
        <div className="brand">The Void is down.</div>
        <div className="subtitle">Hopefully, it's temporary. It's all you have, after all...</div>
      </div>
    ) :
      <RouterProvider router={router} />
  )
}
