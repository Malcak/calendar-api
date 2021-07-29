import bcryptjs from 'bcryptjs';

import User from '../domain/user';
import { findByEmail, save } from '../infrastructure/userRepository';

const saveUser = async (user: User): Promise<User> => {
  const findedUser = await findByEmail(user.email);
  if (findedUser) {
    return Promise.reject({ email: { msg: 'user already exists' } });
  }

  const salt = bcryptjs.genSaltSync();
  user.password = bcryptjs.hashSync(user.password, salt);

  return await save(user);
};

const authenticateUser = async (
  email: string,
  password: string
): Promise<User> => {
  const findedUser = await findByEmail(email);
  if (!findedUser) {
    return Promise.reject({
      authentication: { msg: 'incorrect email or password' },
    });
  }
  //
  const isPasswordValid = bcryptjs.compareSync(password, findedUser.password);
  if (!isPasswordValid) {
    return Promise.reject({
      authentication: { msg: 'incorrect email or password' },
    });
  }

  return Promise.resolve(findedUser);
};

export { authenticateUser, saveUser };
