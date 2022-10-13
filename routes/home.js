import { Router } from 'express';
const router = Router();
import { addHome, getHome } from '../controllers/homeController';

router.post('/', addHome)
router.get('/', getHome)

export default router;