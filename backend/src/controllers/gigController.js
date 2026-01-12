import Gig from '../models/Gig.js';

export const createGig = async (req, res) => {
    try {
        const {title, description, budget} = req.body;
        if(!title || !description || !budget) {
            return res.status(400).json({success: false, message: 'All fields are required'});
        }
        const gig = await Gig.create({title, description, budget, ownerId: req.user._id});
        res.status(201).json({success: true, data: gig});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
};

export const getAllGigs = async (req, res) => {
    try {
        const {search} = req.query;
        let query = {status: 'open'};
        if(search) {
            query.title = {$regex: search, $options: 'i'};
        }
        const gigs = await Gig.find(query).populate('ownerId', 'name email').sort({createdAt: -1});
        res.status(200).json({success: true,count: gigs.length, data: gigs});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
};

export const getGigById = async (req, res) => {
    try {
        const gig = await Gig.findById(req.params.id).populate('ownerId', 'name email');
        if(!gig) {
            return res.status(404).json({success: false, message: 'Gig not found', error: error.message});
        }
        return res.status(200).json({success: true, gig});
    } catch(error) {
        res.status(500).json({success: false, message: 'Server Error', error: error.message});
    }
};

export const getMyGigs = async(req, res) => {
    try {
        const gigs = await Gig.find({ownerId: req.user._id}).sort({createdAt: -1});
        res.status(200).json({success: true, count: gigs.length, gigs});
    } catch(error) {
        res.status(500).json({success: false, message: 'Failed to get my gigs', error: error.message});
    }
};

export const updateGig = async(req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if(!gig) {
            res.status(404).json({success: false, message: 'Gig not found to update'});
        }
        if(gig.ownerId.toString() != req.user._id.toString()) {
            return res.status(403).json({success: false, message: 'Not authorised to update the gig'});
        }
        const {title, description, budget} = req.body;
        if(title) gig.title = title;
        if(description) gig.description = description;
        if(budget) gig.budget = budget;
        await gig.save();
        res.status(200).json({success: true, gig});
    } catch(error) {
        res.status(500).json({success: false, message: 'Not able to update Gig', error: error.message});
    }
}


export const deleteGig = async(req, res) => {
    try {
        const gig = await Gig.findById(req.params.id);
        if(!gig) {
            return res.status(404).json({success: false, message: 'Gig not found'});
        }
        if(gig.ownerId.toString() !== req.user._id.toString()) {
            return res.status(403).json({success: false, message: 'Not authorised to delete this gig'});
        }
        await gig.deleteOne();
        res.status(200).json({success: true, message: 'Gig deleted successfully'});
    } catch(error) {
        res.status(500).json({success: false, message:'Error in deleting gig', error: error.message});
    }
};