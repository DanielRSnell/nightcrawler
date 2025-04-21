'use client';

import { useState, useEffect } from 'react';
import { getAuthToken, getPids, getPidHistory } from '../../lib/auth-api';

export default function TestChart() {
  const [pids, setPids] = useState([]);
  const [pidHistory, setPidHistory] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    async function fetchData() {
      try {
        setLoading(true);
        // Get authentication token first
        const token = await getAuthToken();
        
        // Get list of PIDs
        const pidsData = await getPids(token.access_token);
        setPids(pidsData);
        console.log('PIDs:', pidsData);
        
        // Get history for the first PID if available
        if (pidsData && pidsData.length > 0) {
          const firstPid = pidsData[0];
          const historyData = await getPidHistory(token.access_token, firstPid);
          setPidHistory(historyData);
          console.log('PID History:', historyData);
        }
        
        setLoading(false);
      } catch (err) {
        console.error('Error fetching data:', err);
        setError(err.message);
        setLoading(false);
      }
    }
    
    fetchData();
  }, []);

  if (loading) return <div className="p-4">Loading...</div>;
  if (error) return <div className="p-4 text-red-500">Error: {error}</div>;

  return (
    <div className="p-4">
      <h1 className="text-2xl font-bold mb-4">PID Test Chart</h1>
      
      <div className="mb-6">
        <h2 className="text-xl font-semibold mb-2">PIDs List</h2>
        {pids && pids.length > 0 ? (
          <ul className="border rounded p-4">
            {pids.map((pid, index) => (
              <li key={index} className="mb-2 p-2 border-b">
                {JSON.stringify(pid)}
              </li>
            ))}
          </ul>
        ) : (
          <p>No PIDs found</p>
        )}
      </div>
      
      <div>
        <h2 className="text-xl font-semibold mb-2">First PID History</h2>
        {pidHistory && pidHistory.length > 0 ? (
          <div className="border rounded p-4">
            <pre className="whitespace-pre-wrap">{JSON.stringify(pidHistory, null, 2)}</pre>
          </div>
        ) : (
          <p>No history data available</p>
        )}
      </div>
    </div>
  );
}
