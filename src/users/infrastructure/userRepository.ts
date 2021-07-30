import UserModel from '../../shared/infrastructure/database/schemas/user';
import User from '../domain/user';

const findByEmail = async (email: string): Promise<User | null> => {
  return await UserModel.findOne({ email });
};

const save = async (user: User): Promise<User> => {
  return await new UserModel(user).save();
};

export { findByEmail, save };
