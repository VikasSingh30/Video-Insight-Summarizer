import { useState } from 'react';
import API from '../api/axios';
import { useNavigate } from 'react-router-dom';

export default function Home() {
  const [url, setUrl] = useState('');
  const [videoData, setVideoData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError('');
    try {
      const res = await API.post('/youtube/metadata', { url });
      setVideoData(res.data);
    } catch (err) {
      setError('Invalid YouTube URL or failed to fetch metadata');
    }
  };

  const handleSummarize = async () => {
    if (!videoData) return;
    try {
      const res = await API.post('/summary/summarize', {
        videoId: url.split('v=')[1],
        title: videoData.title,
      });
      navigate('/summary', {
        state: { summary: res.data.summary, video: videoData },
      });
    } catch (err) {
      setError(err.response?.data?.message || 'Summarization failed');
    }
  };

  return (
    <div className="p-6 max-w-xl mx-auto space-y-6">
      <form onSubmit={handleSubmit} className="space-y-4">
        <input
          type="text"
          value={url}
          onChange={(e) => setUrl(e.target.value)}
          placeholder="Paste YouTube URL"
          className="w-full px-3 py-2 border rounded"
        />
        <button
          type="submit"
          className="bg-blue-600 text-white px-4 py-2 rounded hover:bg-blue-700"
        >
          Fetch Video
        </button>
      </form>

      {error && <p className="text-red-500">{error}</p>}

      {videoData && (
        <div className="border p-4 rounded shadow bg-white">
          <img
            src={videoData.thumbnail}
            alt="Thumbnail"
            className="w-full mb-2 rounded"
          />
          <h3 className="text-lg font-semibold">{videoData.title}</h3>
          <button
            onClick={handleSummarize}
            className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
          >
            Summarize
          </button>
        </div>
      )}
    </div>
  );
}
