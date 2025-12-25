import express from 'express';
import { ENV } from './lib/env.js';
import { connectDB } from './lib/db.js';
import cors from 'cors';
import { clerkMiddleware } from '@clerk/express'
import { inngest, functions } from './lib/inngest.js';
import { serve } from 'inngest/express';
import chatRoute from './routes/chatRoute.js';
import sessionRoute from './routes/sessionRoute.js';
import { getAuth } from "@clerk/express";

const app = express();

app.use(express.json());

const allowedOrigins = [
  ENV.CLIENT_URL,
  "https://dev-hub-nu-ten.vercel.app",
  "http://localhost:5173"
];

app.use(cors({
  origin: function (origin, callback) {
    if (!origin) return callback(null, true);

    const normalizedOrigin = origin.replace(/\/$/, "");

    const vercelRegex = /^https:\/\/dev-.*-rishantsingh0707s-projects\.vercel\.app$/;
    const prodDomain = "https://dev-hub-nu-ten.vercel.app";
    const isLocalhost = normalizedOrigin === "http://localhost:5173";

    if (
      normalizedOrigin === prodDomain ||
      vercelRegex.test(normalizedOrigin) ||
      isLocalhost
    ) {
      callback(null, true);
    } else {
      callback(new Error(`Not allowed by CORS: ${origin}`));
    }
  },
  credentials: true,
}));

app.use("/api/inngest", serve({ client: inngest, functions }));

app.get('/health', (req, res) => {
  res.status(200).send('OK');
});

app.get("/api/auth-check", (req, res) => {
  const auth = getAuth(req);
  res.json(auth);
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