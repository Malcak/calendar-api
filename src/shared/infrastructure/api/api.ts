import { Router } from 'express';
import { eventRouter } from '../../../events/infrastructure/eventRouter';
import { userRouter } from '../../../users/infrastructure/userRouter';

const apiRouter = Router();

apiRouter.use('/events', eventRouter);
apiRouter.use('/users', userRouter);

export { apiRouter };
