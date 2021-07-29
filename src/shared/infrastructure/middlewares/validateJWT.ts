import { NextFunction, Request, Response } from 'express';
import jwt, { JwtPayload } from 'jsonwebtoken';

import { failedResponse } from '../../logic/response';

const validateJWT = (
  req: Request,
  res: Response,
  next: NextFunction
): unknown => {
  const token = req.header('x-token');

  if (!token) {
    return res
      .status(401)
      .json(failedResponse({ msg: 'missing token in the request' }));
  }

  try {
    const payload = jwt.verify(
      token,
      process.env.SECRET_JWT_KEY || ''
    ) as JwtPayload;

    req.body._id = payload._id;
    req.body.name = payload.name;
    req.body.email = payload.email;
  } catch (error) {
    return res.status(401).json(failedResponse({ msg: 'invalid token' }));
  }

  next();
};

export default validateJWT;
