import { chatClient } from "../lib/stream.js";

export function getStreamToken(req, res) {
    try {
        const token = chatClient.createToken(req.user.clerkId);
        res.json({
            token,
            userId: req.user.clerkId,
            userName: req.user.name,
            userImage: req.user.profilePicture
        });
    } catch (error) {
        console.error("Error in getStreamToken:", error);
        res.status(500).json({ message: "Server Error" });
    }
}