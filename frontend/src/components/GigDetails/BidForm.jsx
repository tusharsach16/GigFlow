import { Leaf, Send } from 'lucide-react';

const BidForm = ({ bidForm, setBidForm, onSubmit, loading }) => (
  <div className="bg-white rounded-[2.5rem] border border-emerald-50 shadow-sm p-8 md:p-10 mb-8">
    <div className="flex items-center gap-3 mb-8">
      <div className="p-3 bg-emerald-50 rounded-2xl">
        <Leaf className="w-6 h-6 text-emerald-600" />
      </div>
      <h2 className="text-2xl font-black text-slate-800">Place Your Bid</h2>
    </div>

    <form onSubmit={onSubmit} className="space-y-6">
      <div className="grid grid-cols-1 gap-6">
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Proposed Message</label>
          <textarea
            value={bidForm.message}
            onChange={(e) => setBidForm({ ...bidForm, message: e.target.value })}
            required
            rows={4}
            className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
            placeholder="Describe your approach..."
          />
        </div>
        <div>
          <label className="block text-sm font-bold text-slate-700 mb-2 ml-1">Proposed Price (₹)</label>
          <div className="relative">
             <span className="absolute left-5 top-1/2 -translate-y-1/2 text-slate-400 font-bold">₹</span>
             <input
                type="number"
                value={bidForm.proposedPrice}
                onChange={(e) => setBidForm({ ...bidForm, proposedPrice: e.target.value })}
                required
                className="w-full pl-10 pr-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                placeholder="Enter amount"
              />
          </div>
        </div>
      </div>
      <button
        type="submit"
        disabled={loading}
        className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-50 flex items-center justify-center gap-2"
      >
        {loading ? 'Submitting...' : <><Send className="w-4 h-4" /> Submit Proposal</>}
      </button>
    </form>
  </div>
);

export default BidForm;