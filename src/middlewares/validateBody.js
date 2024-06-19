import createHttpError from 'http-errors';

export const validateBody = (schema) => async (req, res, next) => {
  await schema
    .validateAsync(req.body, {
      abortEarly: false,
    })
    .then(() => {
      next();
    })
    .catch((err) => {
      const error = createHttpError(400, 'Bad Request', {
        errors: err.details,
      });
      next(error);
    });
};
