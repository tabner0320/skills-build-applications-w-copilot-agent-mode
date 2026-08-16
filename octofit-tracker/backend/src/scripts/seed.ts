import { connectToDatabase, disconnectFromDatabase } from '../config/database';
import { Activity, Leaderboard, Team, User, Workout } from '../models';

/**
 * Seed the octofit_db database with test data
 */
async function seedDatabase() {
  try {
    await connectToDatabase();
    console.log('Seed the octofit_db database with test data');

    await Promise.all([
      Team.deleteMany({}),
      User.deleteMany({}),
      Activity.deleteMany({}),
      Leaderboard.deleteMany({}),
      Workout.deleteMany({}),
    ]);

    const teamA = await Team.create({
      name: 'Blue Falcons',
      description: 'Competitive runners and strength athletes focused on endurance.',
      color: '#2563eb',
      captain: null,
      members: [],
      totalPoints: 1260,
    });

    const teamB = await Team.create({
      name: 'Green Hawks',
      description: 'Balanced team with a passion for cardio, mobility, and teamwork.',
      color: '#16a34a',
      captain: null,
      members: [],
      totalPoints: 1180,
    });

    const userOne = await User.create({
      firstName: 'Ava',
      lastName: 'Patel',
      username: 'ava.patel',
      email: 'ava.patel@mergington.edu',
      age: 16,
      team: teamA._id,
      fitnessLevel: 'Advanced',
      goals: ['5K personal best', 'Strength consistency'],
      points: 340,
    });

    const userTwo = await User.create({
      firstName: 'Leo',
      lastName: 'Garcia',
      username: 'leo.garcia',
      email: 'leo.garcia@mergington.edu',
      age: 17,
      team: teamA._id,
      fitnessLevel: 'Intermediate',
      goals: ['Improve sprinting', 'Increase weekly mileage'],
      points: 298,
    });

    const userThree = await User.create({
      firstName: 'Maya',
      lastName: 'Nguyen',
      username: 'maya.nguyen',
      email: 'maya.nguyen@mergington.edu',
      age: 15,
      team: teamB._id,
      fitnessLevel: 'Advanced',
      goals: ['Mobility and recovery', '10K training'],
      points: 312,
    });

    const userFour = await User.create({
      firstName: 'Noah',
      lastName: 'Kim',
      username: 'noah.kim',
      email: 'noah.kim@mergington.edu',
      age: 16,
      team: teamB._id,
      fitnessLevel: 'Beginner',
      goals: ['Build consistency', 'Walk more each week'],
      points: 266,
    });

    teamA.captain = userOne._id;
    teamA.members = [userOne._id, userTwo._id];
    teamA.totalPoints = userOne.points + userTwo.points;

    teamB.captain = userThree._id;
    teamB.members = [userThree._id, userFour._id];
    teamB.totalPoints = userThree.points + userFour.points;

    await teamA.save();
    await teamB.save();

    const activities = await Activity.insertMany([
      {
        user: userOne._id,
        type: 'Running',
        durationMinutes: 36,
        distanceKm: 5.8,
        caloriesBurned: 430,
        date: new Date('2026-08-10T06:15:00Z'),
        notes: 'Tempo run with a strong finish over the last mile.',
      },
      {
        user: userTwo._id,
        type: 'Strength',
        durationMinutes: 42,
        distanceKm: 0,
        caloriesBurned: 390,
        date: new Date('2026-08-11T17:30:00Z'),
        notes: 'Lower body circuit and core finish.',
      },
      {
        user: userThree._id,
        type: 'Cycling',
        durationMinutes: 48,
        distanceKm: 16.2,
        caloriesBurned: 520,
        date: new Date('2026-08-09T18:00:00Z'),
        notes: 'Steady hill intervals and cool-down ride.',
      },
      {
        user: userFour._id,
        type: 'Walking',
        durationMinutes: 30,
        distanceKm: 3.4,
        caloriesBurned: 180,
        date: new Date('2026-08-12T07:15:00Z'),
        notes: 'Outdoor walk with brisk pacing for recovery.',
      },
    ]);

    const leaderboardEntries = await Leaderboard.insertMany([
      { user: userOne._id, points: 340, rank: 1, streakDays: 12 },
      { user: userThree._id, points: 312, rank: 2, streakDays: 10 },
      { user: userTwo._id, points: 298, rank: 3, streakDays: 9 },
      { user: userFour._id, points: 266, rank: 4, streakDays: 8 },
    ]);

    const workouts = await Workout.insertMany([
      {
        title: 'Speed Interval Blast',
        focus: 'Cardio',
        difficulty: 'Intermediate',
        durationMinutes: 25,
        exercises: ['Warm-up jog', '6 x 100m sprints', 'Recovery walk', 'Mobility stretch'],
        coachNotes: 'Keep effort at 80% and focus on clean form.',
      },
      {
        title: 'Core & Stability Circuit',
        focus: 'Strength',
        difficulty: 'Beginner',
        durationMinutes: 20,
        exercises: ['Plank holds', 'Dead bugs', 'Glute bridges', 'Bird dogs'],
        coachNotes: 'Prioritize control and breathing with every rep.',
      },
      {
        title: 'Trail Recovery Session',
        focus: 'Recovery',
        difficulty: 'Easy',
        durationMinutes: 30,
        exercises: ['Light jog', 'Mobility flow', 'Breathing drills', 'Cool-down walk'],
        coachNotes: 'Aim for conversation pace and relaxed breathing.',
      },
    ]);

    console.log('Created teams:', teamA.name, teamB.name);
    console.log('Created users:', (await User.countDocuments({})).toString());
    console.log('Created activities:', activities.length);
    console.log('Created leaderboard entries:', leaderboardEntries.length);
    console.log('Created workouts:', workouts.length);
    console.log('Database seeding complete');
    await disconnectFromDatabase();
  } catch (error) {
    console.error('Error seeding database:', error);
    process.exit(1);
  }
}

seedDatabase();
