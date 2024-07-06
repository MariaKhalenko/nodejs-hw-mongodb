import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import cookieParser from 'cookie-parser';
import router from './routers/index.js';
import { notFoundHandler, errorHandler } from './middlewares/errorHandlers.js';
import { UPLOAD_DIR } from './constants/index.js';

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cookieParser());
  app.use(cors());
  app.use(pino());
  app.use(express.json());
  app.use(router);

  app.use(notFoundHandler);
  app.use(errorHandler);
  app.use('/uploads', express.static(UPLOAD_DIR));

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
