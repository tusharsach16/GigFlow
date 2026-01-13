import { Link, useNavigate, useLocation } from 'react-router-dom';
import { useSelector, useDispatch } from 'react-redux';
import { logout } from '../../store/slices/authSlice';
import { useState } from 'react';
import UserMenu from './UserMenu';

const Navbar = () => {
  const { isAuthenticated, user } = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const location = useLocation();
  const [open, setOpen] = useState(false);

  const handleLogout = async () => {
    await dispatch(logout()).unwrap();
    setOpen(false);
    navigate('/');
  };

  const isGuestPage = ["/", "/login", "/register"].includes(location.pathname);
  const logoLink = isAuthenticated ? "/dashboard" : "/";

  return (
    <nav className="sticky top-0 z-40 w-full bg-white/80 backdrop-blur-md border-b border-emerald-50">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex justify-between h-16 items-center">
        
          <Link to={logoLink} className="flex items-center gap-2 group">
            <div className="w-10 h-10 bg-emerald-600 rounded-xl flex items-center justify-center shadow-lg shadow-emerald-200 transform group-hover:rotate-3 transition-all duration-300">
              <span className="text-white font-black text-xl italic font-serif">G</span>
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Gig<span className="text-emerald-600">Flow</span>
            </span>
          </Link>

          <div className="flex items-center gap-8">
            <Link
              to="/browse"
              className="text-sm font-semibold text-slate-500 hover:text-emerald-600 transition-colors"
            >
              Browse Gigs
            </Link>

            {(isGuestPage || !isAuthenticated) ? (
              <div className="flex items-center gap-5">
                <Link
                  to="/login"
                  className="text-sm font-semibold text-slate-500 hover:text-slate-800 transition-colors"
                >
                  Sign in
                </Link>
                <Link
                  to="/register"
                  className="bg-emerald-600 text-white px-6 py-2.5 rounded-full text-sm font-bold hover:bg-emerald-700 shadow-md shadow-emerald-100 transition-all active:scale-95"
                >
                  Join Now
                </Link>
              </div>
            ) : (
              <UserMenu
                user={user}
                open={open}
                setOpen={setOpen}
                handleLogout={handleLogout}
              />
            )}
          </div>
        </div>
      </div>
    </nav>
  );
};

export default Navbar;
