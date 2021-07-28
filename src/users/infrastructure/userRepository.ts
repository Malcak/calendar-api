import User from '../domain/user';
import UserModel from '../../shared/infrastructure/database/schemas/user';

const findUserByEmail = async (email: string) => {
  return await UserModel.findOne({ email });
};

const saveUser = async (user: User) => {
  const newUser = new UserModel(user);
  await newUser.save();
  return newUser;
};

export { findUserByEmail, saveUser };
