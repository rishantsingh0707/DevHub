import express from 'express';
import { ENV } from '../lib/env.js';
const app = express();

console.log('Environment Variables:', ENV);

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.listen(ENV.PORT, () => {
  console.log(`Server is running on port ${ENV.PORT}`);
});