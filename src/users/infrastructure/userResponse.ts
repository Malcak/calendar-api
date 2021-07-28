const userResponse = ({ user, token, error }: any) => {
  if (!error) {
    return {
      ok: true,
      user: {
        _id: user._id,
        name: user.name,
        email: user.email,
      },
      token,
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
