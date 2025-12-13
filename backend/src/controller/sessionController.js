import Session from "../models/Session.js";
import { streamClient, chatClient } from "../lib/stream.js"


export async function createSession(req, res) {
    try {

        const { problem, difficulty } = req.body;
        const userId = req.user.id;
        const clerckId = req.user.clerckId;

        if (!problem || !difficulty) {
            return res.status(400).json({ message: "Problem and difficulty are required" });
        }

        const callId = `session_${Date.now()}_${Math.random().toString(36).substring(7)}`;

        const session = Session.create({
            problem,
            difficulty,
            host: userId,
            callId,
        })

        // Create a video call using Stream API
        await streamClient.video.call("default", callId).getOrCreate({
            data: {
                created_by_id: clerckId,
                custom: {
                    problem, difficulty, sessionId: session._id.toString()
                }
            }
        });

        // Create a chat channel using Stream API

        const channel = chatClient.channel("messaging", callId, {
            name: `Session Chat - ${problem}`,
            created_by_id: clerckId,
            members: [clerckId],
        })

        await channel.create()

        return res.status(201).json({ message: "session created", session });

    } catch (error) {
        console.error("Error creating session:", error);
        return res.status(500).json({ message: "error in creating session" });
    }
};

export async function getActiveSessions(_, res) {
    try {
        const sessions = Session.find({ status: "active" })
            .populate("host", "name profilePicture")
            .sort({ createdAt: -1 })
            .limit(20);

        return res.status(200).json({ sessions });

    } catch (error) {

    }
};

export async function getMyRecentSessions(req, res) {
    try {
        const userId = req.user._id;

        const sessions = Session.find({
            status: "completed",
            $or: [{ host: userId }, { participants: userId }]
        }).limit(20).sort({ createdAt: -1 });

        return res.status(200).json({ sessions });

    } catch (error) {
        console.error("Error fetching recent sessions:", error.message);
        return res.status(500).json({ message: "error in fetching recent sessions" });
    }
};

export async function getSessionById(req, res) {
    try {
        const { id } = req.params;

        const session = await Session.findById(id)
            .populate("host", "name profilePicture")
            .populate("participants", "name profilePicture");

        if (!session) return res.status(404).json({ message: "session not found" });

        return res.status(200).json({ session });
    } catch (error) {
        console.error("Error fetching session by ID:", error.message);
        return res.status(500).json({ message: "error in fetching session by ID" });
    }
};

export async function joinSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;
        const clerckId = req.user.clerckId;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "session not found" });

        if (!session.status === "active") return res.status(400).json({ message: "cannot join a completed session" });

        if (session.participants) return res.status(409).json({ message: "session is full" });

        if (session.participants.includes(userId)) return res.status(400).json({ message: "user already joined" });

        if (session.host.toString() === userId.toString()) return res.status(400).json({ message: "host cannot join as participant" });

        session.participants = userId;;
        await session.save();

        const channel = chatClient.channel("messaging", session.callId);
        await channel.addMembers([clerckId]);

        return res.status(200).json({ message: "joined session", session });
    } catch (error) {
        console.error("Error joining session:", error.message);
        return res.status(500).json({ message: "error in joining session" });
    }
};

export async function endSession(req, res) {
    try {
        const { id } = req.params;
        const userId = req.user.id;

        const session = await Session.findById(id);

        if (!session) return res.status(404).json({ message: "session not found" });

        if (session.host.toString() !== userId.toString()) return res.status(403).json({ message: "only host can end the session" });

        if (session.status === "completed") return res.status(400).json({ message: "session already completed" });

        // delete the video call using Stream API
        const call = streamClient.video.call("default", session.callId)
        await call.delete();

        // delete the chat channel using Stream API
        const channel = chatClient.channel("messaging", session.callId);
        await channel.delete();

        session.status = "completed";
        await session.save();

        return res.status(200).json({ message: "session ended", session });
    } catch (error) {
        console.error("Error ending session:", error.message);
        return res.status(500).json({ message: "error in ending session" });
    }
}