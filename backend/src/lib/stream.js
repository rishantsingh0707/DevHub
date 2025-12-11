import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecretKey = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecretKey) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

export const chatClient = new StreamClient(apiKey, apiSecretKey);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.users.upsert(userData);
    console.log("User added to Stream:", userData);
  } catch (error) {
    console.error("Stream upsert error:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  try {
    await chatClient.users.delete(userId);
    console.log("User deleted from Stream:", userId);
  } catch (error) {
    console.error("Stream delete error:", error);
  }
};
