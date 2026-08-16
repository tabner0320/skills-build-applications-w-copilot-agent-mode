import { useState, useEffect } from 'react';
import { getApiUrl } from '../config/api';

export default function Activities() {
  const [activities, setActivities] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    const loadActivities = async () => {
      try {
        setLoading(true);

        const response = await fetch(getApiUrl('/api/activities/'));
        const data = await response.json();

        setActivities(Array.isArray(data) ? data : data.results || []);
      } catch (err) {
        setError(err.message);
      } finally {
        setLoading(false);
      }
    };

    loadActivities();
  }, []);

  const formatDate = (dateString) => {
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
        <p>Loading activities...</p>
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
      <h2>Activities</h2>

      <div className="table-responsive">
        <table className="table table-striped">
          <thead>
            <tr>
              <th>User</th>
              <th>Type</th>
              <th>Duration (min)</th>
              <th>Distance (km)</th>
              <th>Calories</th>
              <th>Date</th>
              <th>Notes</th>
            </tr>
          </thead>

          <tbody>
            {activities.map((activity) => (
              <tr key={activity._id}>
                <td>
                  {activity.user?.firstName} {activity.user?.lastName}
                </td>
                <td>{activity.type}</td>
                <td>{activity.durationMinutes}</td>
                <td>{activity.distanceKm}</td>
                <td>{activity.caloriesBurned}</td>
                <td>{formatDate(activity.date)}</td>
                <td>{activity.notes || 'N/A'}</td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
}