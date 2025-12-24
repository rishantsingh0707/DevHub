import { chatClient } from "../lib/stream.js";

export function getStreamToken(req, res) {
    try {
        const clerkId = req.user.clerkId.toLowerCase(); // 🔴 REQUIRED

        const token = chatClient.createToken(clerkId);

        res.json({
            token,
            userId: clerkId,                 // ✅ lowercase
            userName: req.user.username,     // map from MongoDB
            userImage: req.user.profilePicture || null
        });
    } catch (error) {
        console.error("Error in getStreamToken:", error);
        res.status(500).json({ message: "Server Error" });
    }
}
