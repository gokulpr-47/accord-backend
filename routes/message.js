import { Router } from 'express';
const router = Router();
import messageController from '../controllers/messageController.js';

//add
router.post("/", messageController.addMessage);

//get
router.get("/:channelId", messageController.getMessage);

export default router;