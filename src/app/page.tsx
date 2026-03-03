import Hero from "@/components/home/Hero";
import TrustSection from "@/components/home/TrustSection";

export default function Home() {
    return (
        <div className="flex flex-col w-full">
            <Hero />
            <TrustSection />

            {/* Testimonials and Features can go here */}
            <section className="py-24 bg-slate-950">
                <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                    <h2 className="text-3xl md:text-5xl font-bold mb-6">Why Choose <span className="text-gold-400">Y-Talenteer</span>?</h2>
                    <p className="text-slate-400 max-w-2xl mx-auto mb-16 text-lg">
                        We don't just match resumes to job descriptions. We match ambition with opportunity.
                    </p>
                    <div className="grid grid-cols-1 md:grid-cols-3 gap-8 text-left">
                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                            <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-6">
                                <span className="text-gold-400 text-2xl">🎯</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Call Center Specialists</h3>
                            <p className="text-slate-400">Deep expertise in placing elite bilingual agents and managers for the most demanding accounts.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                            <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-6">
                                <span className="text-gold-400 text-2xl">⚡</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Rapid Placements</h3>
                            <p className="text-slate-400">Our extensive dynamic database allows us to fulfill hiring requests faster than traditional agencies.</p>
                        </div>
                        <div className="p-8 rounded-2xl bg-slate-900 border border-slate-800">
                            <div className="w-12 h-12 rounded-lg bg-gold-500/10 flex items-center justify-center mb-6">
                                <span className="text-gold-400 text-2xl">🤝</span>
                            </div>
                            <h3 className="text-xl font-bold text-white mb-3">Quality Guaranteed</h3>
                            <p className="text-slate-400">Every candidate undergoes rigorous English level assessments and behavioral screening.</p>
                        </div>
                    </div>
                </div>
            </section>
        </div>
    );
}
