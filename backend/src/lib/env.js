import dotenv from 'dotenv';

dotenv.config({ quiet: true });

export const ENV = {
    // backend
    PORT: process.env.PORT,
    MONGODB_URI: process.env.MONGODB_URI,
    CLIENT_URL: process.env.CLIENT_URL,
    STREAM_API_SECRET: process.env.STREAM_API_SECRET,
    INNGEST_EVENT_KEY: process.env.INNGEST_EVENT_KEY,
    INNGEST_SIGNING_KEY: process.env.INNGEST_SIGNING_KEY,
    CLERK_SECRET_KEY: process.env.CLERK_SECRET_KEY,
    NODE_ENV: process.env.NODE_ENV,
    STREAM_API_KEY: process.env.STREAM_API_KEY,

}