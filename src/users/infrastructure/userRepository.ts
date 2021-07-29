import UserModel from '../../shared/infrastructure/database/schemas/user';
import User from '../domain/user';

const findByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

const save = async (user: User): Promise<User> => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

export { findByEmail, save };
