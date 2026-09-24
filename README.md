# Build Applications with GitHub Copilot Agent Mode

<img src="https://octodex.github.com/images/Professortocat_v2.png" align="right" height="200px" />

Hey prashantchauhan-byte!

Mona here. I'm done preparing your exercise. Hope you enjoy! 💚

Remember, it's self-paced so feel free to take a break! ☕️

[![](https://img.shields.io/badge/Go%20to%20Exercise-%E2%86%92-1f883d?style=for-the-badge&logo=github&labelColor=197935)](https://github.com/prashantchauhan-byte/skills-build-applications-w-copilot-agent-mode/issues/1)

## OctoFit Tracker

The application is in `octofit-tracker/` and uses React with Vite for the presentation tier, Node.js with Express and TypeScript for the API tier, and MongoDB with Mongoose for persistence.

### Backend setup

MongoDB should be available locally on port `27017`. The backend uses `octofit_db` by default and supports an optional `MONGODB_URI` override.

Run these commands from the workspace root:

```bash
npm install --prefix octofit-tracker/backend
npm run seed --prefix octofit-tracker/backend
npm run dev --prefix octofit-tracker/backend
```

The API listens on port `8000`. It reports `http://localhost:8000` locally, or `https://$CODESPACE_NAME-8000.app.github.dev` in GitHub Codespaces.

Available API endpoints:

- `GET /api/health`
- `GET /api/users/`
- `GET /api/teams/`
- `GET /api/activities/`
- `GET /api/leaderboard/`
- `GET /api/workouts/`

For a production-style run, use `npm run build --prefix octofit-tracker/backend` followed by `npm start --prefix octofit-tracker/backend`.

