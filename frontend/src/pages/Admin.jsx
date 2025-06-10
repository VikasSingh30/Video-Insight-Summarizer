import { useEffect, useState } from 'react';
import API from '../api/axios';

export default function Admin() {
  const [users, setUsers] = useState([]);
  const [error, setError] = useState('');

  useEffect(() => {
    const fetchUsers = async () => {
      try {
        const res = await API.get('/admin/users');
        setUsers(res.data);
      } catch (err) {
        setError('Access denied or failed to load users');
      }
    };
    fetchUsers();
  }, []);

  return (
    <div className="p-6 max-w-4xl mx-auto">
      <h2 className="text-xl font-bold mb-4">Admin Panel</h2>
      {error && <p className="text-red-500">{error}</p>}
      {users.length === 0 ? (
        <p>No users found.</p>
      ) : (
        <table className="w-full border-collapse border text-left">
          <thead>
            <tr className="bg-gray-200">
              <th className="border px-4 py-2">Email</th>
              <th className="border px-4 py-2">Role</th>
              <th className="border px-4 py-2">Premium</th>
            </tr>
          </thead>
          <tbody>
            {users.map((u, i) => (
              <tr key={i}>
                <td className="border px-4 py-2">{u.email}</td>
                <td className="border px-4 py-2">{u.role || 'user'}</td>
                <td className="border px-4 py-2">{u.isPremium ? '✅' : '❌'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      )}
    </div>
  );
}