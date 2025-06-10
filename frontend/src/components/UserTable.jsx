export default function UserTable({ users }) {
  return (
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
  );
}