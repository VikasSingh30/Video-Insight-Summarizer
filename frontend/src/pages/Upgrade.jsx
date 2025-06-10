import { useEffect } from 'react';

export default function Upgrade() {
  useEffect(() => {
    const script = document.createElement('script');
    script.src = 'https://cdn.paddle.com/paddle/paddle.js';
    script.async = true;
    script.onload = () => {
      window.Paddle.Setup({ vendor: YOUR_VENDOR_ID }); // real Paddle Vendor ID needed
    };
    document.body.appendChild(script);
  }, []);

  const handleUpgrade = () => {
    window.Paddle.Checkout.open({
      product: YOUR_PRODUCT_ID, // replace with your Paddle Product ID
      email: '', // optional: prefill user email
      passthrough: '', // optional: pass user ID
    });
  };

  return (
    <div className="p-6 text-center">
      <h2 className="text-2xl font-bold mb-4">Upgrade to Premium</h2>
      <p className="mb-4">Unlock unlimited summaries and priority processing.</p>
      <button
        onClick={handleUpgrade}
        className="bg-purple-600 text-white px-4 py-2 rounded hover:bg-purple-700"
      >
        Upgrade with Paddle
      </button>
    </div>
  );
}
