import { useCollection } from '../hooks/useCollection.js'

const teamsEndpoint = import.meta.env.VITE_CODESPACE_NAME
  ? `https://${import.meta.env.VITE_CODESPACE_NAME}-8000.app.github.dev/api/teams/`
  : 'http://localhost:8000/api/teams/'

function Teams() {
  const { items: teams, loading, error } = useCollection(teamsEndpoint, 'teams')

  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Find your pace</p>
          <h1>Teams with momentum</h1>
        </div>
        <span className="count-badge">{teams.length} teams</span>
      </div>
      {loading && <p className="status-message">Loading teams...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        teams.length ? <div className="team-grid">
          {teams.map((team) => (
            <article className="team-card" key={team._id || team.id || team.name}>
              <div className="team-color" style={{ backgroundColor: team.color || '#ef8354' }} />
              <div className="team-card-body">
                <h2>{team.name}</h2>
                <p>{team.members?.length || 0} active members</p>
                <div className="avatar-row">
                  {(team.members || []).slice(0, 5).map((member) => (
                    <span className="mini-avatar" key={member._id || member.id}>{member.avatar || member.name?.slice(0, 1)}</span>
                  ))}
                </div>
              </div>
            </article>
          ))}
        </div> : <p className="status-message">No teams have been created yet.</p>
      )}
    </section>
  )
}

export default Teams