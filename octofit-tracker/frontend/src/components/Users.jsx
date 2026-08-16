import { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);

        const response = await fetch(getApiUrl('/api/users/'));
        const data = await response.json();

        setUsers(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadUsers();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading users...</p>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <p className="text-danger">Error: {error}</p>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <h2>Users</h2>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>Name</th>
              <th>Email</th>
              <th>Age</th>
              <th>Fitness Level</th>
              <th>Points</th>
              <th>Team</th>
            </tr>
          </thead>

          <tbody>
            {users.map((user) => (
              <tr key={user._id}>
                <td>
                  {user.firstName} {user.lastName}
                </td>
                <td>{user.email}</td>
                <td>{user.age}</td>
                <td>{user.fitnessLevel}</td>
                <td>{user.points}</td>
                <td>{user.team?.name || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}