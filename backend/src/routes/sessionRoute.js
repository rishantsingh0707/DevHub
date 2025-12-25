import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession, endSession } from '../controller/sessionController.js';
const router = express.Router();

router.use((req, res, next) => {
    console.log("SESSION ROUTE HIT:", req.method, req.originalUrl);
    next();
});
router.post('/', protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);

router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);

export default router;