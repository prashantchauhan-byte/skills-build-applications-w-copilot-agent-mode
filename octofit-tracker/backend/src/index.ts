import cors from 'cors'
import 'dotenv/config'
import express from 'express'
import { connectDatabase } from './config/database.js'
import Activity from './models/Activity.js'
import Leaderboard from './models/Leaderboard.js'
import Team from './models/Team.js'
import User from './models/User.js'
import Workout from './models/Workout.js'

const app = express()
const port = 8000
const codespaceName = process.env.CODESPACE_NAME
const baseUrl = codespaceName
  ? `https://${codespaceName}-8000.app.github.dev`
  : 'http://localhost:8000'

app.use(cors())
app.use(express.json())

app.get('/api/health', (_request, response) => {
  response.json({ status: 'ok', service: 'octofit-tracker-api', baseUrl })
})

app.get('/api/users/', async (_request, response) => {
  try {
    const users = await User.find().populate('team', 'name color').lean()
    response.json({ users })
  } catch (error) {
    response.status(500).json({ error: 'Unable to load users', details: error })
  }
})

app.get('/api/teams/', async (_request, response) => {
  try {
    const teams = await Team.find().populate('members', 'name email avatar').lean()
    response.json({ teams })
  } catch (error) {
    response.status(500).json({ error: 'Unable to load teams', details: error })
  }
})

app.get('/api/activities/', async (_request, response) => {
  try {
    const activities = await Activity.find().populate('user', 'name email').sort({ date: -1 }).lean()
    response.json({ activities })
  } catch (error) {
    response.status(500).json({ error: 'Unable to load activities', details: error })
  }
})

app.get('/api/leaderboard/', async (_request, response) => {
  try {
    const leaderboard = await Leaderboard.find()
      .populate('user', 'name email avatar')
      .populate('team', 'name color')
      .sort({ rank: 1 })
      .lean()
    response.json({ leaderboard })
  } catch (error) {
    response.status(500).json({ error: 'Unable to load leaderboard', details: error })
  }
})

app.get('/api/workouts/', async (_request, response) => {
  try {
    const workouts = await Workout.find().sort({ difficulty: 1, name: 1 }).lean()
    response.json({ workouts })
  } catch (error) {
    response.status(500).json({ error: 'Unable to load workouts', details: error })
  }
})

async function startServer() {
  try {
    await connectDatabase()
    app.listen(port, () => {
      console.log(`OctoFit Tracker API listening at ${baseUrl}`)
    })
  } catch (error) {
    console.error('Unable to start OctoFit Tracker API:', error)
    process.exitCode = 1
  }
}

startServer()