import { CustomValidator } from 'express-validator';
import isValid from 'date-fns/isValid';

const isDate: CustomValidator = (value): boolean => {
  if (!value) {
    return false;
  }
  return isValid(new Date(Number.parseInt(value)));
};

export { isDate };
