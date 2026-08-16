import { useEffect, useState } from 'react';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
          : 'http://localhost:8000/api/teams/';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to load teams. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const teamList = Array.isArray(data)
          ? data
          : data.results || data.teams || [];

        setTeams(teamList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <p>Loading teams...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Unable to load teams.</strong>
          <br />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2>Teams</h2>

        <p className="text-muted">
          Explore the teams participating in OctoFit Tracker.
        </p>
      </div>

      {teams.length === 0 ? (
        <div className="alert alert-info">
          No teams are currently available.
        </div>
      ) : (
        <div className="row">
          {teams.map((team) => (
            <div key={team._id} className="col-md-6 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {team.name || 'Unnamed Team'}
                  </h5>

                  <p className="card-text">
                    {team.description || 'No description available.'}
                  </p>

                  {team.color && (
                    <div className="mb-3">
                      <span
                        className="badge"
                        style={{ backgroundColor: team.color }}
                      >
                        {team.color}
                      </span>
                    </div>
                  )}

                  <p>
                    <strong>Captain:</strong>{' '}
                    {team.captain
                      ? `${team.captain.firstName ?? ''} ${
                          team.captain.lastName ?? ''
                        }`.trim()
                      : 'N/A'}
                  </p>

                  <p>
                    <strong>Members:</strong>{' '}
                    {team.members?.length ?? 0}
                  </p>

                  <p>
                    <strong>Total Points:</strong>{' '}
                    {team.totalPoints ?? 0}
                  </p>
                </div>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
}