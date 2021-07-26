import { Router } from 'express';
import { eventRouter } from '../modules/events/infrastructure/eventRouter';
import { userRouter } from '../modules/users/infrastructure/userRouter';

const apiRouter = Router();

apiRouter.use('/events', eventRouter);
apiRouter.use('/users', userRouter);

export { apiRouter };
