import Link from 'next/link';

export default function Navbar() {
    return (
        <nav className="w-full border-b border-slate-800 bg-slate-900/80 backdrop-blur-md sticky top-0 z-50">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="flex justify-between items-center h-20">
                    <div className="flex-shrink-0 flex items-center">
                        <Link href="/" className="text-2xl font-bold tracking-tight">
                            Y-<span className="text-gold-400">Talenteer</span>
                        </Link>
                    </div>
                    <div className="hidden md:flex items-center space-x-8">
                        <Link href="/" className="text-slate-300 hover:text-gold-400 transition-colors">Home</Link>
                        <Link href="/about" className="text-slate-300 hover:text-gold-400 transition-colors">About Us</Link>
                        <Link href="/companies" className="text-slate-300 hover:text-gold-400 transition-colors">Companies Hiring</Link>
                        <Link href="/career-tips" className="text-slate-300 hover:text-gold-400 transition-colors">Career Tips</Link>
                        <div className="flex space-x-4">
                            <Link href="/apply/candidate" className="px-5 py-2.5 rounded-full bg-slate-800 border border-slate-700 text-white hover:bg-slate-700 transition ml-4">
                                Find a Job
                            </Link>
                            <Link href="/apply/company" className="px-5 py-2.5 rounded-full bg-gradient-to-r from-gold-500 to-gold-600 text-slate-900 font-semibold hover:opacity-90 transition">
                                Hire Talent
                            </Link>
                        </div>
                    </div>
                </div>
            </div>
        </nav>
    );
}
