import { StreamChat } from "stream-chat";
import { StreamClient } from "@stream-io/node-sdk";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecretKey = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecretKey) {
  console.error("STREAM_API_KEY and STREAM_API_SECRET are missing");
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecretKey); // will be used chat features
export const streamClient = new StreamClient(apiKey, apiSecretKey); // will be used for video calls

export const upsertStreamUser = async (userData) => {
  try {
    // Stream only accepts lowercase user IDs
    userData.id = userData.id.toLowerCase();

    await chatClient.upsertUsers([userData]);
    console.log("User added to Stream:", userData);
  } catch (error) {
    console.error("Stream upsert error:", error);
  }
};

export const deleteStreamUser = async (userId) => {
  console.log("Deleting Stream user with ID:", userId);

  if (!userId) {
    console.error("Stream delete aborted: userId is missing");
    return;
  }

  try {
    await chatClient.deleteUsers([userId.toLowerCase()]);
    console.log("User deleted from Stream:", userId);
  } catch (error) {
    console.error("Stream delete error:", error);
  }
};
