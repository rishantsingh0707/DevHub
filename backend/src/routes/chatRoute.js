import express from 'express';
const router = express.Router();
import { protectRoute } from '../middleware/protectRoute.js';
import { getStreamToken } from '../controller/chatController.js';

router.get("/token", protectRoute,getStreamToken)


export default router;