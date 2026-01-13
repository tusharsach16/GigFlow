import { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyBids } from '../store/slices/bidSlice';
import { Search, ArrowRight, Clock, CheckCircle2, XCircle, ExternalLink } from 'lucide-react';

const MyBids = () => {
  const { myBids, loading } = useSelector((state) => state.bid);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(getMyBids());
  }, [dispatch]);

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              My <span className="text-emerald-600">Bids</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Track and manage your project proposals</p>
          </div>
          <div className="bg-white px-8 py-4 rounded-4xl border border-emerald-50 shadow-sm flex items-center gap-4">
            <div className="w-10 h-10 bg-emerald-50 rounded-full flex items-center justify-center">
              <ExternalLink className="w-5 h-5 text-emerald-600" />
            </div>
            <div>
              <p className="text-[10px] font-bold text-slate-400 uppercase tracking-widest">Active Bids</p>
              <p className="text-xl font-black text-slate-800">{myBids.length}</p>
            </div>
          </div>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-100 border-t-emerald-600"></div>
            <p className="text-slate-400 font-bold animate-pulse">Syncing proposals...</p>
          </div>
        ) : myBids.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[3rem] border border-emerald-50 shadow-sm">
            <div className="bg-emerald-50 w-24 h-24 rounded-full flex items-center justify-center mx-auto mb-6">
              <Search className="w-12 h-12 text-emerald-600 opacity-20" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">No bids submitted yet</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Don't wait for work to find you. Head over to the marketplace and start bidding.</p>
            <Link
              to="/browse"
              className="inline-flex items-center gap-2 bg-emerald-600 text-white px-10 py-5 rounded-2xl font-bold hover:bg-emerald-700 transition-all shadow-xl shadow-emerald-100 hover:-translate-y-1"
            >
              Start Exploring
              <ArrowRight className="w-5 h-5" />
            </Link>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            {myBids.map((bid) => (
              <div key={bid._id} className="group relative bg-white rounded-[2.5rem] border border-emerald-50 p-1 shadow-sm hover:shadow-2xl hover:shadow-emerald-900/5 transition-all duration-500 hover:-translate-y-2">
                <div className="p-8">
                  <div className="flex justify-between items-start mb-6">
                    <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest flex items-center gap-2 backdrop-blur-md ${
                      bid.status === 'hired'
                        ? 'bg-emerald-50 text-emerald-700 border border-emerald-100'
                        : bid.status === 'rejected'
                        ? 'bg-rose-50 text-rose-700 border border-rose-100'
                        : 'bg-amber-50 text-amber-700 border border-amber-100'
                    }`}>
                      {bid.status === 'hired' ? <CheckCircle2 className="w-3 h-3" /> : 
                       bid.status === 'rejected' ? <XCircle className="w-3 h-3" /> : 
                       <Clock className="w-3 h-3" />}
                      {bid.status}
                    </span>
                    <div className="text-right">
                      <p className="text-[10px] font-bold text-slate-400 uppercase tracking-tighter mb-1">Proposed</p>
                      <p className="text-xl font-black text-slate-800">
                        <span className="text-emerald-600 text-sm mr-0.5">₹</span>
                        {bid.proposedPrice.toLocaleString('en-IN')}
                      </p>
                    </div>
                  </div>

                  <h3 className="text-xl font-bold text-slate-800 mb-4 group-hover:text-emerald-600 transition-colors line-clamp-2 min-h-14 leading-tight">
                    {bid.gigId?.title}
                  </h3>
                  
                  <div className="bg-slate-50 rounded-2xl p-4 mb-6 relative italic text-slate-500 text-sm leading-relaxed">
                    <span className="absolute -top-3 left-4 bg-white px-2 text-[10px] font-bold text-slate-500 uppercase">Your Message</span>
                    <p className="text-slate-600 text-sm leading-relaxed">
                      {bid.message.length > 100 ? bid.message.substring(0, 100) + '...' : bid.message}
                    </p>
                  </div>
                </div>

                <div className="px-2 pb-2">
                  <Link
                    to={`/gigs/${bid.gigId?._id}`}
                    className="flex items-center justify-center gap-3 w-full bg-slate-50 group-hover:bg-emerald-600 text-slate-600 group-hover:text-white py-4 rounded-[1.8rem] font-bold text-sm transition-all duration-300"
                  >
                    Manage Proposal
                    <ArrowRight className="w-4 h-4 transform group-hover:translate-x-1 transition-transform" />
                  </Link>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </div>
  );
};

export default MyBids;