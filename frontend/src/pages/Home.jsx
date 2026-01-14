import { Link } from 'react-router-dom';
import { useSelector } from 'react-redux';
import { ArrowRight, Users, Briefcase, Shield, Leaf } from 'lucide-react';

const Home = () => {
  const { isAuthenticated } = useSelector((state) => state.auth);

  return (
    <div className="min-h-screen bg-[#f8faf9] flex flex-col items-center justify-center px-4 py-20 relative overflow-hidden">
      <div className="absolute top-0 left-1/4 w-96 h-96 bg-emerald-100/40 rounded-full filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 right-1/4 w-96 h-96 bg-sage-100/30 rounded-full filter blur-3xl opacity-60"></div>

      <div className="max-w-5xl mx-auto text-center relative z-10">
        <div className="inline-flex items-center gap-2 px-4 py-1.5 bg-emerald-50 border border-emerald-100 rounded-full mb-10 text-sm font-semibold text-emerald-700 shadow-sm">
          <Leaf className="w-3.5 h-3.5" />
          Welcome to the Future of Freelancing
        </div>

        <h1 className="text-5xl md:text-6xl lg:text-7xl font-bold mb-8 leading-[1.1] tracking-tight text-slate-800">
          Connect with Top Talent
          <br />
          <span className="text-emerald-600 italic font-serif">Worldwide</span>
        </h1>

        <p className="text-lg md:text-xl text-slate-500 mb-12 leading-relaxed max-w-2xl mx-auto">
          Find expert freelancers for any project or showcase your skills to clients around the globe. GigFlow is the trusted marketplace for remote work.
        </p>

        <div className="flex flex-col sm:flex-row gap-5 justify-center mb-24">
          <Link
            to={isAuthenticated ? "/dashboard" : "/browse"}
            className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold px-10 py-5 text-lg transition-all duration-300 shadow-lg shadow-emerald-200 rounded-full inline-flex items-center gap-2 justify-center"
          >
            {isAuthenticated ? "Go to Dashboard" : "Explore Gigs"}
            <ArrowRight className="w-5 h-5" />
          </Link>
          
          {!isAuthenticated && (
            <Link
              to="/register"
              className="bg-white border border-slate-500 text-slate-600 hover:border-emerald-200 hover:bg-emerald-50/30 font-semibold px-10 py-5 text-lg transition-all duration-300 rounded-full flex items-center justify-center"
            >
              Join as Talent
            </Link>
          )}
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          <div className="bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl p-10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 text-left group">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Users className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Curated Talent</h3>
            <p className="text-slate-500 leading-relaxed">
              Access a curated network of skilled professionals across all industries.
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl p-10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 text-left group">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Briefcase className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Easy Project Management</h3>
            <p className="text-slate-500 leading-relaxed">
              Post jobs, review bids, and manage your projects all in one place.
            </p>
          </div>

          <div className="bg-white/50 backdrop-blur-sm border border-slate-100 rounded-3xl p-10 transition-all duration-300 hover:bg-white hover:shadow-xl hover:shadow-emerald-900/5 text-left group">
            <div className="w-12 h-12 bg-emerald-50 rounded-xl flex items-center justify-center mb-6 group-hover:scale-110 transition-transform">
              <Shield className="w-6 h-6 text-emerald-600" />
            </div>
            <h3 className="text-xl font-bold mb-3 text-slate-800">Secure Escrow</h3>
            <p className="text-slate-500 leading-relaxed">
              Peace of mind with encrypted payments and guaranteed project delivery.
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};

export default Home;  