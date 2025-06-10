import { useEffect } from 'react';

export default function Upgrade() {
  useEffect(() => {
    // Paddle script would go here in production
    console.log('Upgrade page loaded. Integrate Paddle checkout here.');
  }, []);

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
      <p className="mb-4">Unlock unlimited summaries and priority processing.</p>
      <button
        className="bg-purple-600 text-white px-4 py-2 rounded"
        onClick={() => alert('Redirect to Paddle checkout')}
      >
        Upgrade Now
      </button>
    </div>
  );
}
