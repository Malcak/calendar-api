import { Request, Response } from 'express';

import genJWT from '../../shared/infrastructure/helpers/jwt';
import { createUser, loginUser } from '../application/userService';
import User from '../domain/user';
import userResponse from './userResponse';

const create = async (req: Request, res: Response): Promise<void> => {
  try {
    createUser(req.body)
      .then(async (user: User) => {
        const token = await genJWT(user._id, user.name, user.email);
        return res.status(201).send(userResponse({ user, token }));
      })
      .catch((error) => {
        return res.status(409).send(userResponse({ error }));
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(userResponse({ error: 'internal server error' }));
  }
};

const login = async (req: Request, res: Response): Promise<void> => {
  try {
    loginUser(req.body.email, req.body.password)
      .then(async (user: User) => {
        const token = await genJWT(user._id, user.name, user.email);
        return res.status(200).send(userResponse({ user, token }));
      })
      .catch((error) => {
        return res.status(400).send(userResponse({ error }));
      });
  } catch (error) {
    console.log(error);
    res.status(500).send(userResponse({ error: 'internal server error' }));
  }
};

const renewToken = (req: Request, res: Response): void => {
  try {
    const user = req.body;
    genJWT(user._id, user.name, user.email).then((token) => {
      return res.status(200).send(userResponse({ user, token }));
    });
  } catch (error) {
    console.log(error);
    res.status(500).send(userResponse({ error: 'internal server error' }));
  }
};

export { create, login, renewToken };
