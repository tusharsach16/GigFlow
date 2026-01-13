import { CheckCircle2 } from 'lucide-react';

const BidItem = ({ bid, onHire, canHire, loading }) => (
  <div className="group bg-slate-50/50 border border-slate-100 rounded-3xl p-6 transition-all hover:bg-white hover:border-emerald-100 hover:shadow-xl hover:shadow-emerald-900/5">
    <div className="flex flex-col md:flex-row justify-between items-start md:items-center gap-4 mb-4">
      <div className="flex items-center gap-4">
        <div className="w-12 h-12 bg-white rounded-2xl flex items-center justify-center font-black text-emerald-600 shadow-sm border border-emerald-50">
          {bid.freelancerId?.name?.[0].toUpperCase()}
        </div>
        <div>
          <p className="font-black text-slate-800">{bid.freelancerId?.name}</p>
          <p className="text-xs text-slate-400 font-bold uppercase tracking-tighter">{bid.freelancerId?.email.toLowerCase()}</p>
        </div>
      </div>
      <span className={`px-4 py-1.5 rounded-full text-[10px] font-black uppercase tracking-widest ${
        bid.status === 'hired' ? 'bg-emerald-600 text-white' : 'bg-amber-50 text-amber-600'
      }`}>
        {bid.status}
      </span>
    </div>
    
    <p className="text-slate-500 text-sm font-medium mb-6 leading-relaxed bg-white/50 p-4 rounded-2xl border border-slate-50">
      {bid.message}
    </p>
    
    <div className="flex items-center justify-between pt-4 border-t border-slate-100">
      <p className="text-lg font-black text-slate-800">
        <span className="text-xs font-bold text-slate-400 mr-1">₹</span>
        {bid.proposedPrice.toLocaleString('en-IN')}
      </p>
      
      {canHire && bid.status === 'pending' && (
        <button
          onClick={() => onHire(bid._id)}
          disabled={loading}
          className="flex items-center gap-2 bg-emerald-600 text-white px-6 py-2.5 rounded-xl font-bold text-sm hover:bg-emerald-700 transition-all shadow-md shadow-emerald-100"
        >
          <CheckCircle2 className="w-4 h-4" />
          Hire Now
        </button>
      )}
    </div>
  </div>
);

export default BidItem;