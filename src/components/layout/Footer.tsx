import Link from 'next/link';

export default function Footer() {
    return (
        <footer className="bg-slate-950 border-t border-slate-900 py-12 mt-auto">
            <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                <div className="grid grid-cols-1 md:grid-cols-4 gap-8">
                    <div className="col-span-1 md:col-span-2">
                        <Link href="/" className="text-2xl font-bold tracking-tight inline-block mb-4">
                            Y-<span className="text-gold-400">Talenteer</span>
                        </Link>
                        <p className="text-slate-400 max-w-sm mb-6">
                            Connecting top talent with industry-leading companies. Specialized in call center and bilingual recruitment in Egypt.
                        </p>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Candidates</h3>
                        <ul className="space-y-3">
                            <li><Link href="/companies" className="text-slate-400 hover:text-gold-400 transition">View Open Jobs</Link></li>
                            <li><Link href="/apply/candidate" className="text-slate-400 hover:text-gold-400 transition">Apply Now</Link></li>
                            <li><Link href="/career-tips" className="text-slate-400 hover:text-gold-400 transition">Career Tips</Link></li>
                        </ul>
                    </div>

                    <div>
                        <h3 className="text-lg font-semibold mb-4 text-white">Companies</h3>
                        <ul className="space-y-3">
                            <li><Link href="/apply/company" className="text-slate-400 hover:text-gold-400 transition">Hire Talent</Link></li>
                            <li><Link href="/about" className="text-slate-400 hover:text-gold-400 transition">About Us</Link></li>
                            <li><Link href="/contact" className="text-slate-400 hover:text-gold-400 transition">Contact Us</Link></li>
                        </ul>
                    </div>
                </div>

                <div className="border-t border-slate-800 mt-12 pt-8 flex flex-col md:flex-row justify-between items-center">
                    <p className="text-slate-500 text-sm">
                        © {new Date().getFullYear()} Y-Talenteer. All rights reserved.
                    </p>
                    <div className="flex space-x-6 mt-4 md:mt-0">
                        <Link href="/privacy" className="text-slate-500 hover:text-white text-sm transition">Privacy Policy</Link>
                        <Link href="/terms" className="text-slate-500 hover:text-white text-sm transition">Terms of Service</Link>
                    </div>
                </div>
            </div>
        </footer>
    );
}
