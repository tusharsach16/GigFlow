import { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { createGig } from '../store/slices/gigSlice';
import { toast } from 'react-toastify';
import { Leaf, PlusCircle, AlignLeft, IndianRupee, Send } from 'lucide-react';

const CreateGig = () => {
  const [formData, setFormData] = useState({ title: '', description: '', budget: '' });
  const { loading } = useSelector((state) => state.gig);
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const result = await dispatch(createGig(formData)).unwrap();
      toast.success('Gig created successfully!');
      navigate(`/gigs/${result.gig._id || result.data._id}`);
    } catch (error) {
      toast.error(error);
    }
  };

  return (
    <div className="min-h-screen bg-[#f8faf9] py-12 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
      {/* Background Accents */}
      <div className="absolute top-0 right-0 w-96 h-96 bg-emerald-100/40 rounded-full filter blur-3xl opacity-60"></div>
      <div className="absolute bottom-0 left-0 w-96 h-96 bg-emerald-100/30 rounded-full filter blur-3xl opacity-60"></div>

      <div className="max-w-2xl mx-auto relative z-10">
        <div className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 p-8 md:p-12">
          
          <div className="text-center mb-10">
            <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-6 transform -rotate-3 transition-transform hover:rotate-0">
              <PlusCircle className="w-8 h-8 text-emerald-600" />
            </div>
            <h1 className="text-3xl font-bold text-slate-800 tracking-tight">Post a New Gig</h1>
            <p className="text-slate-500 mt-2 font-medium">Describe your project and find the perfect talent</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2 ml-1">
                <Leaf className="w-4 h-4 text-emerald-600" />
                Project Title
              </label>
              <input
                type="text"
                name="title"
                value={formData.title}
                onChange={handleChange}
                required
                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
                placeholder="e.g., Build a Modern Portfolio Website"
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2 ml-1">
                <AlignLeft className="w-4 h-4 text-emerald-600" />
                Detailed Description
              </label>
              <textarea
                name="description"
                value={formData.description}
                onChange={handleChange}
                required
                rows={6}
                className="w-full px-5 py-4 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400 resize-none"
                placeholder="Explain what you need, specific skills required, and the project timeline..."
              />
            </div>

            <div>
              <label className="flex items-center gap-2 text-sm font-semibold text-slate-700 mb-2 ml-1">
                <IndianRupee className="w-4 h-4 text-emerald-600" />
                Budget (INR)
              </label>
              <div className="relative">
                <input
                  type="number"
                  name="budget"
                  value={formData.budget}
                  onChange={handleChange}
                  required
                  min="0"
                  className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
                  placeholder="0.00"
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={loading}
              className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-70 mt-4 flex items-center justify-center gap-2"
            >
              {loading ? (
                <div className="w-5 h-5 border-2 border-white/30 border-t-white rounded-full animate-spin" />
              ) : (
                <>
                  <Send className="w-5 h-5" />
                  Publish Project
                </>
              )}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default CreateGig;