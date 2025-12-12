import User from "../models/User.js";
import { requireAuth } from "@clerk/express";

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            const clerkId = req.auth().userId;

            if (!clerkId) return res.status(401).json({ message: "Unauthorized" });

            const user = await User.findOne({ clerkId });

            if (!user) return res.status(401).json({ message: "Unauthorized" });

            req.user = user;
            console.log(req.user);

            next();

        } catch (error) {
            console.error("Error in protectRoute middleware:", error);
            return res.status(500).json({ message: "Server Error" });
        }
    }
]