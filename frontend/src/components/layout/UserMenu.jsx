import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';

const UserMenu = ({ user, open, setOpen, handleLogout }) => {
  const menuRef = useRef();

  useEffect(() => {
    const handleClickOutside = (event) => {
      if (open && menuRef.current && !menuRef.current.contains(event.target)) {
        setOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [open, setOpen]);

  return (
    <div className="relative" ref={menuRef}>
      <button
        onClick={() => setOpen(!open)}
        className="flex items-center space-x-3 p-1.5 pr-4 rounded-full border border-emerald-100 bg-emerald-50/30 hover:bg-emerald-50 transition-all focus:outline-none"
      >
        <div className="w-8 h-8 rounded-full bg-emerald-600 flex items-center justify-center text-white text-sm font-bold shadow-sm">
          {user?.name?.[0].toUpperCase()}
        </div>
        <span className="text-sm font-semibold text-slate-700 hidden sm:block">
          {user?.name}
        </span>
        <svg
          className={`w-4 h-4 text-emerald-600 transition-transform duration-300 ${open ? 'rotate-180' : ''}`}
          fill="none"
          stroke="currentColor"
          viewBox="0 0 24 24"
        >
          <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2.5" d="M19 9l-7 7-7-7" />
        </svg>
      </button>

      {open && (
        <div className="absolute right-0 mt-3 w-56 bg-white rounded-2xl shadow-xl shadow-emerald-900/5 border border-emerald-50 py-3 z-50 overflow-hidden ring-1 ring-black/5 animate-in fade-in zoom-in duration-200">
          <div className="px-5 py-2 mb-2 border-b border-emerald-50">
            <p className="text-[10px] font-bold text-emerald-600 uppercase tracking-[0.15em]">
              Freelancer Portal
            </p>
          </div>
          
          <div className="space-y-1">
            <Link
              to="/my-gigs"
              className="block px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              My Posted Gigs
            </Link>
            <Link
              to="/my-bids"
              className="block px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              My Bids
            </Link>
            <Link
              to="/create-gig"
              className="block px-5 py-2.5 text-sm text-slate-600 hover:bg-emerald-50 hover:text-emerald-700 transition-colors"
              onClick={() => setOpen(false)}
            >
              Post a Gig
            </Link>
          </div>

          <div className="mt-3 pt-2 border-t border-emerald-50">
            <button
              onClick={() => {
                handleLogout();
                setOpen(false);
              }}
              className="w-full text-left px-5 py-2.5 text-sm text-rose-500 font-semibold hover:bg-rose-50 transition-colors"
            >
              Sign Out
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export default UserMenu;