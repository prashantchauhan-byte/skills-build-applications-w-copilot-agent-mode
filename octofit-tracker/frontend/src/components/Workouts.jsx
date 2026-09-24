import { useCollection } from '../hooks/useCollection.js'

function Workouts() {
  const { items: workouts, loading, error } = useCollection('workouts', 'workouts')

  return (
    <section className="view-section">
      <div className="section-heading">
        <div>
          <p className="eyebrow">Pick your challenge</p>
          <h1>Workout library</h1>
        </div>
        <span className="count-badge">{workouts.length} sessions</span>
      </div>
      {loading && <p className="status-message">Loading workouts...</p>}
      {error && <p className="status-message error-message">{error}</p>}
      {!loading && !error && (
        <div className="workout-grid">
          {workouts.map((workout) => (
            <article className="workout-card" key={workout._id || workout.id || workout.name}>
              <div className="workout-card-top"><span className="type-pill">{workout.type}</span><span>{workout.durationMinutes || workout.duration || 0} min</span></div>
              <h2>{workout.name}</h2>
              <p>{workout.exercises?.join(' · ') || 'A focused session for your next move.'}</p>
              <span className="difficulty">{workout.difficulty}</span>
            </article>
          ))}
        </div>
      )}
    </section>
  )
}

export default Workouts