import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from './lib/inngest.js';
import { serve } from 'inngest/express';
import chatRoute from './routes/chatRoute.js';
import sessionRoute from './routes/sessionRoute.js';
const app = express();

app.use(express.json());
app.use(clerkMiddleware())

app.use(cors({
  origin: "https://dev-hub-nu-ten.vercel.app",
  credentials: true,
  methods: ["GET", "POST", "PUT", "DELETE", "OPTIONS"],
  allowedHeaders: ["Content-Type", "Authorization"]
}));

app.options("*", cors());
app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/', (req, res) => {
  res.send('Hello, World!');
});

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.use("/chat", chatRoute);
app.use("/sessions", sessionRoute);

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