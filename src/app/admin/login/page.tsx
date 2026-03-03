"use client";

import { useState } from 'react';
import { supabase } from '@/lib/supabase';
import { useRouter } from 'next/navigation';

export default function AdminLogin() {
    const [email, setEmail] = useState('');
    const [password, setPassword] = useState('');
    const [error, setError] = useState('');
    const [loading, setLoading] = useState(false);
    const router = useRouter();

    const handleLogin = async (e: React.FormEvent) => {
        e.preventDefault();
        setLoading(true);
        setError('');

        const { error } = await supabase.auth.signInWithPassword({
            email,
            password,
        });

        if (error) {
            setError(error.message);
            setLoading(false);
        } else {
            router.push('/admin');
            router.refresh();
        }
    };

    return (
        <div className="min-h-screen flex items-center justify-center bg-slate-950 px-4">
            <div className="max-w-md w-full bg-slate-900 border border-slate-800 rounded-3xl p-8 shadow-2xl">
                <div className="text-center mb-8">
                    <h1 className="text-3xl font-bold text-white mb-2">Admin <span className="text-gold-400">Portal</span></h1>
                    <p className="text-slate-400">Sign in to manage applications and requests.</p>
                </div>

                {error && <div className="p-4 bg-red-500/10 text-red-500 rounded-xl mb-6">{error}</div>}

                <form onSubmit={handleLogin} className="space-y-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email</label>
                        <input required type="email" value={email} onChange={e => setEmail(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Password</label>
                        <input required type="password" value={password} onChange={e => setPassword(e.target.value)} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>

                    <button disabled={loading} type="submit" className="w-full px-6 py-4 rounded-xl bg-gold-500 text-slate-950 font-bold hover:bg-gold-400 transition-colors">
                        {loading ? "Authenticating..." : "Sign In"}
                    </button>
                </form>
            </div>
        </div>
    );
}
