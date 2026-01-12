import express from 'express';
import {createGig, getAllGigs, getGigById, getMyGigs, updateGig, deleteGig} from '../controllers/gigController.js';
import {protect} from '../middleware/auth.js';

const router = express.Router();

router.get('/', getAllGigs);
router.post('/', protect, createGig);
router.get('/my-gigs', protect, getMyGigs);
router.get('/:id', getGigById);
router.patch('/:id', protect, updateGig);
router.delete('/:id', protect, deleteGig);

export default router;