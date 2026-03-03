"use client";

import { useState } from 'react';

interface Props {
    initialStatus: string;
    tab: string;
    rowIndex: number;
    statusColumn: string;
    options: string[];
}

export default function StatusSelect({ initialStatus, tab, rowIndex, statusColumn, options }: Props) {
    const [status, setStatus] = useState(initialStatus || 'New');
    const [loading, setLoading] = useState(false);

    const handleChange = async (e: React.ChangeEvent<HTMLSelectElement>) => {
        const newStatus = e.target.value;
        setStatus(newStatus);
        setLoading(true);

        try {
            await fetch('/api/admin/update-status', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ tab, rowIndex, newStatus, statusColumn })
            });
        } catch (err) {
            console.error(err);
            setStatus(initialStatus); // revert on error
        } finally {
            setLoading(false);
        }
    };

    const statusColors: Record<string, string> = {
        'Applied': 'bg-slate-800 text-slate-300',
        'New Application': 'bg-slate-800 text-slate-300',
        'New Request': 'bg-slate-800 text-slate-300',

        'Interview Scheduled': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',
        'In Progress': 'bg-blue-500/20 text-blue-400 border border-blue-500/30',

        'Accepted': 'bg-green-500/20 text-green-400 border border-green-500/30',
        'Placed': 'bg-gold-500/20 text-gold-400 border border-gold-500/30',
        'Fulfilled': 'bg-gold-500/20 text-gold-400 border border-gold-500/30',

        'Rejected': 'bg-red-500/20 text-red-400 border border-red-500/30',
    };

    return (
        <div className="relative inline-block w-40">
            <select
                value={status}
                onChange={handleChange}
                disabled={loading}
                className={`w-full appearance-none rounded-lg px-3 py-1.5 text-xs font-semibold focus:outline-none transition-colors cursor-pointer ${statusColors[status] || 'bg-slate-800 text-white'}`}
            >
                {options.map(opt => (
                    <option key={opt} value={opt} className="bg-slate-900 text-white p-2">
                        {opt}
                    </option>
                ))}
            </select>
            {loading && <span className="absolute right-[-20px] top-[10px] w-3 h-3 border-2 border-gold-500 border-t-transparent rounded-full animate-spin"></span>}
        </div>
    );
}
