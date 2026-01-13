import { Link } from 'react-router-dom';

const Footer = () => {
  return (
    <footer className="bg-white border-t border-emerald-50 py-12 mt-auto">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex flex-col items-center">
          <Link to="/" className="flex items-center gap-2 group mb-6">
            <div className="w-8 h-8 bg-emerald-600 rounded-lg flex items-center justify-center shadow-md shadow-emerald-100 transform group-hover:rotate-3 transition-transform">
              <img src="/Logo.png" alt="GigFlow Logo" className='w-full h-full rounded-xl object-center' />
            </div>
            <span className="text-xl font-bold text-slate-800 tracking-tight">
              Gig<span className="text-emerald-600">Flow</span>
            </span>
          </Link>

          <p className="text-slate-500 font-medium mb-8 text-center max-w-sm">
            Nurturing the world's best remote talent through a seamless and sustainable marketplace.
          </p>

          <div className="w-full pt-8 border-t border-emerald-50 flex flex-col md:flex-row justify-between items-center gap-4">
            <p className="text-sm text-slate-600">
              © 2026 GigFlow. Built for the future of work.
            </p>
            <div className="flex gap-8">
              <Link to="/privacy" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                Privacy Policy
              </Link>
              <Link to="/terms" className="text-sm text-slate-600 hover:text-emerald-600 transition-colors">
                Terms of Service
              </Link>
            </div>
          </div>
        </div>
      </div>
    </footer>
  );
};

export default Footer;
