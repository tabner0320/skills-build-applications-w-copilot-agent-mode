import express, { type Request, type Response } from 'express';
import { connectToDatabase } from './config/database';
import { Activity, Leaderboard, Team, User, Workout } from './models';

const app = express();
const port = Number(process.env.PORT || 8000);

app.use(express.json());

app.get('/api/health', (_req: Request, res: Response) => {
  res.json({ status: 'ok', database: 'octofit_db' });
});

app.get('/api/users', async (_req: Request, res: Response) => {
  const users = await User.find().populate('team').lean();
  res.json(users);
});

app.get('/api/teams', async (_req: Request, res: Response) => {
  const teams = await Team.find().populate('members').populate('captain').lean();
  res.json(teams);
});

app.get('/api/activities', async (_req: Request, res: Response) => {
  const activities = await Activity.find().populate('user').lean();
  res.json(activities);
});

app.get('/api/leaderboard', async (_req: Request, res: Response) => {
  const leaderboard = await Leaderboard.find().populate('user').sort({ rank: 1 }).lean();
  res.json(leaderboard);
});

app.get('/api/workouts', async (_req: Request, res: Response) => {
  const workouts = await Workout.find().lean();
  res.json(workouts);
});

async function startServer() {
  try {
    await connectToDatabase();
    app.listen(port, () => {
      console.log(`Octofit API running on http://localhost:${port}`);
    });
  } catch (error) {
    console.error('Failed to start Octofit API:', error);
    process.exit(1);
  }
}

startServer();
