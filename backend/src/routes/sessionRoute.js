import express from 'express';
import { protectRoute } from '../middleware/protectRoute.js';
import { createSession, getActiveSessions, getMyRecentSessions, getSessionById, joinSession, endSession ,leaveSession} from '../controller/sessionController.js';
const router = express.Router();

router.post('/', protectRoute, createSession);
router.get("/active", protectRoute, getActiveSessions);
router.get("/my-recent", protectRoute, getMyRecentSessions);

router.get("/:id", protectRoute, getSessionById);
router.post("/:id/join", protectRoute, joinSession);
router.post("/:id/end", protectRoute, endSession);
router.post("/:id/leave", leaveSession);

export default router;