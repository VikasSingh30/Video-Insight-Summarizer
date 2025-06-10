import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Dashboard() {
  const [summaries, setSummaries] = useState([]);
  const [error, setError] = useState('');
  const [quotaLeft, setQuotaLeft] = useState(null);

  useEffect(() => {
    const fetchData = async () => {
      try {
        const res = await API.get('/user/summaries');
        setSummaries(res.data.history);
        setQuotaLeft(res.data.quotaLeft);
      } catch (err) {
        setError('Failed to load summaries');
      }
    };
    fetchData();
  }, []);

  return (
    <div className="p-6 max-w-3xl mx-auto space-y-4">
      <h2 className="text-xl font-bold">Your Summaries</h2>
      {quotaLeft !== null && (
        <p className="text-sm text-gray-600">Daily quota left: {quotaLeft} summaries</p>
      )}
      {error && <p className="text-red-500">{error}</p>}
      {summaries.length === 0 ? (
        <p>No summaries yet.</p>
      ) : (
        summaries.map((s, idx) => (
          <div key={idx} className="p-4 border rounded mb-3 bg-white shadow">
            <h3 className="font-semibold">{s.title}</h3>
            <p className="text-sm text-gray-500">{new Date(s.createdAt).toLocaleString()}</p>
            <p className="mt-2 whitespace-pre-line text-gray-800">{s.summary}</p>
          </div>
        ))
      )}
    </div>
  );
}