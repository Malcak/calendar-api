import bcryptjs from 'bcryptjs';
import User from '../domain/user';
import { findUserByEmail, saveUser } from '../infrastructure/userRepository';

const createUser = async (user: User) => {
  const { email, password } = user;
  const findedUser = await findUserByEmail(email);

  if (findedUser) {
    return Promise.reject('user already exists');
  }

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(password, salt);

  return await saveUser(user);
};

const loginUser = async (email: string, password: string) => {
  const findedUser = await findUserByEmail(email);
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
