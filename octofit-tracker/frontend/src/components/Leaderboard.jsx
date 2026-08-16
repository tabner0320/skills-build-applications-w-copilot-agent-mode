import { useEffect, useState } from 'react';

export default function Leaderboard() {
  const [leaderboard, setLeaderboard] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadLeaderboard = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/leaderboard/`
          : 'http://localhost:8000/api/leaderboard/';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to load leaderboard. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const leaderboardEntries = Array.isArray(data)
          ? data
          : data.results || data.leaderboard || [];

        setLeaderboard(leaderboardEntries);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadLeaderboard();
  }, []);

  const displayRank = (rank) => {
    switch (rank) {
      case 1:
        return '🥇';
      case 2:
        return '🥈';
      case 3:
        return '🥉';
      default:
        return rank ?? 'N/A';
    }
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <p>Loading leaderboard...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Unable to load leaderboard.</strong>
          <br />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2>Leaderboard</h2>
        <p className="text-muted">
          View the top-performing OctoFit Tracker members.
        </p>
      </div>

      {leaderboard.length === 0 ? (
        <div className="alert alert-info">
          No leaderboard entries are currently available.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>Rank</th>
                <th>User</th>
                <th>Points</th>
                <th>Streak Days</th>
              </tr>
            </thead>

            <tbody>
              {leaderboard.map((entry) => (
                <tr key={entry._id}>
                  <td className="fw-bold">
                    {displayRank(entry.rank)}
                  </td>

                  <td>
                    {entry.user
                      ? `${entry.user.firstName ?? ''} ${
                          entry.user.lastName ?? ''
                        }`.trim()
                      : 'Unknown User'}
                  </td>

                  <td className="fw-bold">
                    {entry.points ?? 0}
                  </td>

                  <td>
                    {entry.streakDays != null
                      ? `${entry.streakDays} days`
                      : 'N/A'}
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