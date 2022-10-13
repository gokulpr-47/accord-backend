import { Router } from 'express';
const router = Router();
import { handleAddServer, handleGetServer, handleGetServerId, deleteServer } from '../../controllers/handleServerController.js';

router.post('/', handleAddServer);
router.get('/', handleGetServer)
router.get('/:server_id', handleGetServerId)
router.delete('/', deleteServer)

// router.route('/')
//     .post(handleServerController.handleAddServer)

// router.route('/:email')
//     .get(handleServerController.handleGetServer)

export default router;     

