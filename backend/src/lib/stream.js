import { StreamClient } from "@stream-io/node-sdk";
import { StreamChat } from 'stream-chat';
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecretKey = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecretKey) {
  console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

export const chatClient = new StreamClient(apiKey, apiSecretKey);
export const ChatClient = new StreamChat(apiKey, apiSecretKey);

export const upsertStreamUser = async (userData) => {
  try {
    await chatClient.upsertUsers([userData]);
    console.log("User added to Stream:", userData);
  } catch (error) {
    console.error("Stream upsert error:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  console.log("Deleting Stream user with ID:", userId);  // DEBUG

  if (!userId) {
    console.error("Stream delete aborted: userId is missing");
    return;
  }

  try {
    await chatClient.deleteUsers([userId]);
    console.log("User deleted from Stream:", userId);
  } catch (error) {
    console.error("Stream delete error:", error);
  }
};
