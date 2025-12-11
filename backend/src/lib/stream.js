import { StreamChat } from "stream-chat";
import { ENV } from "./env.js";

const apiKey = ENV.STREAM_API_KEY;
const apiSecretkey = ENV.STREAM_API_SECRET;

if (!apiKey || !apiSecretkey) {
    console.error("STREAM_API_KEY and STREAM_API_SECRET are missing")
}

export const chatClient = StreamChat.getInstance(apiKey, apiSecretkey);

export const upsertStreamUser = async (userData) => {
    try {
        await chatClient.upsertUser(userData);
        console.log("User upserted to Stream successfully",userData);
        return userData;
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
}


export const deleteStreamUser = async (userId) => {
    try {
        await chatClient.deleteUser(userId);
        console.log("User deleted from Stream successfully",userId);
    } catch (error) {
        console.error("Error upserting Stream user:", error);
    }
}

