import { StreamVideoClient } from "@stream-io/video-react-sdk";

let videoClient = null;

export async function initlizeStreamClient(user, token) {
    if (videoClient && videoClient?.user?.id === user.id) return videoClient;

    if (videoClient) await disconnectStreamClient();

    videoClient = new StreamVideoClient({
        apiKey: import.meta.env.VITE_STREAM_API_KEY,
        user,
        token,
    });
    // 🔴 THIS WAS MISSING
    await videoClient.connectUser(user, token);

    return videoClient;
}

export async function disconnectStreamClient() {
    if (videoClient) {
        await videoClient.disconnectUser();
        videoClient = null;
    }
}
