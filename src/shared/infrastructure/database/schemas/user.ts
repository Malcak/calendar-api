import { model, Schema } from 'mongoose';

import User from '../../../../users/domain/user';

const userSchema = new Schema<User>({
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
    unique: true,
  },
  password: {
    type: String,
    required: true,
  },
});

const UserModel = model<User>('User', userSchema);

export default UserModel;
