export default function CareerTipsPage() {
    const articles = [
        {
            title: "Mastering the 'Introduce Yourself' Question",
            description: "This is usually the first question in any interview. Keep it professional and concise. Focus on your relevant education, recent experiences, and key skills that match the role you are applying for, rather than sharing overly personal details.",
            category: "Interview Prep"
        },
        {
            title: "Customer Service vs Telesales vs Telemarketing",
            description: "Customer Service is about helping existing clients and resolving issues. Telesales focuses on closing deals and selling products directly over the phone. Telemarketing is more about generating interest, creating awareness, and gathering leads.",
            category: "Industry Insights"
        },
        {
            title: "Answering: 'Where do you see yourself in the future?'",
            description: "Employers ask this to check your ambition and see if you plan to stay. Express a desire to learn and grow within the industry, take on more responsibilities, and eventually move into a specialized or leadership role.",
            category: "Interview Prep"
        },
        {
            title: "Why Do You Want to Work in This Field?",
            description: "Avoid mentioning that you just want a job. Instead, talk about your enthusiasm for helping people (for customer service), your competitive drive for achieving targets (for sales), or your interest in building professional communication skills.",
            category: "Career Advice"
        },
        {
            title: "Discussing a Hard Situation You Overcame",
            description: "Use the STAR method: Situation (what happened), Task (what you needed to do), Action (how you solved it), and Result (the positive outcome). Always show that you can stay calm under pressure and find logical solutions.",
            category: "Interview Prep"
        },
        {
            title: "How to Discuss Past Experiences",
            description: "When asked about your previous jobs, clearly highlight the responsibilities you handled and the skills you gained. Even if it was an entirely different field, focus on transferable skills like teamwork, problem-solving, and adaptability.",
            category: "Career Advice"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Career <span className="text-gold-400">Tips</span> & Insights</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Real advice, industry secrets, and account descriptions straight from our top recruiters.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {articles.map((article, index) => (
                    <div key={index} className="group bg-slate-900 border border-slate-800 rounded-2xl p-8 hover:border-gold-500/50 transition-all duration-300 shadow-xl">
                        <div className="flex justify-between items-center mb-6">
                            <span className="text-sm font-bold uppercase tracking-wider text-gold-500 bg-gold-500/10 px-4 py-2 rounded-full">{article.category}</span>
                        </div>
                        <h2 className="text-2xl font-bold text-white mb-4">{article.title}</h2>
                        <p className="text-slate-300 text-lg leading-relaxed">
                            {article.description}
                        </p>
                    </div>
                ))}
            </div>
        </div>
    );
}
