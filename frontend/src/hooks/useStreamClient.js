import { useState, useEffect } from "react";
import { StreamChat } from "stream-chat";
import toast from "react-hot-toast";
import { initlizeStreamClient, disconnectStreamClient } from "../lib/stream";
import { sessionApi } from "../api/session";

function useStreamClient(session, loadingSession, isHost, isParticipant) {
    const [streamClient, setStreamClient] = useState(null);
    const [call, setCall] = useState(null);
    const [chatClient, setChatClient] = useState(null);
    const [channel, setChannel] = useState(null);
    const [isInitializingCall, setIsInitializingCall] = useState(true);
   
    useEffect(() => {
        let videoCall = null;
        let chatClientInstance = null;

        const initCall = async () => {
            if (!session?.callId) {
                setIsInitializingCall(false);
                return;
            };
            if (!isHost && !isParticipant) {
                setIsInitializingCall(false);
                return;
            };
            if (session.status === "completed") {
                setIsInitializingCall(false);
                return;
            };

            try {
                const { token, userId, userName, userImage } = await sessionApi.getStreamToken();

                const client = await initlizeStreamClient(
                    {
                        id: userId,
                        name: userName,
                        image: userImage,
                    },
                    token
                );

                setStreamClient(client);
                if (call) {
                    await call.leave();
                }

                videoCall = client.call("default", session.callId);

                await videoCall.join({
                    create: isHost,
                });
                setCall(videoCall);

                const apiKey = import.meta.env.VITE_STREAM_API_KEY;
                chatClientInstance = StreamChat.getInstance(apiKey);

                await chatClientInstance.connectUser(
                    {
                        id: userId,
                        name: userName,
                        image: userImage,
                    },
                    token
                );
                setChatClient(chatClientInstance);

                const chatChannel = chatClientInstance.channel(
                    "messaging",
                    session.callId,
                    {
                        members: [userId, session.host.clerkId],
                    }
                );

                if (isHost) {
                    await chatChannel.create();
                } else {
                    await chatChannel.watch();
                }

                setChannel(chatChannel);
            } catch (error) {
                toast.error("Failed to join video call");
                console.error("Error init call", error);
            } finally {
                setIsInitializingCall(false);
            }
        };

        if (session && !loadingSession) initCall();

        // cleanup - performance reasons
        return () => {
            (async () => {
                try {
                    if (videoCall) {
                        await videoCall.leave();
                        videoCall = null;
                    }

                    if (chatClientInstance) {
                        await chatClientInstance.disconnectUser();
                    }

                    await disconnectStreamClient();
                } catch (err) {
                    console.error("Stream cleanup error:", err);
                }
            })();
        };

    }, [session, loadingSession, isHost, isParticipant]);

    return {
        streamClient,
        call,
        chatClient,
        channel,
        isInitializingCall,
    };
}

export default useStreamClient;