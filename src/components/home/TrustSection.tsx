"use client";

import { useState, useEffect } from "react";
import AnimatedCounter from "@/components/ui/AnimatedCounter";

export default function TrustSection() {
    const [candidatesCount, setCandidatesCount] = useState(4000);

    useEffect(() => {
        const baseDate = new Date('2026-03-03T00:00:00Z').getTime();
        const now = Date.now();
        const daysPassed = Math.max(0, Math.floor((now - baseDate) / (1000 * 60 * 60 * 24)));
        setCandidatesCount(4000 + (daysPassed * 2));
    }, []);

    return (
        <section className="py-20 bg-slate-900 border-y border-slate-800">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-3 gap-8 mb-16">
                    <AnimatedCounter end={5} suffix="+" label="Years in Recruitment" duration={2} />
                    <AnimatedCounter end={38} suffix="+" label="Companies We Deal With" duration={2.5} />
                    <AnimatedCounter end={candidatesCount} suffix="+" label="Candidates Placed" duration={3} />
                </div>
            </div>
        </section>
    );
}
