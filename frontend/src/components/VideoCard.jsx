export default function VideoCard({ title, thumbnail, onSummarize }) {
  return (
    <div className="border p-4 rounded shadow bg-white">
      <img src={thumbnail} alt="Thumbnail" className="w-full mb-2 rounded" />
      <h3 className="text-lg font-semibold">{title}</h3>
      {onSummarize && (
        <button
          onClick={onSummarize}
          className="mt-4 bg-green-600 text-white px-4 py-2 rounded hover:bg-green-700"
        >
          Summarize
        </button>
      )}
    </div>
  );
}