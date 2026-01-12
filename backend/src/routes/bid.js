import express from 'express';
import {createBid, getBidsByGig, getMyBids, hireBids} from '../controllers/bidController.js';
import { protect } from '../middleware/auth.js';

const router = express.Router();

router.post('/', protect, createBid);
router.get('/gig/:gigId', protect, getBidsByGig);
router.get('/my-bids', protect, getMyBids);
router.patch('/:bidId/hire', protect, hireBids);

export default router;