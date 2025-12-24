import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { requireAuth } from "@clerk/express";
import { createSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession, endSession } from '../controller/sessionController.js';
const router = express.Router();

router.post('/', protectRoute, createSession);
router.use((req, res, next) => {
    console.log("SESSION ROUTE HIT:", req.method, req.originalUrl);
    next();
});

router.get("/active", requireAuth(), getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);

router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);

export default router;