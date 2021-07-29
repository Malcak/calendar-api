import { NextFunction, Request, Response } from 'express';
import { validationResult } from 'express-validator';

import { failedResponse } from '../../logic/response';

const validateFields = (
  req: Request,
  res: Response,
  next: NextFunction
): unknown => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json(failedResponse(errors));
  }

  next();
};

export default validateFields;
