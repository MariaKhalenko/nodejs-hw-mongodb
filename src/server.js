import express from 'express';
import cors from 'cors';
import pino from 'pino-http';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getAllContacts, getContactById } from './services/contacts.js';
import { env } from './utils/env.js';

const startApp = async () => {
  await initMongoConnection();
};

export const setupServer = () => {
  const app = express();
  const PORT = process.env.PORT || 3000;

  app.use(cors());
  app.use(pino());

  app.get('/contacts', getAllContacts);
  app.get('/contacts/:contactId', getContactById);

  app.use((req, res, next) => {
    res.status(404).json({ message: 'Not found' });
  });

  app.listen(PORT, () => {
    console.log(`Server is running on port ${PORT}`);
  });
};
