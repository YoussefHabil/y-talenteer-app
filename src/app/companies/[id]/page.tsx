import Link from 'next/link';
import { notFound } from 'next/navigation';

export default function CompanyDetailPage({ params }: { params: { id: string } }) {
    const companyId = params.id;

    if (companyId !== "ttc" && companyId !== "creative-basket" && companyId !== "att") {
        notFound();
    }

    const companyDetails: any = {
        "ttc": {
            name: "TTC",
            description: "TTC is looking for Telesales Agents Needed for a US Account! Many accounts are available (decided through the first day of training).",
            jobs: [
                {
                    id: "ttc-1",
                    title: "Telesales Agent (US Account)",
                    salary: "12,000 EGP Net + Commissions start from 2k + 1k KPIs",
                    shift: "3 PM – 11 PM (Fixed weekends off: Sat & Sun)",
                    requirements: [
                        "Fluent in English (B2+ or C1)",
                        "Graduates, undergraduates, dropouts, gap year",
                        "No prior experience needed - we'll train you!",
                        "Min age 18, Max age 28",
                        "Egyptians only (No foreigners for now)"
                    ],
                    benefits: [
                        "5 Days Paid Training",
                        "Transportation (Door-to-door for females, nearest points for males)",
                        "Friendly and collaborative team environment",
                        "Only 7 working hours a day",
                        "Location: Makram Ebid, Nasr City"
                    ]
                }
            ]
        },
        "creative-basket": {
            name: "Creative Basket",
            description: "Creative Basket is hiring Telesales Agents for a US Housing account. Booking hotel rooms for exhibitors attending different tradeshows.",
            jobs: [
                {
                    id: "cb-1",
                    title: "Telesales Agent (Housing Experience MUST)",
                    salary: "15k+ (negotiable) + 2k KPIs + unlimited commissions",
                    shift: "US working hours: 3 PM to 12 AM",
                    requirements: [
                        "B2 English level is a must",
                        "Preferably grads only or undergrads without commitments",
                        "Housing experience/Telesales Experience (minimum 6 months) is a MUST",
                        "Min age 20, Max age 32",
                        "Foreigners are not preferred"
                    ],
                    benefits: [
                        "Transportation allowance: 1k for males, 1.3k for females",
                        "Weekly and monthly spiffs/bonuses",
                        "Fully paid training",
                        "Medical and social insurance after probation",
                        "2 fixed days off (Saturdays and Sundays)",
                        "Location: Nasr City - Makram"
                    ]
                },
                {
                    id: "cb-2",
                    title: "Telesales Agent (Telesales Exp Preferred)",
                    salary: "9k-14k depending on experience + unlimited commissions",
                    shift: "US working hours: 3 PM to 12 AM",
                    requirements: [
                        "B2 English level is a must",
                        "Preferably grads only or undergrads without commitments",
                        "Telesales experience is preferred",
                        "Min age 20, Max age 32",
                        "Foreigners are not preferred"
                    ],
                    benefits: [
                        "Transportation allowance: 1k for males, 1.3k for females",
                        "Weekly and Monthly spiffs/bonuses",
                        "Fully paid training",
                        "Medical and Social insurance after probation",
                        "2 fixed days off (Saturdays and Sundays)",
                        "Location: Nasr City - Makram"
                    ]
                }
            ]
        },
        "att": {
            name: "ATT",
            description: "🌟 Join the dynamic team at ATT as a Solar Appointments Setter! 🌞 \nAvailability to work from home depending on your performance during probation.",
            jobs: [
                {
                    id: "att-1",
                    title: "Solar Appointments Setter",
                    salary: "12,000 EGP (10,000 Net + 2k KPIs) + Commissions from $40/app",
                    shift: "04:00 PM till 12:00 AM (till 11 PM for Girls)",
                    requirements: [
                        "Fluent English speakers (B2-C1)",
                        "Students, undergraduates, dropouts, gap year, and graduates are all welcome!",
                        "Min age 18, Max age 27",
                        "Accept foreigners with no heavy accent at all"
                    ],
                    benefits: [
                        "Work from home availability (depending on probation performance)",
                        "Lucrative Commissions starting from $40 per appointment after just 7 appointments",
                        "Location: Maadi"
                    ]
                }
            ]
        }
    };

    const company = companyDetails[companyId];

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <Link href="/companies" className="text-gold-400 hover:text-gold-300 mb-8 inline-block transition-colors font-medium">
                ← Back to Available Companies
            </Link>

            <div className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 mb-12">
                <div className="flex flex-col md:flex-row items-start md:items-center gap-6 mb-8">
                    <div className="w-24 h-24 rounded-2xl bg-slate-800 flex items-center justify-center text-4xl font-bold text-gold-400 flex-shrink-0">
                        {companyId.substring(0, 2).toUpperCase()}
                    </div>
                    <div>
                        <h1 className="text-4xl font-bold text-white mb-2 uppercase">{company.name}</h1>
                        <span className="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                            Actively Hiring
                        </span>
                    </div>
                </div>
                <p className="text-xl text-slate-400 max-w-3xl leading-relaxed whitespace-pre-line">
                    {company.description}
                </p>
                <div className="mt-8 border-t border-slate-800 pt-8">
                    <p className="text-lg text-slate-300">
                        Can't find an exact fit? <Link href="/apply/candidate" className="text-gold-400 font-bold hover:underline">Apply here</Link> and we will match you with the best available role for your skills!
                    </p>
                </div>
            </div>

            <h2 className="text-2xl font-bold mb-8 flex items-center">
                <span className="w-8 h-1 bg-gold-500 mr-4 rounded-full"></span>
                Open Positions ({company.jobs.length})
            </h2>

            <div className="space-y-6">
                {company.jobs.map((job: any) => (
                    <div key={job.id} className="bg-slate-900/50 border border-slate-800 rounded-2xl p-8 hover:border-slate-700 transition-colors shadow-xl">
                        <div className="flex flex-col md:flex-row md:justify-between md:items-start gap-6">
                            <div className="flex-grow">
                                <h3 className="text-2xl font-bold text-gold-400 mb-6">{job.title}</h3>

                                <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mb-8 bg-slate-900 border border-slate-800 p-6 rounded-xl">
                                    <div>
                                        <span className="block text-sm text-slate-500 mb-1">Salary & Bonuses</span>
                                        <span className="font-semibold text-white">{job.salary}</span>
                                    </div>
                                    <div>
                                        <span className="block text-sm text-slate-500 mb-1">Shift Details</span>
                                        <span className="font-semibold text-white">{job.shift}</span>
                                    </div>
                                </div>

                                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                        <span className="block text-lg font-bold text-white mb-4">✅ Requirements:</span>
                                        <ul className="list-disc list-outside ml-4 text-slate-300 space-y-2">
                                            {job.requirements.map((req: string, i: number) => <li key={i}>{req}</li>)}
                                        </ul>
                                    </div>
                                    <div className="bg-slate-900/50 p-6 rounded-xl border border-slate-800">
                                        <span className="block text-lg font-bold text-white mb-4">🎁 Benefits:</span>
                                        <ul className="list-disc list-outside ml-4 text-slate-300 space-y-2">
                                            {job.benefits.map((req: string, i: number) => <li key={i}>{req}</li>)}
                                        </ul>
                                    </div>
                                </div>
                            </div>

                            <div className="md:ml-auto md:w-56 mt-6 md:mt-0 flex-shrink-0">
                                <Link href={`/apply/candidate?company=${companyId}&role=${encodeURIComponent(job.title)}`} className="block w-full text-center px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold hover:opacity-90 transition-all shadow-lg shadow-gold-500/20 text-lg sticky top-24">
                                    Apply For This Job
                                </Link>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </div>
    );
}
