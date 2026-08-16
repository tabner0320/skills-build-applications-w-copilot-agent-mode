import mongoose, { Schema, type Document, type Model } from 'mongoose';

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  age: number;
  team: mongoose.Types.ObjectId;
  fitnessLevel: string;
  goals: string[];
  points: number;
}

export interface ITeam extends Document {
  name: string;
  description: string;
  color: string;
  captain?: mongoose.Types.ObjectId | null;
  members: mongoose.Types.ObjectId[];
  totalPoints: number;
}

export interface IActivity extends Document {
  user: mongoose.Types.ObjectId;
  type: string;
  durationMinutes: number;
  distanceKm: number;
  caloriesBurned: number;
  date: Date;
  notes?: string;
}

export interface ILeaderboardEntry extends Document {
  user: mongoose.Types.ObjectId;
  points: number;
  rank: number;
  streakDays: number;
}

export interface IWorkout extends Document {
  title: string;
  focus: string;
  difficulty: string;
  durationMinutes: number;
  exercises: string[];
  coachNotes?: string;
}

const userSchema = new Schema<IUser>({
  firstName: { type: String, required: true },
  lastName: { type: String, required: true },
  username: { type: String, required: true, unique: true },
  email: { type: String, required: true, unique: true },
  age: { type: Number, required: true },
  team: { type: Schema.Types.ObjectId, ref: 'Team', required: true },
  fitnessLevel: { type: String, required: true },
  goals: [{ type: String }],
  points: { type: Number, default: 0 },
});

const teamSchema = new Schema<ITeam>({
  name: { type: String, required: true, unique: true },
  description: { type: String, required: true },
  color: { type: String, required: true },
  captain: { type: Schema.Types.ObjectId, ref: 'User', default: null },
  members: [{ type: Schema.Types.ObjectId, ref: 'User' }],
  totalPoints: { type: Number, default: 0 },
});

const activitySchema = new Schema<IActivity>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  type: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  distanceKm: { type: Number, default: 0 },
  caloriesBurned: { type: Number, default: 0 },
  date: { type: Date, required: true },
  notes: { type: String },
});

const leaderboardSchema = new Schema<ILeaderboardEntry>({
  user: { type: Schema.Types.ObjectId, ref: 'User', required: true },
  points: { type: Number, default: 0 },
  rank: { type: Number, required: true },
  streakDays: { type: Number, default: 0 },
});

const workoutSchema = new Schema<IWorkout>({
  title: { type: String, required: true },
  focus: { type: String, required: true },
  difficulty: { type: String, required: true },
  durationMinutes: { type: Number, required: true },
  exercises: [{ type: String, required: true }],
  coachNotes: { type: String },
});

export const User: Model<IUser> = mongoose.models.User || mongoose.model<IUser>('User', userSchema);
export const Team: Model<ITeam> = mongoose.models.Team || mongoose.model<ITeam>('Team', teamSchema);
export const Activity: Model<IActivity> = mongoose.models.Activity || mongoose.model<IActivity>('Activity', activitySchema);
export const Leaderboard: Model<ILeaderboardEntry> = mongoose.models.Leaderboard || mongoose.model<ILeaderboardEntry>('Leaderboard', leaderboardSchema);
export const Workout: Model<IWorkout> = mongoose.models.Workout || mongoose.model<IWorkout>('Workout', workoutSchema);

export default {
  User,
  Team,
  Activity,
  Leaderboard,
  Workout,
};
