export default function SummaryCard({ title, summary, createdAt }) {
  return (
    <div className="p-4 border rounded mb-3 bg-white shadow">
      <h3 className="font-semibold">{title}</h3>
      <p className="text-sm text-gray-500">{new Date(createdAt).toLocaleString()}</p>
      <p className="mt-2 whitespace-pre-line text-gray-800">{summary}</p>
    </div>
  );
}