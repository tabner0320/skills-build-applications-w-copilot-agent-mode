import { useEffect, useState } from 'react';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);
        setError(null);

        const apiUrl = import.meta.env.VITE_CODESPACE_NAME
          ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/activities/`
          : 'http://localhost:8000/api/activities/';

        const response = await fetch(apiUrl);

        if (!response.ok) {
          throw new Error(
            `Failed to load activities. Status: ${response.status}`
          );
        }

        const data = await response.json();

        const activityList = Array.isArray(data)
          ? data
          : data.results || data.activities || [];

        setActivities(activityList);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const formatDate = (dateString) => {
    if (!dateString) {
      return 'N/A';
    }

    return new Date(dateString).toLocaleDateString('en-US', {
      month: 'short',
      day: 'numeric',
      year: 'numeric',
      hour: '2-digit',
      minute: '2-digit',
    });
  };

  if (loading) {
    return (
      <div className="container mt-5">
        <div className="text-center">
          <p>Loading activities...</p>
        </div>
      </div>
    );
  }

  if (error) {
    return (
      <div className="container mt-5">
        <div className="alert alert-danger" role="alert">
          <strong>Unable to load activities.</strong>
          <br />
          {error}
        </div>
      </div>
    );
  }

  return (
    <div className="container mt-5">
      <div className="mb-4">
        <h2>Activities</h2>
        <p className="text-muted">
          View recent fitness activity from OctoFit Tracker members.
        </p>
      </div>

      {activities.length === 0 ? (
        <div className="alert alert-info">
          No activities are currently available.
        </div>
      ) : (
        <div className="table-responsive">
          <table className="table table-striped table-hover align-middle">
            <thead className="table-dark">
              <tr>
                <th>User</th>
                <th>Type</th>
                <th>Duration</th>
                <th>Distance</th>
                <th>Calories</th>
                <th>Date</th>
                <th>Notes</th>
              </tr>
            </thead>

            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id}>
                  <td>
                    {activity.user
                      ? `${activity.user.firstName ?? ''} ${
                          activity.user.lastName ?? ''
                        }`.trim()
                      : 'Unknown User'}
                  </td>

                  <td>{activity.type || 'N/A'}</td>

                  <td>
                    {activity.durationMinutes != null
                      ? `${activity.durationMinutes} min`
                      : 'N/A'}
                  </td>

                  <td>
                    {activity.distanceKm != null
                      ? `${activity.distanceKm} km`
                      : 'N/A'}
                  </td>

                  <td>
                    {activity.caloriesBurned != null
                      ? activity.caloriesBurned
                      : 'N/A'}
                  </td>

                  <td>{formatDate(activity.date)}</td>

                  <td>{activity.notes || 'N/A'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      )}
    </div>
  );
}