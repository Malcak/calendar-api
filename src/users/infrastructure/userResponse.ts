import Result from '../../shared/logic/result';
import User from '../domain/user';

const userResponse = ({
  user,
  token,
  error,
}: {
  user?: User;
  token?: string;
  error?: string;
}): Result => {
  if (!error && user) {
    return {
      ok: true,
      data: {
        user: {
          _id: user._id,
          name: user.name,
          email: user.email,
        },
        token,
      },
    };
  } else {
    return {
      ok: false,
      errors: {
        msg: error,
      },
    };
  }
};

export default userResponse;
