"use client";

import Link from "next/link";
import { motion } from "framer-motion";

export default function Hero() {
    return (
        <section className="relative pt-32 pb-20 lg:pt-48 lg:pb-32 overflow-hidden">
            <div className="absolute inset-0 z-0">
                <div className="absolute inset-0 bg-gradient-to-b from-slate-900/50 via-slate-900 to-slate-950 z-10" />
                <div className="absolute top-0 right-0 -mr-40 -mt-40 w-96 h-96 rounded-full bg-gold-600/20 blur-3xl" />
                <div className="absolute bottom-0 left-0 -ml-40 -mb-40 w-96 h-96 rounded-full bg-blue-600/10 blur-3xl" />
            </div>

            <div className="relative z-10 max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 text-center">
                <motion.h1
                    className="text-5xl md:text-7xl font-extrabold tracking-tight mb-8"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6 }}
                >
                    Elevating <span className="text-transparent bg-clip-text bg-gradient-to-r from-gold-400 to-gold-600">Talent</span>,<br className="hidden md:block" />
                    Empowering Business.
                </motion.h1>

                <motion.p
                    className="mt-6 max-w-2xl mx-auto text-xl text-slate-300 mb-10"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.2 }}
                >
                    Egypt&apos;s premier recruitment agency specializing in bilingual and call center professionals. We bridge the gap between world-class companies and elite candidates.
                </motion.p>

                <motion.div
                    className="flex flex-col sm:flex-row justify-center gap-4"
                    initial={{ opacity: 0, y: 20 }}
                    animate={{ opacity: 1, y: 0 }}
                    transition={{ duration: 0.6, delay: 0.4 }}
                >
                    <Link href="/companies" className="px-8 py-4 rounded-full bg-slate-800 border border-slate-700 text-white font-semibold hover:bg-slate-700 hover:border-slate-600 transition shadow-lg hover:shadow-xl">
                        Find Your Dream Job
                    </Link>
                    <Link href="/apply/company" className="px-8 py-4 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold hover:opacity-90 transition shadow-lg hover:shadow-gold-500/20">
                        Hire Top Tier Agents
                    </Link>
                </motion.div>
            </div>
        </section>
    );
}
