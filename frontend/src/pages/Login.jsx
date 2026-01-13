import { useState } from "react";
import { useSelector, useDispatch } from "react-redux";
import { Link, useNavigate, useLocation } from 'react-router-dom';
import { login } from "../store/slices/authSlice";
import { toast } from 'react-toastify';
import { Leaf } from 'lucide-react';

const Login = () => {
    const [formData, setFormData] = useState({ email: '', password: '' });
    const { loading } = useSelector((state) => state.auth);
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const location = useLocation();
    const from = location.state?.from?.pathname || '/dashboard';

    const handleChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            await dispatch(login(formData)).unwrap();
            toast.success('Logged in successfully');
            navigate(from, { replace: true });
        } catch (error) {
            toast.error(error || 'Failed to login');
        }
    }

    return (
        <div className="min-h-[calc(100-64px)] bg-[#f8faf9] flex items-center justify-center py-20 px-4 sm:px-6 lg:px-8 relative overflow-hidden">
            <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-100/40 rounded-full filter blur-3xl opacity-60"></div>
            <div className="absolute bottom-0 left-0 w-64 h-64 bg-emerald-100/30 rounded-full filter blur-3xl opacity-60"></div>

            <div className="max-w-md w-full relative z-10">
                <div className="bg-white rounded-[2.5rem] shadow-xl shadow-emerald-900/5 border border-emerald-50 p-10">
                    <div className="text-center mb-10">
                        <div className="inline-flex items-center justify-center w-16 h-16 bg-emerald-50 rounded-2xl mb-6 transform -rotate-3">
                            <Leaf className="w-8 h-8 text-emerald-600" />
                        </div>
                        <h2 className="text-3xl font-bold text-slate-800 tracking-tight">
                            Welcome Back
                        </h2>
                        <p className="text-slate-500 mt-2 font-medium">
                            Continue your journey with GigFlow
                        </p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                Email Address
                            </label>
                            <input
                                type="email"
                                name="email"
                                value={formData.email}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800 placeholder:text-slate-400"
                                placeholder="name@company.com"
                            />
                        </div>

                        <div>
                            <label className="block text-sm font-semibold text-slate-700 mb-2 ml-1">
                                Password
                            </label>
                            <input
                                type="password"
                                name="password"
                                value={formData.password}
                                onChange={handleChange}
                                required
                                className="w-full px-5 py-3 bg-slate-50 border border-slate-100 rounded-2xl focus:outline-none focus:ring-2 focus:ring-emerald-500/20 focus:border-emerald-500 transition-all text-slate-800"
                                placeholder="••••••••"
                            />
                        </div>

                        <button
                            type="submit"
                            disabled={loading}
                            className="w-full bg-emerald-600 text-white py-4 rounded-2xl font-bold hover:bg-emerald-700 shadow-lg shadow-emerald-100 transition-all active:scale-[0.98] disabled:opacity-70 mt-4"
                        >
                            {loading ? (
                                <span className="flex items-center justify-center gap-2">
                                    <div className="w-4 h-4 border-2 border-white/30 border-t-white rounded-full animate-spin" />
                                    Signing in...
                                </span>
                            ) : 'Sign In'}
                        </button>
                    </form>

                    <div className="mt-8 text-center">
                        <p className="text-slate-500 font-medium">
                            Don't have an account?{' '}
                            <Link
                                to="/register"
                                className="text-emerald-600 font-bold hover:text-emerald-700 transition-colors"
                            >
                                Sign up for free
                            </Link>
                        </p>
                    </div>
                </div>
            </div>
        </div>
    );
};

export default Login;
