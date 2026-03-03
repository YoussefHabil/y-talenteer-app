import Link from 'next/link';

// Mock data early on. Later, this could be fetched from Google Sheets or Supabase
const companies = [
    {
        id: "ttc",
        name: "TTC",
        logo: "T",
        hiring: true,
        description: "Looking for Telesales Agents for US Accounts. Many accounts available, offering great salaries, commissions, and fixed weekends off.",
        openPositions: 2,
    },
    {
        id: "creative-basket",
        name: "Creative Basket",
        logo: "CB",
        hiring: true,
        description: "Hiring for US Housing accounts. Booking hotel rooms for exhibitors attending tradeshows.",
        openPositions: 2,
    },
    {
        id: "expo-way",
        name: "Expo Way",
        logo: "EW",
        hiring: true,
        description: "Hiring Telesales agents for a US HOUSING account with great salaries and unlimited commissions.",
        openPositions: 1,
    }
];

export default function CompaniesPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-7xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Active Hiring <span className="text-gold-400">Companies</span></h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Explore top-tier organizations actively looking for your skills. Click on a company to view their specific requirements and apply.
                </p>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
                {companies.map((company) => (
                    <Link href={`/companies/${company.id}`} key={company.id} className="group flex flex-col p-8 rounded-2xl bg-slate-900 border border-slate-800 hover:border-gold-500/50 transition-all duration-300 hover:shadow-2xl hover:shadow-gold-500/10 hover:-translate-y-1">
                        <div className="flex justify-between items-start mb-6">
                            <div className="w-16 h-16 rounded-xl bg-slate-800 flex items-center justify-center text-2xl font-bold text-gold-400 group-hover:bg-gold-500/20 transition-colors">
                                {company.logo}
                            </div>
                            {company.hiring && (
                                <span className="inline-flex items-center px-3 py-1 rounded-full text-xs font-medium bg-green-500/10 text-green-400 border border-green-500/20">
                                    Now Hiring
                                </span>
                            )}
                        </div>
                        <h3 className="text-2xl font-bold text-white mb-2">{company.name}</h3>
                        <p className="text-slate-400 flex-grow mb-6">{company.description}</p>
                        <div className="flex justify-between items-center text-sm font-medium border-t border-slate-800 pt-6">
                            <span className="text-slate-300">{company.openPositions} Open Positions</span>
                            <span className="text-gold-400 group-hover:text-gold-300 transition-colors flex items-center">
                                View Jobs <span className="ml-1 group-hover:translate-x-1 transition-transform">→</span>
                            </span>
                        </div>
                    </Link>
                ))}
            </div>
        </div>
    );
}
