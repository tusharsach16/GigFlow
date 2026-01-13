import { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { getGigById } from '../store/slices/gigSlice';
import { createBid, getBidsByGig, hireBid } from '../store/slices/bidSlice';
import { toast } from 'react-toastify';
import { MessageCircle, CheckCircle2 } from 'lucide-react';
import GigInfo from '../components/GigDetails/GigInfo';
import BidForm from '../components/GigDetails/BidForm';
import BidItem from '../components/GigDetails/BidItem';

const GigDetails = () => {
  const { id } = useParams();
  const dispatch = useDispatch();
  const { selectedGig, loading: gigLoading } = useSelector((state) => state.gig);
  const { gigBids, loading: bidLoading } = useSelector((state) => state.bid);
  const { user, isAuthenticated } = useSelector((state) => state.auth);

  const [bidForm, setBidForm] = useState({ message: '', proposedPrice: '' });
  const [isHireModalOpen, setIsHireModalOpen] = useState(false);
  const [selectedBidId, setSelectedBidId] = useState(null);

  const isOwner = user?._id === selectedGig?.ownerId?._id;

  useEffect(() => {
    dispatch(getGigById(id));
  }, [dispatch, id]);

  useEffect(() => {
    if (isOwner && selectedGig) {
      dispatch(getBidsByGig(id));
    }
  }, [dispatch, id, isOwner, selectedGig]);

  const handleBidSubmit = async (e) => {
    e.preventDefault();
    try {
      await dispatch(createBid({ gigId: id, ...bidForm })).unwrap();
      toast.success('Bid submitted successfully!');
      setBidForm({ message: '', proposedPrice: '' });
    } catch (error) {
      toast.error(error);
    }
  };

  const openHireModal = (bidId) => {
    setSelectedBidId(bidId);
    setIsHireModalOpen(true);
  };

  const confirmHire = async () => {
    try {
      await dispatch(hireBid(selectedBidId)).unwrap();
      toast.success('Freelancer hired successfully!');
      setIsHireModalOpen(false);
      dispatch(getGigById(id));
    } catch (error) {
      toast.error(error);
    }
  };

  if (gigLoading) return <div className="text-center py-20 text-emerald-600 font-bold">Loading...</div>;
  if (!selectedGig) return <div className="text-center py-20">Gig not found</div>;

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4">
      <div className="max-w-4xl mx-auto">
        
        <GigInfo gig={selectedGig} />

        {!isOwner && isAuthenticated && selectedGig.status === 'open' && (
          <BidForm 
            bidForm={bidForm} 
            setBidForm={setBidForm} 
            onSubmit={handleBidSubmit} 
            loading={bidLoading} 
          />
        )}

        {isOwner && (
          <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-8 md:p-10">
            <div className="flex items-center gap-3 mb-10">
              <div className="p-3 bg-emerald-50 rounded-2xl">
                <MessageCircle className="w-6 h-6 text-emerald-600" />
              </div>
              <h2 className="text-2xl font-black text-slate-800">Proposals ({gigBids.length})</h2>
            </div>

            <div className="grid gap-6">
              {gigBids.map(bid => (
                <BidItem 
                  key={bid._id} 
                  bid={bid} 
                  onHire={openHireModal} 
                  canHire={selectedGig.status === 'open'} 
                  loading={bidLoading} 
                />
              ))}
              {gigBids.length === 0 && <p className="text-center text-slate-400 italic">No proposals yet.</p>}
            </div>
          </div>
        )}

        {isHireModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsHireModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl shadow-emerald-900/20 border border-emerald-50 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-emerald-50 rounded-full flex items-center justify-center mb-6">
                  <CheckCircle2 className="w-10 h-10 text-emerald-600" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2">Confirm Hiring</h3>
                <p className="text-slate-500 font-medium mb-8">
                  Are you sure you want to hire this freelancer? This will mark the project as closed.
                </p>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setIsHireModalOpen(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmHire}
                    disabled={bidLoading}
                    className="flex-1 px-6 py-4 bg-emerald-600 text-white rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-95 disabled:opacity-50"
                  >
                    {bidLoading ? 'Hiring...' : 'Yes, Hire'}
                  </button>
                </div>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};

export default GigDetails;