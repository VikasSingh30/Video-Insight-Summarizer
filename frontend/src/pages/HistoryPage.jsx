import React, { useEffect, useState } from 'react';
import axios from '../spi/axios';
import { Clock, Calendar, Trash2, Pencil } from 'lucide-react';
import { useAuth } from '../context/AuthContext';

export default function HistoryPage() {
  const { user } = useAuth();
  const [history, setHistory] = useState([]);
  const [search, setSearch] = useState('');
  const [filtered, setFiltered] = useState([]);
  const [page, setPage] = useState(1);
  const limit = 5;

  useEffect(() => {
    axios.get('/summary/history')
      .then(res => {
        const sorted = res.data.reverse();
        setHistory(sorted);
        setFiltered(sorted);
      })
      .catch(() => alert('Failed to load summary history'));
  }, []);

  useEffect(() => {
    const term = search.toLowerCase();
    const results = history.filter(item =>
      item.title.toLowerCase().includes(term) ||
      item.summary.toLowerCase().includes(term)
    );
    setFiltered(results);
    setPage(1);
  }, [search, history]);

  const handleDelete = async (id) => {
    if (!window.confirm('Delete this summary?')) return;
    try {
      await axios.delete(`/summary/${id}`);
      setHistory(prev => prev.filter(item => item._id !== id));
    } catch {
      alert('Delete failed');
    }
  };

  const paginated = filtered.slice((page - 1) * limit, page * limit);
  const totalPages = Math.ceil(filtered.length / limit);

  return (
    <div className="max-w-4xl mx-auto">
      <h2 className="text-2xl font-bold mb-4">Summary History</h2>

      <input
        type="text"
        placeholder="Search by title or summary..."
        value={search}
        onChange={(e) => setSearch(e.target.value)}
        className="w-full mb-4 px-3 py-2 border rounded"
      />

      {paginated.length === 0 ? (
        <p className="text-gray-600">No summaries yet. Try generating one!</p>
      ) : (
        <div className="space-y-4">
          {paginated.map((item) => (
            <div key={item._id} className="bg-white p-4 rounded shadow">
              <div className="flex items-start gap-4">
                <img src={item.thumbnail} alt="thumb" className="w-32 h-20 object-cover rounded" />
                <div className="flex-1">
                  <h3 className="font-semibold">{item.title}</h3>
                  <div className="text-sm text-gray-500 flex gap-4 mb-2">
                    <span className="flex items-center gap-1"><Clock className="w-4 h-4" /> {item.duration}</span>
                    <span className="flex items-center gap-1"><Calendar className="w-4 h-4" /> {new Date(item.createdAt).toLocaleDateString()}</span>
                  </div>
                  <p className="text-gray-700 mb-2">{item.summary}</p>

                  {user?.isAdmin && (
                    <div className="flex gap-2">
                      <button onClick={() => handleDelete(item._id)} className="text-red-600 hover:text-red-800 flex items-center gap-1 text-sm">
                        <Trash2 className="w-4 h-4" /> Delete
                      </button>
                      <button disabled className="text-gray-500 flex items-center gap-1 text-sm">
                        <Pencil className="w-4 h-4" /> Edit (soon)
                      </button>
                    </div>
                  )}
                </div>
              </div>
            </div>
          ))}

          {totalPages > 1 && (
            <div className="flex justify-center gap-2 mt-6">
              <button onClick={() => setPage(p => Math.max(1, p - 1))} disabled={page === 1} className="px-3 py-1 border rounded disabled:opacity-40">Prev</button>
              <span className="px-3 py-1">Page {page} of {totalPages}</span>
              <button onClick={() => setPage(p => Math.min(totalPages, p + 1))} disabled={page === totalPages} className="px-3 py-1 border rounded disabled:opacity-40">Next</button>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
