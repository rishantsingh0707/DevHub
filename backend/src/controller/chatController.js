import { chatClient } from "../lib/stream.js";

export function getStreamToken(req, res) {
    try {
        const clerkId = req.user.clerkId.toLowerCase();

        const token = chatClient.createToken(clerkId);
        console.log("Generated Stream token for user:", clerkId);
        console.log("Token:", token);
        res.json({
            token,
            userId: clerkId,
            userName: req.user.name,
            userImage: req.user.profilePicture,
        });
    } catch (error) {
        console.error("Error in getStreamToken:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
