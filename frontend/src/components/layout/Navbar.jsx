import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useState } from 'react';
import UserMenu from './UserMenu';
import { Menu, X } from 'lucide-react'; 

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  
  const [open, setOpen] = useState(false);
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    setOpen(false);
    setMobileMenuOpen(false);
    navigate('/');
  };

  const logoLink = isAuthenticated ? "/dashboard" : "/";
  const closeMobileMenu = () => setMobileMenuOpen(false);

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="relative flex justify-between h-16 items-center">
          
          <Link to={logoLink} className="flex items-center gap-2 group z-10" onClick={closeMobileMenu}>
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 transform group-hover:rotate-3 transition-all duration-300">
              <img src="/Logo.png" alt="GigFlow Logo" className='w-full h-full rounded-xl object-center' />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Gig<span className="text-emerald-600">Flow</span>
            </span>
          </Link>

          <div className="hidden md:flex absolute inset-0 items-center justify-center pointer-events-none">
            <Link 
              to="/browse" 
              className="pointer-events-auto text-sm font-semibold text-slate-700 hover:text-emerald-600 transition-colors"
            >
              Browse Gigs
            </Link>
          </div>

          <div className="flex items-center gap-5 z-10">
            <div className="hidden md:flex items-center gap-5">
              {!isAuthenticated ? (
                <>
                  <Link to="/login" className="text-sm font-semibold text-slate-700 hover:text-slate-800 transition-colors">
                    Sign in
                  </Link>
                  <Link to="/register" className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 shadow-md shadow-emerald-100 transition-all active:scale-95">
                    Join Now
                  </Link>
                </>
              ) : (
                <UserMenu user={user} open={open} setOpen={setOpen} handleLogout={handleLogout} />
              )}
            </div>

            <div className="flex md:hidden items-center gap-3">
              <Link to="/browse" className="text-xs font-bold text-emerald-600 bg-emerald-50 px-3 py-1.5 rounded-lg">
                Browse
              </Link>
              <button 
                onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
                className="p-2 text-slate-600 hover:bg-emerald-50 rounded-lg transition-colors"
              >
                {mobileMenuOpen ? <X size={24} /> : <Menu size={24} />}
              </button>
            </div>
          </div>
        </div>
      </div>

      {mobileMenuOpen && (
        <div className="md:hidden bg-white border-b border-emerald-50 px-4 pt-2 pb-6 space-y-4 shadow-xl">
          {isAuthenticated ? (
            <div className="space-y-2">
              <div className="px-3 py-2 flex items-center gap-3">
                <div className="w-10 h-10 rounded-full bg-emerald-100 flex items-center justify-center text-emerald-700 font-bold border border-emerald-200">
                  {user?.name?.[0] || 'U'}
                </div>
                <div>
                  <p className="text-sm font-bold text-slate-800">{user?.name}</p>
                  <p className="text-xs text-slate-500">{user?.email}</p>
                </div>
              </div>
              <Link to="/dashboard" className="block px-3 py-2 text-slate-600 hover:bg-slate-50 rounded-md" onClick={closeMobileMenu}>Dashboard</Link>
              <button 
                onClick={handleLogout}
                className="block w-full text-left px-3 py-2 text-red-600 font-medium hover:bg-red-50 rounded-md"
              >
                Sign out
              </button>
            </div>
          ) : (
            <div className="flex flex-col gap-3 px-3">
              <Link 
                to="/login" 
                className="block w-full py-3 text-center font-semibold text-slate-600 hover:bg-slate-50 rounded-xl"
                onClick={closeMobileMenu}
              >
                Sign in
              </Link>
              <Link 
                to="/register" 
                className="block w-full bg-emerald-600 text-white px-4 py-3 rounded-xl text-center font-bold shadow-md shadow-emerald-100"
                onClick={closeMobileMenu}
              >
                Join Now
              </Link>
            </div>
          )}
        </div>
      )}
    </nav>
  );
};

export default Navbar;