import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import router from './routers/contacts.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
