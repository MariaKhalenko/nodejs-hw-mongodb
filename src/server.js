import express from 'express';
import cors from 'cors';
import pino from 'npm i pino-http';
import dotenv from 'dotenv';
import { getAllContacts } from './services/contacts.js';
import { setupServer } from './server.js';
import { initMongoConnection } from './db/initMongoConnection.js';
import { getAllContacts, getContactById } from './services/contacts.js';

// Завантаження змінних оточення з файлу .env
dotenv.config();

const startApp = async () => {
  await initMongoConnection();
  setupServer();
};

startApp();

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
