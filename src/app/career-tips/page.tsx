export default function CareerTipsPage() {
    const articles = [
        {
            title: "Understanding B2 vs C1 English Levels",
            description: "In call centers, B2 means you can comfortably handle a conversation, understand the main points, and express yourself clearly. C1 means you have near-native fluency, can handle complex objections, and understand nuances and idioms. Practice speaking naturally rather than memorizing scripts.",
            category: "Language Skills"
        },
        {
            title: "What is a US Housing Account?",
            description: "A housing account typically involves booking hotel rooms and accommodations for exhibitors or attendees of tradeshows and conferences in the US. You will need strong attention to detail, good geographical awareness, and excellent customer service skills to manage reservations.",
            category: "Account Knowledge"
        },
        {
            title: "Telesales vs Customer Service",
            description: "Telesales focuses on outbound or inbound calls where the primary goal is selling a product or service, often with commission-based incentives (KPIs). Customer Service focuses on resolving issues, answering inquiries, and ensuring client satisfaction with a focus on metrics like Average Handling Time (AHT) and Quality.",
            category: "Industry Insights"
        },
        {
            title: "How to Ace the Phone Screening",
            description: "Make sure you are in a quiet room with strong internet. Speak clearly, don't rush, and actively listen. Smile while you speak—it actually changes your tone of voice and makes you sound more energetic and approachable.",
            category: "Interview Prep"
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
