import { Router } from 'express';
const router = Router();
import registerController from '../controllers/registerController.js';

router.post('/', registerController.handleNewUser);

export default router;