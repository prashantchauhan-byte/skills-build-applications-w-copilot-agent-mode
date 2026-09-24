import { useCollection } from '../hooks/useCollection.js'

function Activities() {
  const { items: activities, loading, error } = useCollection('/api/activities/', 'activities')

  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">A little every day</p>
          <h1>Activity feed</h1>
        </div>
        <span className="count-badge">{activities.length} logged</span>
      </div>
      {loading && <p className="status-message">Loading activity...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        activities.length ? <div className="table-shell">
          <table className="tracker-table">
            <thead><tr><th>Who</th><th>Movement</th><th>Duration</th><th>Energy</th><th>Date</th></tr></thead>
            <tbody>
              {activities.map((activity) => (
                <tr key={activity._id || activity.id}>
                  <td><strong>{activity.user?.name || activity.userName || 'Community member'}</strong></td>
                  <td><span className="type-pill">{activity.type}</span></td>
                  <td>{activity.durationMinutes || activity.duration || 0} min</td>
                  <td>{activity.calories || 0} kcal</td>
                  <td>{activity.date ? new Date(activity.date).toLocaleDateString() : '—'}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div> : <p className="status-message">No activity has been logged yet.</p>
      )}
    </section>
  )
}

export default Activities