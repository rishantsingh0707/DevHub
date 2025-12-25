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

const allowedOrigins = [
  ENV.CLIENT_URL,
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error("Not allowed by CORS"));
    }
  },
  credentials: true,
}));

app.use(clerkMiddleware())

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get("/api/sessions/test", (req, res) => {
  res.json({ ok: true });
});

app.use("/api/chat", chatRoute);
app.use("/api/sessions", sessionRoute);

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