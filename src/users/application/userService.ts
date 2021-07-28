import bcryptjs from 'bcryptjs';
import User from '../domain/user';
import UserModel from '../../shared/infrastructure/database/schemas/user';
import { findUserByEmail, saveUser } from '../infrastructure/userRepository';

const createUser = async (user: User) => {
  const { email, password } = user;
  const findedUser = await findUserByEmail(email);

  if (findedUser) {
    return Promise.reject('user already exists');
  }

  const newUser = new UserModel(user);
  const salt = bcryptjs.genSaltSync();
  newUser.password = bcryptjs.hashSync(password, salt);

  return await saveUser(newUser);
};

const loginUser = async (email: string, password: string) => {
  const findedUser = await UserModel.findOne({ email });
  if (!findedUser) {
    return Promise.reject('incorrect email or password');
  }
  const isPasswordValid = bcryptjs.compareSync(password, findedUser.password);
  if (!isPasswordValid) {
    return Promise.reject('incorrect email or password');
  }
  return Promise.resolve(findedUser);
};

export { createUser, loginUser };
