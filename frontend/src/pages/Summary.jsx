import { useEffect, useState } from 'react';
import API from '../api/axios';
import SummaryCard from '../components/SummaryCard';

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
          <SummaryCard key={idx} title={s.title} summary={s.summary} createdAt={s.createdAt} />
        ))
      )}
    </div>
  );
}