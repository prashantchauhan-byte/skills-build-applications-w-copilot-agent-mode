import { useCollection } from '../hooks/useCollection.js'

function Users() {
  const { items: users, loading, error } = useCollection('/api/users/', 'users')

  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">The crew</p>
          <h1>People making moves</h1>
        </div>
        <span className="count-badge">{users.length} members</span>
      </div>
      <DataState loading={loading} error={error} />
      {!loading && !error && (
        <div className="member-grid">
          {users.map((user) => (
            <article className="member-card" key={user._id || user.id || user.email}>
              <div className="avatar">{user.avatar || user.name?.slice(0, 2).toUpperCase()}</div>
              <div>
                <h2>{user.name}</h2>
                <p>{user.email}</p>
                <span className="soft-label">{user.team?.name || 'Independent'}</span>
              </div>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

function DataState({ loading, error }) {
  if (loading) return <p className="status-message">Loading the latest tracker data...</p>
  if (error) return <p className="status-message error-message">{error}</p>
  return null
}

export default Users