import { useEffect, useState } from 'react';
import API from '../api/axios';
import UserTable from '../components/UserTable';

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
      {users.length === 0 ? <p>No users found.</p> : <UserTable users={users} />}
    </div>
  );
}
