import jwt from 'jsonwebtoken';

const genJWT = (
  _id: string,
  name: string,
  email: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const payload = { _id, name, email };
    jwt.sign(
      payload,
      process.env.SECRET_JWT_KEY || '',
      {
        expiresIn: '2h',
      },
      (err, token) => {
        if (err) {
          console.log(err);
          reject('token could not be generated');
        }
        resolve(token);
      }
    );
  });
};

export default genJWT;
