import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
    // Mock data fetching based on ID
    const companyId = params.id;

    if (companyId !== "att" && companyId !== "ttc" && companyId !== "creative-basket") {
        // Only mock valid active pages for now
        notFound();
    }

    const jobs = [
        {
            id: "j1",
            title: "Bilingual Customer Support Representative",
            salary: "15,000 - 18,000 EGP",
            shift: "Rotational (Night Shifts Included)",
            requirements: ["Fluent C1 English", "Graduates Only", "0-1 Years Experience"],
        },
        {
            id: "j2",
            title: "Tech Support Specialist",
            salary: "18,000 - 22,000 EGP",
            shift: "Fixed Morning Shift",
            requirements: ["Fluent B2/C1 English", "Computer Science Degree", "1+ Years Experience"],
        }
    ];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Link href="/companies" className="text-gold-400 hover:text-gold-300 mb-8 inline-block transition-colors font-medium">
                ← Back to Companies
            </Link>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 mb-12">
                <div className="flex items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl font-bold text-gold-400">
                        {companyId.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 uppercase">{companyId.replace("-", " ")}</h1>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            Actively Hiring
                        </span>
                    </div>
                </div>
                <p className="text-xl text-slate-400 max-w-3xl">
                    Join one of the most prestigious accounts and elevate your career. We are currently recruiting for multiple roles within this organization.
                </p>
            </div>

            <h2 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-8 h-1 bg-gold-500 mr-4 rounded-full"></span>
                Open Positions (2)
            </h2>

            <div className="space-y-6">
                {jobs.map((job) => (
                    <div key={job.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                            <div className="flex-grow">
                                <h3 className="text-xl font-bold text-gold-400 mb-4">{job.title}</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 mb-6">
                                    <div>
                                        <span className="block text-sm text-slate-500 mb-1">Salary Range</span>
                                        <span className="font-semibold text-slate-200">{job.salary}</span>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-slate-500 mb-1">Shift Type</span>
                                        <span className="font-semibold text-slate-200">{job.shift}</span>
                                    </div>
                                </div>

                                <div>
                                    <span className="block text-sm text-slate-500 mb-2">Requirements:</span>
                                    <ul className="list-disc list-inside text-slate-300 space-y-1">
                                        {job.requirements.map((req, i) => <li key={i}>{req}</li>)}
                                    </ul>
                                </div>
                            </div>

                            <div className="md:ml-auto md:w-48 flex-shrink-0">
                                <Link href={`/apply/candidate?company=${companyId}&role=${encodeURIComponent(job.title)}`} className="block w-full text-center px-6 py-3 rounded-xl bg-gold-500 text-slate-950 font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20">
                                    Apply for this Role
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
