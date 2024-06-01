import { setupServer } from './src/server.js';
import { initMongoConnection } from './src/db/initMongoConnection.js';

const startApp = async () => {
  await initMongoConnection();
  setupServer();
};

startApp();
