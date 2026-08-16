import { useState, useEffect } from 'react';
import { fetchTeams } from '../config/api';

export default function Teams() {
  const [teams, setTeams] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadTeams = async () => {
      try {
        setLoading(true);
        const data = await fetchTeams();
        setTeams(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadTeams();
  }, []);

  if (loading) return <div className="container mt-5"><p>Loading teams...</p></div>;
  if (error) return <div className="container mt-5"><p className="text-danger">Error: {error}</p></div>;

  return (
    <div className="container mt-5">
      <h2>Teams</h2>
      <div className="row">
        {teams.map((team) => (
          <div key={team._id} className="col-md-6 mb-4">
            <div className="card">
              <div className="card-body">
                <h5 className="card-title">{team.name}</h5>
                <p className="card-text">{team.description}</p>
                <div className="mb-2">
                  <span className="badge" style={{ backgroundColor: team.color }}>
                    {team.color}
                  </span>
                </div>
                <p><strong>Captain:</strong> {team.captain?.firstName} {team.captain?.lastName || 'N/A'}</p>
                <p><strong>Members:</strong> {team.members?.length || 0}</p>
                <p><strong>Total Points:</strong> {team.totalPoints}</p>
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}
