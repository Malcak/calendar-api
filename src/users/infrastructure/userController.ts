import { Request, Response } from 'express';
import userResponse from './userResponse';
import genJWT from '../../shared/infrastructure/helpers/jwt';
import { createUser, loginUser } from '../application/userService';

const create = async (req: Request, res: Response) => {
  try {
    createUser(req.body)
      .then(async (user: any) => {
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

const login = async (req: Request, res: Response) => {
  try {
    loginUser(req.body.email, req.body.password)
      .then(async (user: any) => {
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

const renewToken = async (req: Request, res: Response) => {
  try {
    const { _id, name, email } = req.body;
    const token = await genJWT(_id, name, email);
    return res
      .status(200)
      .send(userResponse({ user: { _id, name, email }, token }));
  } catch (error) {
    console.log(error);
    res.status(500).send(userResponse({ error: 'internal server error' }));
  }
};

export { create, login, renewToken };
