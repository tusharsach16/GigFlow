const PrivacyPolicy = () => {
    return (
      <div className="min-h-screen bg-[#f8faf9] py-20 px-4">
        <div className="max-w-3xl mx-auto bg-white p-10 rounded-[2.5rem] border border-emerald-50 shadow-sm">
          <h1 className="text-3xl font-black text-slate-800 mb-6">Privacy Policy</h1>
          <div className="prose prose-slate font-medium text-slate-600 space-y-4">
            <p>Welcome to GigFlow. We value your privacy and are committed to protecting your personal data.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-8">1. Data We Collect</h2>
            <p>We collect your name, email, and project details to provide our services.</p>
            <h2 className="text-xl font-bold text-slate-800 mt-8">2. How We Use Data</h2>
            <p>Your data is used to connect freelancers with clients and process secure payments.</p>
            <p className="mt-8 text-sm text-slate-400 italic font-normal text-center">Last Updated: January 2026</p>
          </div>
        </div>
      </div>
    );
  };
  
  export default PrivacyPolicy;