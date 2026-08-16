import { useEffect, useState } from 'react';

export default function Workouts() {
  const [workouts, setWorkouts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadWorkouts = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/workouts/`
          : 'http://localhost:8000/api/workouts/';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to load workouts. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const workoutList = Array.isArray(data)
          ? data
          : data.results || data.workouts || [];

        setWorkouts(workoutList);
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
        <div className="text-center">
          <p>Loading workouts...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Unable to load workouts.</strong>
          <br />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2>Workouts</h2>

        <p className="text-muted">
          Explore workout recommendations from OctoFit Tracker.
        </p>
      </div>

      {workouts.length === 0 ? (
        <div className="alert alert-info">
          No workouts are currently available.
        </div>
      ) : (
        <div className="row">
          {workouts.map((workout) => (
            <div key={workout._id} className="col-md-4 mb-4">
              <div className="card h-100 shadow-sm">
                <div className="card-body">
                  <h5 className="card-title">
                    {workout.title || 'Untitled Workout'}
                  </h5>

                  <p className="card-text">
                    {workout.focus || 'General Fitness'}
                  </p>

                  <div className="mb-3">
                    <span className="badge bg-primary">
                      {workout.difficulty || 'N/A'}
                    </span>
                  </div>

                  <p>
                    <strong>Duration:</strong>{' '}
                    {workout.durationMinutes != null
                      ? `${workout.durationMinutes} min`
                      : 'N/A'}
                  </p>

                  <div className="mb-3">
                    <strong>Exercises:</strong>

                    {workout.exercises?.length > 0 ? (
                      <ul className="small mt-2">
                        {workout.exercises.map((exercise, index) => (
                          <li key={index}>{exercise}</li>
                        ))}
                      </ul>
                    ) : (
                      <p className="small text-muted mt-2">
                        No exercises listed.
                      </p>
                    )}
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
      )}
    </div>
  );
}