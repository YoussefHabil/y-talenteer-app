"use client";

import { useEffect, useState } from "react";
import { motion, useAnimation } from "framer-motion";
import { useInView } from "react-intersection-observer";

interface AnimatedCounterProps {
    end: number;
    duration?: number;
    suffix?: string;
    label: string;
}

export default function AnimatedCounter({ end, duration = 2, suffix = "", label }: AnimatedCounterProps) {
    const [count, setCount] = useState(0);
    const controls = useAnimation();
    const [ref, inView] = useInView({
        triggerOnce: true,
        threshold: 0.1,
    });

    useEffect(() => {
        if (inView) {
            let startTime: number | null = null;
            const step = (timestamp: number) => {
                if (!startTime) startTime = timestamp;
                const progress = Math.min((timestamp - startTime) / (duration * 1000), 1);

                // Easing function (easeOutQuart)
                const easeProgress = 1 - Math.pow(1 - progress, 4);

                setCount(Math.floor(easeProgress * end));

                if (progress < 1) {
                    window.requestAnimationFrame(step);
                }
            };
            window.requestAnimationFrame(step);
        }
    }, [inView, end, duration]);

    return (
        <div ref={ref} className="flex flex-col items-center justify-center p-6 bg-slate-800/50 rounded-2xl border border-slate-700 hover:border-gold-500/50 transition-colors">
            <motion.div
                initial={{ opacity: 0, y: 20 }}
                animate={inView ? { opacity: 1, y: 0 } : {}}
                transition={{ duration: 0.5 }}
                className="text-4xl md:text-5xl font-bold text-gold-400 mb-2"
            >
                {count}{suffix}
            </motion.div>
            <div className="text-slate-300 font-medium text-center">{label}</div>
        </div>
    );
}
