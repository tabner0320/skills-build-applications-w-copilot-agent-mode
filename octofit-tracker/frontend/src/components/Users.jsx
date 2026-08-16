import { useEffect, useState } from 'react';

export default function Users() {
  const [users, setUsers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadUsers = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/users/`
          : 'http://localhost:8000/api/users/';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to load users. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const userList = Array.isArray(data)
          ? data
          : data.results || data.users || [];

        setUsers(userList);
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
        <div className="text-center">
          <p>Loading users...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Unable to load users.</strong>
          <br />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2>Users</h2>

        <p className="text-muted">
          View OctoFit Tracker members and their fitness progress.
        </p>
      </div>

      {users.length === 0 ? (
        <div className="alert alert-info">
          No users are currently available.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
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
                    {`${user.firstName ?? ''} ${
                      user.lastName ?? ''
                    }`.trim() || 'N/A'}
                  </td>

                  <td>{user.email || 'N/A'}</td>

                  <td>{user.age ?? 'N/A'}</td>

                  <td>
                    {user.fitnessLevel || 'N/A'}
                  </td>

                  <td className="fw-bold">
                    {user.points ?? 0}
                  </td>

                  <td>
                    {user.team?.name || 'N/A'}
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}