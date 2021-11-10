import jwt from 'jsonwebtoken';

const genJWT = (
  _id: string,
  name: string,
  email: string
): Promise<string | undefined> => {
  return new Promise((resolve, reject) => {
    const SECRET_JWT_KEY = process.env.SECRET_JWT_KEY;
    const payload = { _id, name, email };
    if (SECRET_JWT_KEY) {
      jwt.sign(payload, SECRET_JWT_KEY, { expiresIn: '2h' }, (err, token) => {
        if (err) {
          console.error(err);
          reject('token could not be generated');
        }
        resolve(token);
      });
    } else {
      throw new Error('jwt secret key is required to sign the json web tokens');
    }
  });
};

export default genJWT;
