import { useSelector } from 'react-redux';
import { Link } from 'react-router-dom';
import { MessageSquare, Search, PlusCircle, Sparkles, ArrowRight } from 'lucide-react';

const Dashboard = () => {
  const { user } = useSelector((state) => state.auth);

  const actions = [
    {
      title: "Find a Gig",
      desc: "Browse through thousands of open projects and start bidding.",
      icon: Search,
      link: "/browse",
      btnText: "Browse Jobs"
    },
    {
      title: "Post a Project",
      desc: "Need help? Post a new gig and find the perfect freelancer.",
      icon: PlusCircle,
      link: "/create-gig",
      btnText: "Create Gig"
    },
    {
      title: "My Posted Gigs",
      desc: "View and manage all your posted gigs and manage your bids.",
      icon: MessageSquare,
      link: "/my-gigs",
      btnText: "View Gigs"
    },
  ];

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6 lg:px-8">
      <div className="max-w-7xl mx-auto">
        
        <div className="group flex items-center gap-6 mb-10 bg-white p-8 rounded-[2.5rem] border border-emerald-50 shadow-sm transition-all duration-300">
            <div className="w-20 h-20 bg-emerald-600 rounded-3xl flex items-center justify-center text-white text-3xl font-black shadow-lg shadow-emerald-200 overflow-hidden">
               <span className="inline-block transition-transform duration-300 group-hover:rotate-12">
                 {user?.name?.[0].toUpperCase()}
               </span>
            </div>
          <div>
            <h1 className="text-3xl font-bold text-slate-800 flex items-center gap-2">
              Welcome back, {user?.name}!
            </h1>
            <p className="text-slate-500 font-medium">Here's what's happening with your projects today.</p>
          </div>
        </div>

        <h2 className="text-xl font-bold text-slate-800 mb-6 flex items-center gap-2">
          <Sparkles className="w-5 h-5 text-emerald-600" /> Quick Actions
        </h2>
        
        <div className="grid grid-cols-1 md:grid-cols-3 gap-8">
          {actions.map((action, idx) => (
            <div key={idx} className="bg-white rounded-[2.5rem] p-8 border border-slate-100 shadow-sm hover:shadow-2xl hover:shadow-slate-500/10 transition-all group relative overflow-hidden hover:border-slate-300">
              <div className="relative z-10">
                <div className="w-12 h-12 bg-slate-50 rounded-xl flex items-center justify-center mb-6 border border-slate-200 transition-all duration-300 group-hover:scale-110 group-hover:border-emerald-200 group-hover:bg-emerald-50">
                  <action.icon className="w-6 h-6 text-emerald-600 transition-transform group-hover:rotate-15" />
                </div>
                <h3 className="text-2xl font-bold mb-3 text-slate-800 tracking-tight">{action.title}</h3>
                <p className="text-slate-500 mb-8 leading-relaxed font-medium">{action.desc}</p>
                <Link
                  to={action.link}
                  className="inline-flex items-center gap-2 group/btn bg-slate-800 text-white px-6 py-4 rounded-2xl font-bold text-sm hover:bg-emerald-600 transition-all w-full justify-center shadow-md hover:shadow-emerald-200 active:scale-[0.98]"
                >
                  {action.btnText} 
                  <ArrowRight className="w-4 h-4 transition-transform duration-300 group-hover/btn:translate-x-1.5" />
                </Link>
              </div>
            </div>
          ))}
        </div>

      </div>
    </div>
  );
};

export default Dashboard;