import { Router } from 'express';
const router = Router();
import { addChannel, getChannel } from '../controllers/channelController.js';

router.post('/', addChannel);
router.get('/', getChannel)

export default router;