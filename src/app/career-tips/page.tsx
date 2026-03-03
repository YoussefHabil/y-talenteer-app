export default function CareerTipsPage() {
    const articles = [
        {
            title: "How to Ace the B2 English Assessment in Call Centers",
            description: "A comprehensive guide to passing grammar and conversational English checks during your phone screening.",
            date: "Oct 12, 2026",
            category: "Interview Prep"
        },
        {
            title: "Top 5 Mistakes Call Center Applicants Make",
            description: "Avoid these common pitfalls that cost candidates their dream jobs even when their English is flawless.",
            date: "Sep 28, 2026",
            category: "Career Advice"
        },
        {
            title: "The Difference Between CS and Tech Support Roles",
            description: "Understanding the different KPIs, responsibilities, and salary expectations between these two main paths.",
            date: "Sep 15, 2026",
            category: "Industry Insights"
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Career <span className="text-gold-400">Tips</span> & Blog</h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Insights, advice, and industry secrets straight from our top recruiters.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {articles.map((article, index) => (
                    <div key={index} className="group bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden hover:border-gold-500/50 transition-all duration-300">
                        {/* Image Placeholder */}
                        <div className="h-48 bg-slate-800 w-full relative overflow-hidden flex items-center justify-center">
                            <span className="text-gold-400/20 text-6xl font-serif italic">Y-T</span>
                            <div className="absolute inset-0 bg-gradient-to-t from-slate-900 to-transparent"></div>
                        </div>

                        <div className="p-8">
                            <div className="flex justify-between items-center mb-4">
                                <span className="text-xs font-bold uppercase tracking-wider text-gold-500">{article.category}</span>
                                <span className="text-xs text-slate-500">{article.date}</span>
                            </div>
                            <h2 className="text-xl font-bold text-white mb-4 group-hover:text-gold-400 transition-colors">{article.title}</h2>
                            <p className="text-slate-400 mb-6 line-clamp-3">
                                {article.description}
                            </p>
                            <button className="text-slate-300 font-medium hover:text-white transition-colors flex items-center">
                                Read Article <span className="ml-2 group-hover:translate-x-1 transition-transform">→</span>
                            </button>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
