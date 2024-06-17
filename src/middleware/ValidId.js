import { isValidObjectId } from 'mongoose';
import createError from 'http-errors';

export const isValidId = (req, res, next) => {
  const { contactId } = req.params;
  if (!isValidObjectId(contactId)) {
    next(createError(404, 'Invalid ID format'));
  }

  next();
};

export const isValidName = (req, res, next) => {
  const { name } = req.body;
  console.log('Validating name:', name);
  const nameRegex = /^[a-zA-Z\s]+$/;
  if (!name || typeof name !== 'string' || !nameRegex.test(name)) {
    console.log('Name entered incorrectly');
    return next(createError(404, 'Name entered incorrectly'));
  }
  next();
};

export const isValidPhoneNumber = (req, res, next) => {
  const { phoneNumber } = req.body;
  const phoneRegex = /^[0-9-]+$/;
  if (
    !phoneNumber ||
    typeof phoneNumber !== 'string' ||
    !phoneRegex.test(phoneNumber)
  ) {
    return next(createError(404, 'PhoneNumber entered incorrectly'));
  }
  next();
};
