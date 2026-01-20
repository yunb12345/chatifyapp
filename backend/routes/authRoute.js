import express from 'express';
import { signup,login,logout,updateProfile} from '../controllers/authController.js';
import { protectRoute } from '../middlewares/authMiddleware.js';
import { arcjetProtection } from '../middlewares/arcjetMiddleware.js';

const router = express.Router();

router.get('/test',arcjetProtection,(req,res) =>{
    res.status(200).json({message:"test"})
});
router.post('/signup',signup);
router.post('/login',login);
router.post('/logout',logout);
router.put('/update-profile',protectRoute,updateProfile);
router.get('/check',protectRoute,(req,res) => res.status(200).json(req.user));

export default router;