import express from 'express';
import { ENV } from '../lib/env.js';
import { connectDB } from '../lib/db.js';
import cors from 'cors';
import { inngest, functions } from '../lib/inngest.js';
import { serve } from 'inngest/express';
const app = express();


app.use("/api/inngest",serve({client: inngest,functions}))

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.use(cors({
  origin: [
    "http://localhost:5173",        // local dev
    ENV.CLIENT_URL                  // production frontend
  ],
  credentials: true
}));
app.use(express.json());

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