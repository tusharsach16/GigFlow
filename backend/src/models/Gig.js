import mongoose from 'mongoose';
const gigSchema = new mongoose.Schema({
    title: { type: String, required: true, trim: true },
    description: { type: String, required: true},
    budget: { type: Number, required: true, min: 0 },
    ownerId: { type: mongoose.Schema.Types.ObjectId, ref: 'User', required: true },
    status: { type: String, enum: ['open', 'assigned'], default: 'open' },
}, { timestamps: true });

gigSchema.index({status: 1});
gigSchema.index({ownerId: 1});
gigSchema.index({title: 'text'});
export default mongoose.model('Gig', gigSchema);