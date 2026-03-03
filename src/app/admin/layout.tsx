"use client";

import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { supabase } from '@/lib/supabase';
import {
    BarChart3,
    Users,
    Briefcase,
    Building2,
    LogOut,
    Settings
} from 'lucide-react';

export default function AdminLayout({
    children,
}: {
    children: React.ReactNode
}) {
    const pathname = usePathname();
    const router = useRouter();

    if (pathname === '/admin/login') {
        return <>{children}</>;
    }

    const handleLogout = async () => {
        await supabase.auth.signOut();
        router.push('/admin/login');
        router.refresh();
    };

    const navItems = [
        { label: 'Overview', href: '/admin', icon: BarChart3 },
        { label: 'Candidates', href: '/admin/candidates', icon: Users },
        { label: 'Recruiters', href: '/admin/recruiters', icon: Briefcase },
        { label: 'Company Requests', href: '/admin/companies', icon: Building2 },
        { label: 'Settings', href: '/admin/settings', icon: Settings },
    ];

    return (
        <div className="min-h-screen bg-slate-950 flex flex-col md:flex-row">
            {/* Sidebar */}
            <aside className="w-full md:w-64 bg-slate-900 border-b md:border-b-0 md:border-r border-slate-800 flex-shrink-0">
                <div className="h-20 flex items-center px-6 border-b border-slate-800">
                    <Link href="/" className="text-xl font-bold tracking-tight">
                        Y-<span className="text-gold-400">Talenteer</span> Admin
                    </Link>
                </div>

                <nav className="p-4 space-y-2">
                    {navItems.map((item) => {
                        const isActive = pathname === item.href;
                        return (
                            <Link
                                key={item.href}
                                href={item.href}
                                className={`flex items-center space-x-3 px-4 py-3 rounded-xl transition-colors ${isActive
                                        ? 'bg-gold-500/10 text-gold-400 font-semibold'
                                        : 'text-slate-400 hover:text-white hover:bg-slate-800'
                                    }`}
                            >
                                <item.icon className="w-5 h-5" />
                                <span>{item.label}</span>
                            </Link>
                        );
                    })}

                    <button
                        onClick={handleLogout}
                        className="w-full flex items-center space-x-3 px-4 py-3 rounded-xl text-red-400 hover:text-red-300 hover:bg-red-500/10 transition-colors mt-8"
                    >
                        <LogOut className="w-5 h-5" />
                        <span>Sign Out</span>
                    </button>
                </nav>
            </aside>

            {/* Main Content */}
            <main className="flex-1 overflow-y-auto">
                <div className="p-8">
                    {children}
                </div>
            </main>
        </div>
    );
}
