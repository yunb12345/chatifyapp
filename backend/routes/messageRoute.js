import express from 'express';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { getAllContacts,sendMessage,getMessageByUserId, getChatPartners, searchUsers } from '../controllers/messageController.js';
const router = express.Router();


router.get('/contacts', protectRoute, getAllContacts);
router.get('/chats', protectRoute, getChatPartners);
router.get('/search', protectRoute, searchUsers);
router.get('/:id',protectRoute,getMessageByUserId);
router.post('/send/:id',protectRoute, sendMessage);

export default router;