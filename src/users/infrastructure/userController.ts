import { Request, Response } from 'express';

import genJWT from '../../shared/infrastructure/helpers/jwt';
import {
  failedResponse,
  successfulResponse,
} from '../../shared/logic/response';
import { authenticateUser, saveUser } from '../application/userService';
import User from '../domain/user';

const createUser = async (req: Request, res: Response): Promise<void> => {
  try {
    saveUser(req.body)
      .then(async ({ _id, name, email }: User) => {
        const token = await genJWT(_id, name, email);
        res
          .status(201)
          .send(successfulResponse({ user: { _id, name, email }, token }));
      })
      .catch((error) => {
        res.status(409).send(failedResponse(error));
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const loginUser = async (req: Request, res: Response): Promise<void> => {
  try {
    authenticateUser(req.body.email, req.body.password)
      .then(async ({ _id, name, email }: User) => {
        const token = await genJWT(_id, name, email);
        res
          .status(200)
          .send(successfulResponse({ user: { _id, name, email }, token }));
      })
      .catch((error) => {
        res.status(400).send(failedResponse(error));
      });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

const renewToken = (req: Request, res: Response): void => {
  try {
    const user = req.body;
    genJWT(user._id, user.name, user.email).then((token) => {
      res.status(200).send(successfulResponse({ user, token }));
    });
  } catch (error) {
    console.log(error);
    res
      .status(500)
      .send(failedResponse({ server: { msg: 'internal server error' } }));
  }
};

export { createUser, loginUser, renewToken };
