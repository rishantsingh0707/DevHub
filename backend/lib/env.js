import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const ENV = {
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    CLIENT_URL: process.env.CLIENT_URL,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
}