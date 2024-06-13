import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { HttpError } from 'http-errors';
import contactsRouter from './routers/contacts.js';

const notFoundHandler = (req, res, next) => {
  res.status(404).json({ message: 'Route not found' });
};

const errorHandler = (err, req, res, next) => {
  if (err instanceof HttpError) {
    res.status(err.status).json({
      status: err.status,
      message: err.name,
      data: err,
    });
    return;
  }

  res.status(500).json({
    status: 500,
    message: 'Something went wrong',
    data: err.message,
  });
};

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(contactsRouter);

  app.use(notFoundHandler);

  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
