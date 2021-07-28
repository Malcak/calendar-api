import { Router } from 'express';
import { body } from 'express-validator';

import validateFields from '../../shared/infrastructure/middlewares/validateFields';
import validateJWT from '../../shared/infrastructure/middlewares/validateJWT';
import { create, login, renewToken } from './userController';

const userRouter = Router();

userRouter.post(
  '/',
  [
    body(['name', 'email'], 'all fields are required').not().isEmpty().trim(),
    body('email', 'email not valid').isEmail().normalizeEmail(),
    body('password', 'weak password').isStrongPassword(),
    validateFields,
  ],
  create
);

userRouter.post(
  '/login',
  [
    body(['email', 'password'], 'all fields are required').not().isEmpty(),
    body('email', 'email not valid').isEmail().normalizeEmail(),
    validateFields,
  ],
  login
);

userRouter.post('/renew', validateJWT, renewToken);

export { userRouter };
