import Bid from '../models/Bid.js';
import Gig from '../models/Gig.js';
import mongoose from 'mongoose';
import { getGigById } from './gigController.js';

export const createBid = async (req, res) => {
    try {
        const {gigId, message, proposedPrice} = req.body;
        if(!gigId || !message || !proposedPrice) {
            return res.status(400).json({success: false,error: 'All fields are required'});
        }
        const gig = await Gig.findById(gigId);
        if(!gig) {
            return res.status(404).json({success: false, error: 'Gig not found'});
        }
        if(gig.status !== 'open') {
            return res.status(400).json({success: false, error: 'Bids can only be placed on open gigs'});
        }
        if(gig.ownerId.toString() === req.user._id) {
            return res.status(400).json({success: false, error: 'You cannot bid on your own gig'});
        }

        const existingBid = await Bid.findOne({gigId, freelancerId: req.user._id});
        if(existingBid) {
            return res.status(400).json({success: false, error: 'You have already placed a bid on this gig'});
        }

        const bid = await Bid.create({gigId, freelancerId: req.user._id, message, proposedPrice});

        const popluatedBid = await Bid.findById(bid._id)
            .populate('freelancerId', 'name email')
            .populate('gigId', 'title description budget');

        res.status(201).json({success: true, bid: popluatedBid});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
};

export const getBidsByGig = async(req, res) => {
    try {
        const {gigId} = req.params;
        const gig = await Gig.findById(gigId);
        if(!gig) {
            return res.status(404).json({success: false, message: 'Gig not found'});
        }

        if(gig.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({success: false, message: 'Not authorised to view bids for this gig'});
        }

        const bids = await Bid.find({gigId})
            .populate('freelancerId', 'name email')
            .sort({createdAt: -1});
        
        res.status(200).json({success: true, count: bids.length, bids});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
};

export const getMyBids = async(req, res) => {
    try {
        const bids = await Bid.find({freelancerId: req.user._id})
            .populate('gigId', 'title description budget status')
            .sort({createdAt: -1});

        res.status(200).json({success: true, count: bids.length, bids});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
};

export const hireBids = async(req, res) => {
    const session = await mongoose.startSession();
    session.startTransaction();
    try {
        const {bidId} = req.params;
        const bid = await Bid.findById(bidId).session(session);

        if(!bid) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({success: false, message: 'Bid not found'});
        }

        const gig = await Gig.findById(bid.gigId).session(session);
        if(!gig) {
            await session.abortTransaction();
            session.endSession();
            return res.status(404).json({success: false, message: 'Gig not found'});
        }

        if(gig.ownerId.toString() !== req.user._id.toString()) {
            await session.abortTransaction();
            session.endSession();
            return res.status(403).json({success: false, message: 'Not authorised to hire for this gig'});
        }

        if(gig.status !== 'open') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({success: false, message: 'Gig is not open for hiring'});
        }

        if(bid.status !== 'pending') {
            await session.abortTransaction();
            session.endSession();
            return res.status(400).json({success: false, message: 'Bid is not in a pending state'});
        }

        await Bid.findByIdAndUpdate(
            bidId, 
            {status: 'hired'}, 
            {new: true, session}
        );

        await Gig.findByIdAndUpdate(gig._id, 
            {status: 'assigned'}, 
            {new: true, session}
        );

        await Bid.updateMany(
            {gigId: gig._id, _id: {$ne: bidId}}, 
            {status: 'rejected'}, 
            {session}
        );

        await session.commitTransaction();
        session.endSession();

        const updateBid = await Bid.findById(bidId)
            .populate('freelancerId', 'name email')
            .populate('gigId', 'title description budget');

        const freelancerRoom = bid.freelancerId._id ? bid.freelancerId._id.toString() : bid.freelancerId.toString();
        
        console.log("Sending notification to room:", freelancerRoom);

        req.io.to(freelancerRoom).emit('hired', {
            message: `Congratulations! You have been hired for the gig: ${gig.title}`,
            gigTitle: gig.title,
            gigId: gig._id,
            timestamp: new Date()
        });
        
        res.status(200).json({success: true,message: 'Freelance hired successfully', bid: updateBid});
    } catch(error) {
        await session.abortTransaction();
        session.endSession();
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
}