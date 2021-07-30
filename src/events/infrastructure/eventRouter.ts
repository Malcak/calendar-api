import { Router } from 'express';
import { body } from 'express-validator';

import { isDate } from '../../shared/infrastructure/helpers/isDate';
import validateFields from '../../shared/infrastructure/middlewares/validateFields';
import validateJWT from '../../shared/infrastructure/middlewares/validateJWT';
import {
  createEvent,
  deleteEvent,
  readEvents,
  updateEvent,
} from './eventController';

const eventRouter = Router();

eventRouter.get('/', [validateJWT, validateFields], readEvents);

eventRouter.post(
  '/',
  [
    validateJWT,
    body(['title', 'startDate', 'endDate'], 'all fields are required')
      .not()
      .isEmpty()
      .trim(),
    body(['startDate', 'endDate'], 'invalid dates').custom(isDate),
    validateFields,
  ],
  createEvent
);

eventRouter.put(
  '/:id',
  [
    validateJWT,
    body(['_id', 'title', 'startDate', 'endDate'], 'all fields are required')
      .not()
      .isEmpty()
      .trim(),
    body(['startDate', 'endDate'], 'invalid dates').custom(isDate),
    validateFields,
  ],
  updateEvent
);

eventRouter.delete('/:id', [validateJWT], deleteEvent);

export { eventRouter };
