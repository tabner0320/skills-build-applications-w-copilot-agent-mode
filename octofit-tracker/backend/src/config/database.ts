import mongoose from 'mongoose';

const connectionString = process.env.MONGODB_URI || 'mongodb://localhost:27017/octofit_db';

export async function connectToDatabase(): Promise<typeof mongoose> {
  try {
    await mongoose.connect(connectionString);
    console.log('Connected to octofit_db');
    return mongoose;
  } catch (error) {
    console.error('Error connecting to octofit_db:', error);
    throw error;
  }
}

export async function disconnectFromDatabase(): Promise<void> {
  await mongoose.disconnect();
  console.log('Disconnected from octofit_db');
}

mongoose.connection.on('error', (error) => {
  console.error('connection error:', error);
});

export default mongoose.connection;
