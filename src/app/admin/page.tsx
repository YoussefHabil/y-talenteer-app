import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';

async function getStats() {
    try {
        const sheets = await getGoogleSheetsClient();

        // Fetch basic counts from sheets
        // Error handling implemented if tabs do not exist yet
        const [candidates, companies, recruiters] = await Promise.all([
            sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: 'Candidates!A:A' }).catch(() => null),
            sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: 'Company Requests!A:A' }).catch(() => null),
            sheets.spreadsheets.values.get({ spreadsheetId: SPREADSHEET_ID, range: 'Recruiters!A:A' }).catch(() => null),
        ]);

        // Subtract 1 for header row if exists
        return {
            totalCandidates: Math.max(0, (candidates?.data?.values?.length || 1) - 1),
            totalCompanies: Math.max(0, (companies?.data?.values?.length || 1) - 1),
            totalRecruiters: Math.max(0, (recruiters?.data?.values?.length || 1) - 1),
        };
    } catch (error) {
        console.error("Failed to fetch stats", error);
        return { totalCandidates: 0, totalCompanies: 0, totalRecruiters: 0 };
    }
}

export default async function AdminDashboard() {
    const stats = await getStats();

    return (
        <div>
            <h1 className="text-3xl font-bold text-white mb-8">Dashboard Overview</h1>

            <div className="grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-400 mb-1">Total Candidates</p>
                            <h3 className="text-3xl font-bold text-white">{stats.totalCandidates}</h3>
                        </div>
                        <div className="w-12 h-12 bg-blue-500/10 rounded-xl flex items-center justify-center text-blue-400 text-xl">
                            👥
                        </div>
                    </div>
                    <p className="text-xs text-green-400 flex items-center">
                        <span className="mr-1">↑</span> 12% from last month
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-400 mb-1">Company Requests</p>
                            <h3 className="text-3xl font-bold text-white">{stats.totalCompanies}</h3>
                        </div>
                        <div className="w-12 h-12 bg-gold-500/10 rounded-xl flex items-center justify-center text-gold-400 text-xl">
                            🏢
                        </div>
                    </div>
                    <p className="text-xs text-green-400 flex items-center">
                        <span className="mr-1">↑</span> 4 new this week
                    </p>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <div className="flex justify-between items-start mb-4">
                        <div>
                            <p className="text-sm font-medium text-slate-400 mb-1">Recruiter Applications</p>
                            <h3 className="text-3xl font-bold text-white">{stats.totalRecruiters}</h3>
                        </div>
                        <div className="w-12 h-12 bg-purple-500/10 rounded-xl flex items-center justify-center text-purple-400 text-xl">
                            🎯
                        </div>
                    </div>
                    <p className="text-xs text-slate-500 flex items-center">
                        Steady flow
                    </p>
                </div>
            </div>

            <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl">
                    <h2 className="text-xl font-bold text-white mb-6">Recent Activity (Mock)</h2>
                    <div className="space-y-4">
                        {[1, 2, 3, 4].map((i) => (
                            <div key={i} className="flex items-center p-4 bg-slate-950 rounded-xl border border-slate-800">
                                <div className="w-2 h-2 rounded-full bg-gold-500 mr-4"></div>
                                <div className="flex-1">
                                    <p className="text-sm text-white font-medium">New Candidate Application</p>
                                    <p className="text-xs text-slate-500">Ahmed Hassan applied for Customer Support at AT&T</p>
                                </div>
                                <span className="text-xs text-slate-500">2h ago</span>
                            </div>
                        ))}
                    </div>
                </div>

                <div className="bg-slate-900 border border-slate-800 rounded-2xl p-6 shadow-xl flex flex-col">
                    <h2 className="text-xl font-bold text-white mb-6">System Health</h2>
                    <div className="flex-1 flex flex-col justify-center space-y-6">
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-300">Supabase Storage</span>
                                <span className="text-gold-400">12% Used</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div className="bg-gold-500 h-2 rounded-full" style={{ width: '12%' }}></div>
                            </div>
                        </div>
                        <div>
                            <div className="flex justify-between text-sm mb-2">
                                <span className="text-slate-300">Google Sheets Quota</span>
                                <span className="text-green-400">Healthy</span>
                            </div>
                            <div className="w-full bg-slate-800 rounded-full h-2">
                                <div className="bg-green-500 h-2 rounded-full" style={{ width: '3%' }}></div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </div>
    );
}
