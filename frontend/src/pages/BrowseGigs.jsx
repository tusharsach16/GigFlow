import { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { getAllGigs } from '../store/slices/gigSlice';
import { Link } from 'react-router-dom';
import { Search, IndianRupee, ArrowRight} from 'lucide-react';

const BrowseGigs = () => {
  const [search, setSearch] = useState('');
  const [debouncedSearch, setDebouncedSearch] = useState('');
  const { gigs, loading, error } = useSelector((state) => state.gig);
  const dispatch = useDispatch();

  useEffect(() => {
    const timer = setTimeout(() => {
      setDebouncedSearch(search);
    }, 500);
    return () => clearTimeout(timer);
  }, [search]);

  useEffect(() => {
    dispatch(getAllGigs(debouncedSearch));
  }, [dispatch, debouncedSearch]);

  const handleSearch = (e) => {
    setSearch(e.target.value);
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="mb-12 text-center md:text-left">
          <h1 className="text-4xl font-black text-slate-800 mb-4 tracking-tight">
            Explore Available <span className="text-emerald-600">Gigs</span>
          </h1>
          <p className="text-slate-500 font-medium mb-8">Discover high-quality projects from top clients worldwide.</p>
          
          <div className="relative max-w-2xl group">
            <div className="absolute inset-y-0 left-0 pl-5 flex items-center pointer-events-none">
              <Search className="h-5 w-5 text-slate-400 group-focus-within:text-emerald-600 transition-colors" />
            </div>
            <input
              type="text"
              placeholder="Search projects by title, skills, or keywords..."
              value={search}
              onChange={handleSearch}
              className="w-full pl-12 pr-4 py-4 bg-white border border-emerald-50 rounded-2xl shadow-sm focus:outline-none focus:ring-4 focus:ring-emerald-500/10 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
            />
          </div>
        </div>

        {error && (
          <div className="mb-8 p-4 bg-rose-50 border border-rose-100 text-rose-700 rounded-2xl flex items-center gap-3">
            <span className="w-2 h-2 bg-rose-500 rounded-full animate-pulse"></span>
            {error}
          </div>
        )}

        {loading ? (
          <div className="flex flex-col justify-center items-center h-96 gap-4">
            <div className="animate-spin rounded-full h-12 w-12 border-4 border-emerald-100 border-t-emerald-600"></div>
            <p className="text-slate-400 font-bold animate-pulse">Fetching opportunities...</p>
          </div>
        ) : gigs.length === 0 ? (
          <div className="text-center py-24 bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm">
            <div className="bg-emerald-50 w-20 h-20 rounded-full flex items-center justify-center mx-auto mb-6">
                <Search className="w-10 h-10 text-emerald-600 opacity-20" />
            </div>
            <p className="text-slate-400 text-xl font-bold">No gigs found matching your criteria</p>
            <button 
                onClick={() => setSearch('')}
                className="mt-4 text-emerald-600 font-bold hover:underline"
            >
                Clear all filters
            </button>
          </div>
        ) : (
          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
            {gigs.map((gig) => (
              <div
                key={gig._id}
                className="group bg-white rounded-4xl border border-emerald-50 p-8 shadow-sm hover:shadow-xl hover:shadow-emerald-900/5 transition-all duration-300 flex flex-col hover:-translate-y-1"
              >
                <div className="flex justify-between items-start mb-6">
                    <span className="px-4 py-1.5 bg-emerald-50 text-emerald-700 text-xs font-black uppercase tracking-widest rounded-full">
                        {gig.status} 
                    </span>
                    <div className="flex items-center gap-1 text-emerald-600 font-black text-xl">
                        <IndianRupee className="text-sm font-bold text-slate-600"/>
                        {gig.budget}
                    </div>
                </div>

                <h3 className="text-xl font-bold text-slate-800 mb-3 group-hover:text-emerald-600 transition-colors line-clamp-1">
                  {gig.title}
                </h3>
                
                <p className="text-slate-500 mb-6 line-clamp-2 leading-relaxed text-sm font-medium">
                  {gig.description}
                </p>

                <div className="pt-6 border-t border-emerald-50 mt-auto flex items-center justify-between group">
                    <div className="flex items-center gap-3">
                        <div className="w-10 h-10 bg-slate-100 rounded-full flex items-center justify-center text-emerald-500 font-bold text-sm group-hover:rotate-12">
                            {gig.ownerId?.name?.[0].toUpperCase() || '?'}
                        </div>
                        <div>
                            <p className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">Client</p>
                            <p className="text-sm font-bold text-slate-700">{gig.ownerId?.name || 'Anonymous'}</p>
                        </div>
                    </div>
                    
                    <Link
                      to={`/gigs/${gig._id}`}
                      className="p-3 bg-emerald-50 text-emerald-600 rounded-xl hover:bg-emerald-600 hover:text-white transition-all group-hover:shadow-lg group-hover:shadow-emerald-200"
                    >
                      <ArrowRight className="w-5 h-5" />
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

export default BrowseGigs;