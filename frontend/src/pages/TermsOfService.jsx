import { ShieldCheck, Scale, FileText } from 'lucide-react';

const TermsOfService = () => {
  return (
    <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
      <div className="max-w-3xl mx-auto bg-white p-8 md:p-12 rounded-[2.5rem] border border-emerald-50 shadow-sm relative overflow-hidden">
        {/* Aesthetic Background Icon */}
        <div className="absolute -top-10 -right-10 text-emerald-50/50 transform rotate-12">
          <Scale size={200} />
        </div>

        <div className="relative z-10">
          <div className="flex items-center gap-3 mb-8">
            <div className="p-3 bg-emerald-50 rounded-2xl">
              <ShieldCheck className="w-6 h-6 text-emerald-600" />
            </div>
            <h1 className="text-4xl font-black text-slate-800 tracking-tight">Terms of Service</h1>
          </div>

          <div className="space-y-8 font-medium text-slate-600 leading-relaxed">
            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">01</span>
                Acceptance of Terms
              </h2>
              <p>
                By accessing and using GigFlow, you agree to be bound by these Terms of Service. If you do not agree to these terms, please do not use our platform.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">02</span>
                User Accounts
              </h2>
              <p>
                To use certain features, you must register for an account. You are responsible for maintaining the confidentiality of your account credentials and for all activities that occur under your account.
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">03</span>
                Project & Payments
              </h2>
              <p>
                Clients agree to pay for services rendered by freelancers. GigFlow acts as an intermediary, and payments are subject to our secure escrow process. 
              </p>
            </section>

            <section>
              <h2 className="text-xl font-bold text-slate-800 mb-3 flex items-center gap-2">
                <span className="w-6 h-6 bg-emerald-600 text-white rounded-full flex items-center justify-center text-[10px]">04</span>
                Prohibited Conduct
              </h2>
              <p>
                Users are prohibited from engaging in fraudulent activities, harassment, or bypassing the platform's payment systems.
              </p>
            </section>

            <div className="pt-10 border-t border-emerald-50 text-center">
              <p className="text-sm text-slate-400 italic">
                Last Updated: January 13, 2026
              </p>
              <div className="mt-4 inline-flex items-center gap-2 text-emerald-600 font-bold text-sm">
                <FileText className="w-4 h-4" />
                GigFlow Legal Department
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default TermsOfService;