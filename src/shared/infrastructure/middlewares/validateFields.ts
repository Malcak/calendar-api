import { Request, Response } from 'express';
import { validationResult } from 'express-validator';

const validateFields = (req: Request, res: Response, next: Function) => {
  const errors = validationResult(req);

  if (!errors.isEmpty()) {
    return res.status(400).json({
      ok: false,
      errors: errors.mapped(),
    });
  }

  next();
};

export default validateFields;
