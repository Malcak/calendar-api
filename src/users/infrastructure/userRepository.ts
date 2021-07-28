import UserModel from '../../shared/infrastructure/database/schemas/user';
import User from '../domain/user';

const findUserByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

const saveUser = async (user: User): Promise<User> => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

export { findUserByEmail, saveUser };
