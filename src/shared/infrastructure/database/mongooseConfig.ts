import mongoose from 'mongoose';

const dbConecction = async (): Promise<void> => {
  const DB_CNN = process.env.DB_CNN;
  if (DB_CNN) {
    try {
      await mongoose.connect(DB_CNN, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
        useCreateIndex: true,
      });
    } catch (error) {
      console.log(error);
      throw new Error('error when trying to connect to the database');
    }
  } else {
    throw new Error('database connection string required');
  }
};

export default dbConecction;
