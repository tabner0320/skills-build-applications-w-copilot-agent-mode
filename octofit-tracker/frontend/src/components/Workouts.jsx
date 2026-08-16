import { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);

        const response = await fetch(getApiUrl('/api/workouts/'));
        const data = await response.json();

        setWorkouts(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadWorkouts();
  }, []);

  if (loading) {
    return (
      <div className="container mt-5">
        <p>Loading workouts...</p>
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
      <h2>Workouts</h2>

      <div className="row">
        {workouts.map((workout) => (
          <div key={workout._id} className="col-md-4 mb-4">
            <div className="card h-100">
              <div className="card-body">
                <h5 className="card-title">{workout.title}</h5>

                <p className="card-text">{workout.focus}</p>

                <div className="mb-2">
                  <span className="badge bg-primary">
                    {workout.difficulty}
                  </span>
                </div>

                <p>
                  <strong>Duration:</strong>{' '}
                  {workout.durationMinutes} min
                </p>

                <div className="mb-2">
                  <strong>Exercises:</strong>

                  <ul className="small">
                    {workout.exercises?.map((exercise, idx) => (
                      <li key={idx}>{exercise}</li>
                    ))}
                  </ul>
                </div>

                {workout.coachNotes && (
                  <p className="small text-muted">
                    <strong>Coach Notes:</strong>{' '}
                    {workout.coachNotes}
                  </p>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
}