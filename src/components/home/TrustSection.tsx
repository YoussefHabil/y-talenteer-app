import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function TrustSection() {
    return (
        <section className="py-20 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <AnimatedCounter end={7} suffix="+" label="Years in Recruitment" duration={2} />
                    <AnimatedCounter end={38} suffix="+" label="Companies We Deal With" duration={2.5} />
                    <AnimatedCounter end={8000} suffix="+" label="Candidates Placed" duration={3} />
                </div>

            </div>
        </section>
    );
}
