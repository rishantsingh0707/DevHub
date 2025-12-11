import express from 'express';
import { ENV } from '../lib/env.js';
import { connectDB } from '../lib/db.js';
const app = express();

console.log('Environment Variables:', ENV);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});


const startServer = async () => {
  try {
    connectDB();
    app.listen(ENV.PORT, () => {
      console.log(`Server is running on port ${ENV.PORT}`);
    });
  } catch (error) {
    console.error(`Error starting server: ${error.message}`);
  }
}

startServer();