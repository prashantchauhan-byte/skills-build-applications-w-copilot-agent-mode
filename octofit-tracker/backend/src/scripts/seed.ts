import 'dotenv/config';
import mongoose from 'mongoose';
import { connectDatabase } from '../config/database.js';
import Activity from '../models/Activity.js';
import Leaderboard from '../models/Leaderboard.js';
import Team from '../models/Team.js';
import User from '../models/User.js';
import Workout from '../models/Workout.js';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    console.log('Seed the octofit_db database with test data');
    await connectDatabase();

    await Promise.all([
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      User.deleteMany({}),
      Team.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const [pulse, trailblazers] = await Team.create([
      { name: 'Pulse Crew', color: '#ef8354', members: [] },
      { name: 'Trailblazers', color: '#2d9d78', members: [] },
    ]);

    const [maya, jordan, priya, sam] = await User.create([
      { name: 'Maya Chen', email: 'maya.chen@example.com', avatar: 'MC', team: pulse._id },
      { name: 'Jordan Brooks', email: 'jordan.brooks@example.com', avatar: 'JB', team: pulse._id },
      { name: 'Priya Shah', email: 'priya.shah@example.com', avatar: 'PS', team: trailblazers._id },
      { name: 'Sam Rivera', email: 'sam.rivera@example.com', avatar: 'SR', team: trailblazers._id },
    ]);

    await Promise.all([
      Team.findByIdAndUpdate(pulse._id, { members: [maya._id, jordan._id] }),
      Team.findByIdAndUpdate(trailblazers._id, { members: [priya._id, sam._id] }),
    ]);

    await Activity.create([
      { user: maya._id, type: 'run', durationMinutes: 34, calories: 318, date: new Date('2026-09-20') },
      { user: jordan._id, type: 'strength', durationMinutes: 42, calories: 286, date: new Date('2026-09-21') },
      { user: priya._id, type: 'cycle', durationMinutes: 55, calories: 472, date: new Date('2026-09-22') },
      { user: sam._id, type: 'yoga', durationMinutes: 28, calories: 124, date: new Date('2026-09-23') },
    ]);

    await Leaderboard.create([
      { user: maya._id, team: pulse._id, points: 940, rank: 1 },
      { user: priya._id, team: trailblazers._id, points: 875, rank: 2 },
      { user: jordan._id, team: pulse._id, points: 760, rank: 3 },
      { user: sam._id, team: trailblazers._id, points: 690, rank: 4 },
    ]);

    await Workout.create([
      {
        name: 'Morning Momentum',
        type: 'cardio',
        difficulty: 'beginner',
        durationMinutes: 20,
        exercises: ['Brisk walk', 'High knees', 'Cool down'],
      },
      {
        name: 'Full Body Foundation',
        type: 'strength',
        difficulty: 'intermediate',
        durationMinutes: 35,
        exercises: ['Squats', 'Push-ups', 'Reverse lunges', 'Plank'],
      },
      {
        name: 'Athlete Engine',
        type: 'cardio',
        difficulty: 'advanced',
        durationMinutes: 45,
        exercises: ['Intervals', 'Burpees', 'Mountain climbers', 'Sprint finish'],
      },
    ]);

    console.log('Database seeding complete');
    await mongoose.disconnect();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
