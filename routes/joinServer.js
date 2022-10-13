import { Router } from 'express';
const router = Router();
import { joinServer } from '../controllers/joinServerController.js';

router.post('/', joinServer)

export default router;