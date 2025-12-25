import { requireAuth } from "@clerk/express";
import User from "../models/User.js";
import { console } from "inspector";

export const protectRoute = [
    requireAuth(),
    async (req, res, next) => {
        try {
            console.log("AUTH:", req.headers.authorization);
            console.log("COOKIE:", req.headers.cookie);
            
            const clerkId = req.auth.userId;

            if (!clerkId) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            const user = await User.findOne({ clerkId });
            if (!user) {
                return res.status(401).json({ message: "Unauthorized" });
            }

            req.user = user;
            next();
        } catch (err) {
            console.error("Auth error:", err);
            return res.status(401).json({ message: "Unauthorized" });
        }
    },
];
