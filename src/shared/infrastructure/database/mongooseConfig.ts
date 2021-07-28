import mongoose from 'mongoose';

const dbConecction = async (): Promise<void> => {
  try {
    await mongoose.connect(
      process.env.DB_CNN || 'mongodb://localhost:27017/calendar',
      {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      }
    );
  } catch (error) {
    console.log(error);
    throw new Error('error when trying to connect to the database');
  }
};

export default dbConecction;
