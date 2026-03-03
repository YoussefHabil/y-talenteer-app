export default function AboutPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <h1 className="text-4xl md:text-5xl font-bold mb-8 text-center">About <span className="text-gold-400">Y-Talenteer</span></h1>

            <div className="prose prose-invert prose-lg max-w-none text-slate-300">
                <p className="lead text-2xl text-slate-200 mb-8 text-center font-medium">
                    With over 5 years in the recruitment industry, we have redefined how companies find elite talent in Egypt.
                </p>

                <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 mb-12 shadow-2xl">
                    <h2 className="text-2xl text-white font-bold mb-6 flex items-center">
                        <span className="text-gold-400 mr-3">✦</span> Our Specialization
                    </h2>
                    <p className="mb-6">
                        We are the premier destination for call center and bilingual recruitment. From entry-level customer service representatives to high-level managerial and team leader roles, we understand the nuances of the BPO sector inside out.
                    </p>
                    <p>
                        Operating from the heart of Egypt, our vast database and rigorous screening process ensure that when a company comes to us with a hiring need, we don't just send CVs—we send future leaders.
                    </p>
                </div>

                <div className="grid md:grid-cols-2 gap-8 mb-12">
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-gold-400 mb-4">For Candidates</h3>
                        <p className="text-sm">We provide completely free placement services. Our English assessments and interview coaching ensure you walk into your next opportunity fully prepared and confident. Your career growth is our success.</p>
                    </div>
                    <div className="bg-slate-900 border border-slate-800 rounded-2xl p-8">
                        <h3 className="text-xl font-bold text-gold-400 mb-4">For Companies</h3>
                        <p className="text-sm">We understand that high turnover is the enemy of the BPO industry. We focus on cultural fit, behavioral assessment, and language proficiency to drastically increase retention rates for our 38+ active clients.</p>
                    </div>
                </div>
            </div>
        </div>
    );
}
