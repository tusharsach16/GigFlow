import mongoose from 'mongoose';
const bidSchema = new mongoose.Schema({
    gigId: { type: mongoose.Schema.Types.ObjectId, ref: 'Gig', required: true },
    freelancerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    message: { type: String, required: true },
    proposedPrice: { type: Number, required: true, min: 0 },
    status: { type: String, enum: ['pending', 'hired', 'rejected'], default: 'pending' },
}, { timestamps: true });

bidSchema.index({ gigId: 1, status: 1 });
bidSchema.index({ freelancerId: 1 });
bidSchema.index({ gigId: 1, freelancerId: 1 }, { unique: true });

export default mongoose.model('Bid', bidSchema);