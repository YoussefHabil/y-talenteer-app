import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function TrustSection() {
    return (
        <section className="py-20 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <AnimatedCounter end={7} suffix="+" label="Years in Recruitment" duration={2} />
                    <AnimatedCounter end={38} suffix="+" label="Active Client Companies" duration={2.5} />
                    <AnimatedCounter end={1000} suffix="+" label="Candidates Placed" duration={3} />
                </div>

                <div className="text-center mt-20">
                    <p className="text-sm font-semibold text-gold-500 tracking-wider uppercase mb-8">Trusted By Industry Leaders</p>
                    <div className="flex flex-wrap justify-center items-center gap-12 opacity-50 grayscale hover:grayscale-0 transition-all duration-500">
                        {/* Logos placeholders (Replace with actual eventually) */}
                        <div className="text-2xl font-bold font-serif">AT&T</div>
                        <div className="text-2xl font-bold tracking-widest">TTC</div>
                        <div className="text-2xl font-black italic">Creative Basket</div>
                        <div className="text-2xl font-bold tracking-tight">EHP</div>
                        <div className="text-2xl font-light">Evolve Marketing</div>
                    </div>
                </div>
            </div>
        </section>
    );
}
