import { Router, Request, Response } from 'express';

const userRouter = Router();

userRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    ok: true,
  });
});

export { userRouter };
