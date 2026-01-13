import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { getMyGigs, deleteGig } from '../store/slices/gigSlice';
import { toast } from 'react-toastify';
import { Trash2, Eye, Briefcase, Plus, AlertTriangle, IndianRupee } from 'lucide-react';

const MyGigs = () => {
  const { myGigs, loading } = useSelector((state) => state.gig);
  const dispatch = useDispatch();

  const [isDeleteModalOpen, setIsDeleteModalOpen] = useState(false);
  const [selectedGigId, setSelectedGigId] = useState(null);

  useEffect(() => {
    dispatch(getMyGigs());
  }, [dispatch]);

  const openDeleteModal = (id) => {
    setSelectedGigId(id);
    setIsDeleteModalOpen(true);
  };

  const confirmDelete = async () => {
    try {
      await dispatch(deleteGig(selectedGigId)).unwrap();
      toast.success('Gig deleted successfully!');
      setIsDeleteModalOpen(false);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-5xl mx-auto">
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-6 mb-12">
          <div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">
              My Posted <span className="text-emerald-600">Gigs</span>
            </h1>
            <p className="text-slate-500 font-medium mt-1">Manage your active listings and hire talent</p>
          </div>
          <Link
            to="/create-gig"
            className="inline-flex items-center gap-2 bg-emerald-600 text-white px-6 py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all hover:-translate-y-1 active:scale-95"
          >
            <Plus className="w-5 h-5" />
            Post New Gig
          </Link>
        </div>

        {loading ? (
          <div className="flex flex-col justify-center items-center h-64 gap-4">
            <div className="animate-spin rounded-full h-10 w-10 border-4 border-emerald-100 border-t-emerald-600"></div>
            <p className="text-slate-400 font-bold animate-pulse">Loading your projects...</p>
          </div>
        ) : myGigs.length === 0 ? (
          <div className="text-center py-20 bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
              <Briefcase className="w-10 h-10 text-emerald-600 opacity-20" />
            </div>
            <h2 className="text-2xl font-bold text-slate-800 mb-2">You haven't posted anything yet</h2>
            <p className="text-slate-500 mb-8 max-w-sm mx-auto">Need help with a project? Post your first gig and start receiving proposals today.</p>
            <Link
              to="/create-gig"
              className="inline-flex items-center gap-2 bg-slate-900 text-white px-8 py-4 rounded-2xl font-bold hover:bg-emerald-600 transition-all"
            >
              Get Started Now
            </Link>
          </div>
        ) : (
          <div className="grid gap-6">
            {myGigs.map((gig) => (
              <div key={gig._id} className="group bg-white rounded-4xl border border-emerald-50 p-6 md:p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300">
                <div className="flex flex-col md:flex-row justify-between items-start gap-6">
                  <div className="flex-1">
                    <div className="flex items-center gap-3 mb-4">
                      <span className={`px-4 py-1 rounded-full text-[10px] font-black uppercase tracking-widest ${
                        gig.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
                      }`}>
                        {gig.status}
                      </span>
                      <div className="flex items-center gap-1 text-emerald-600 font-black text-xl">
                        <IndianRupee className="text-sm font-bold text-slate-500" />
                        {gig.budget.toLocaleString('en-IN')}
                      </div>
                    </div>

                    <h3 className="text-2xl font-bold text-slate-800 mb-2 group-hover:text-emerald-600 transition-colors">
                      {gig.title}
                    </h3>
                    
                    <p className="text-slate-500 font-medium text-sm leading-relaxed mb-4 line-clamp-2 max-w-2xl">
                      {gig.description}
                    </p>
                  </div>

                  <div className="flex flex-row md:flex-col gap-3 w-full md:w-auto">
                    <Link
                      to={`/gigs/${gig._id}`}
                      className="flex-1 flex items-center justify-center gap-2 bg-emerald-50 text-emerald-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-emerald-600 hover:text-white transition-all"
                    >
                      <Eye className="w-4 h-4" />
                      View Bids
                    </Link>
                    <button
                      onClick={() => openDeleteModal(gig._id)}
                      className="flex-1 flex items-center justify-center gap-2 bg-rose-50 text-rose-600 px-5 py-3 rounded-xl font-bold text-sm hover:bg-rose-600 hover:text-white transition-all"
                    >
                      <Trash2 className="w-4 h-4" />
                      Delete
                    </button>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}

        {isDeleteModalOpen && (
          <div className="fixed inset-0 z-100 flex items-center justify-center p-4">
            <div 
              className="absolute inset-0 bg-slate-900/40 backdrop-blur-sm animate-in fade-in duration-300"
              onClick={() => setIsDeleteModalOpen(false)}
            ></div>

            <div className="relative bg-white rounded-[2.5rem] p-8 md:p-10 max-w-md w-full shadow-2xl shadow-rose-900/20 border border-rose-50 animate-in zoom-in-95 duration-300">
              <div className="flex flex-col items-center text-center">
                <div className="w-20 h-20 bg-rose-50 rounded-full flex items-center justify-center mb-6">
                  <AlertTriangle className="w-10 h-10 text-rose-600" />
                </div>
                
                <h3 className="text-2xl font-black text-slate-800 mb-2">Delete Project?</h3>
                <p className="text-slate-500 font-medium mb-8">
                  Are you sure you want to delete this gig? All proposals and project history will be lost forever.
                </p>

                <div className="flex gap-4 w-full">
                  <button
                    onClick={() => setIsDeleteModalOpen(false)}
                    className="flex-1 px-6 py-4 rounded-2xl font-bold text-slate-400 hover:bg-slate-50 transition-colors"
                  >
                    Cancel
                  </button>
                  <button
                    onClick={confirmDelete}
                    className="flex-1 px-6 py-4 bg-rose-600 text-white rounded-2xl font-bold hover:bg-rose-700 shadow-lg shadow-rose-100 transition-all active:scale-95"
                  >
                    Delete Forever
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

export default MyGigs;
