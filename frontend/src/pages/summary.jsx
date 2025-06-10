import { useLocation } from 'react-router-dom';

export default function Summary() {
  const { state } = useLocation();
  const { summary, video } = state || {};

  if (!summary || !video) return <div className="p-6 text-center">No summary to display.</div>;

  return (
    <div className="max-w-2xl mx-auto p-6 space-y-4">
      <h2 className="text-2xl font-bold">{video.title}</h2>
      <img src={video.thumbnail} alt="Thumbnail" className="w-full rounded" />
      <div className="bg-gray-100 p-4 rounded text-gray-800 whitespace-pre-line">
        {summary}
      </div>
    </div>
  );
}