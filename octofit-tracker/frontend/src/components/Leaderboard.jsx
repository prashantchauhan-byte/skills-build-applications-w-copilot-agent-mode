import { useCollection } from '../hooks/useCollection.js'

function Leaderboard() {
  const { items: leaderboard, loading, error } = useCollection('/api/leaderboard/', 'leaderboard')

  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Friendly competition</p>
          <h1>Leaderboard</h1>
        </div>
        <span className="count-badge">This month</span>
      </div>
      {loading && <p className="status-message">Loading rankings...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        leaderboard.length ? <div className="ranking-list">
          {leaderboard.map((entry, index) => (
            <article className={`ranking-row rank-${entry.rank || index + 1}`} key={entry._id || entry.id || index}>
              <span className="rank-number">{entry.rank || index + 1}</span>
              <div className="avatar">{entry.user?.avatar || entry.user?.name?.slice(0, 2).toUpperCase() || '?'}</div>
              <div className="ranking-person"><strong>{entry.user?.name || entry.name || 'Community member'}</strong><span>{entry.team?.name || 'OctoFit community'}</span></div>
              <strong className="points">{entry.points || 0}<small> pts</small></strong>
            </article>
          ))}
        </div> : <p className="status-message">No rankings are available yet.</p>
      )}
    </section>
  )
}

export default Leaderboard