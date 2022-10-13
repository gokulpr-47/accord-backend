import { Router } from 'express';
const router = Router();
import conversationController from '../controllers/conversationController.js';

router.post('/', conversationController.newConversation)
router.get('/:channelId', conversationController.getConversation);

export default router;