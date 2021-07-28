import { Request, Response, Router } from 'express';

const eventRouter = Router();

eventRouter.get('/', (req: Request, res: Response) => {
  return res.status(200).send({
    ok: true,
  });
});

export { eventRouter };
