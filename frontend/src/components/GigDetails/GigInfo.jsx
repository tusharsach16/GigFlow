import { Briefcase, IndianRupee, User } from 'lucide-react';

const GigInfo = ({ gig }) => (
  <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-8 md:p-10 mb-8 relative">
    <div className="absolute top-0 right-0 p-8">
      <span className={`px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-widest ${
        gig.status === 'open' ? 'bg-emerald-50 text-emerald-700' : 'bg-slate-100 text-slate-600'
      }`}>
        {gig.status}
      </span>
    </div>

    <div className="flex items-center gap-3 mb-6">
      <div className="p-3 bg-emerald-50 rounded-2xl">
        <Briefcase className="w-6 h-6 text-emerald-600" />
      </div>
      <p className="text-sm font-bold text-emerald-600 uppercase tracking-widest">Project Details</p>
    </div>

    <h1 className="text-4xl font-black text-slate-800 mb-6 leading-tight">{gig.title}</h1>
    
    <div className="grid grid-cols-1 md:grid-cols-2 gap-6 mb-8 border-y border-emerald-50 py-8">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
          <IndianRupee className="text-xl font-bold text-emerald-600" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Project Budget</p>
          <p className="text-lg font-black text-slate-800">{gig.budget.toLocaleString('en-IN')}</p>
        </div>
      </div>
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-slate-50 rounded-2xl flex items-center justify-center">
          <User className="w-5 h-5 text-emerald-600" />
        </div>
        <div>
          <p className="text-[10px] text-slate-400 font-bold uppercase tracking-wider">Posted By</p>
          <p className="text-lg font-bold text-slate-800">{gig.ownerId?.name}</p>
        </div>
      </div>
    </div>

    <h3 className="text-lg font-bold text-slate-800 mb-4">Description</h3>
    <p className="text-slate-500 leading-relaxed font-medium whitespace-pre-wrap">{gig.description}</p>
  </div>
);

export default GigInfo;