import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from './lib/inngest.js';
import { serve } from 'inngest/express';
import chatRoute from './routes/chatRoute.js';
const app = express();

app.use(cors({
  origin: [
    "http://localhost:5173",        // local dev
    ENV.CLIENT_URL                  // production frontend
  ],
  credentials: true
}));
app.use(express.json());
app.use(clerkMiddleware())

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use("/chat",chatRoute);

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