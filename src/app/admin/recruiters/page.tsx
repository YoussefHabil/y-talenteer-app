import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';
import StatusSelect from '@/components/admin/StatusSelect';

export const revalidate = 0;

async function getRecruiters() {
    try {
        const sheets = await getGoogleSheetsClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Recruiters!A:I',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return [];

        const dataRows = rows.slice(1);

        return dataRows.map((row, index) => ({
            rowIndex: index,
            timestamp: row[0] || '',
            fullName: row[1] || '',
            email: row[2] || '',
            phone: row[3] || '',
            experience: row[4] || '',
            industries: row[5] || '',
            whyUs: row[6] || '',
            cvUrl: row[7] || '',
            status: row[8] || 'New Application'
        })).reverse();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default async function RecruitersAdminPage() {
    const recruiters = await getRecruiters();

    const statusOptions = [
        'New Application',
        'Interviewing',
        'Accepted',
        'Rejected'
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Recruiters</h1>
                <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-400">
                    Total: {recruiters.length}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Applicant</th>
                                <th className="px-6 py-4">Experience & Industries</th>
                                <th className="px-6 py-4 max-w-xs">Why Y-Talenteer?</th>
                                <th className="px-6 py-4">CV</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {recruiters.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No recruiter applications found.
                                    </td>
                                </tr>
                            ) : (
                                recruiters.map((r, i) => (
                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(r.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white mb-1">{r.fullName}</div>
                                            <div className="text-xs text-slate-500">{r.email}</div>
                                            <div className="text-xs text-slate-500">{r.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-300 mb-1">{r.experience}</div>
                                            <div className="text-xs text-slate-400">{r.industries}</div>
                                        </td>
                                        <td className="px-6 py-4 text-xs italic text-slate-400 max-w-xs truncate" title={r.whyUs}>
                                            "{r.whyUs}"
                                        </td>
                                        <td className="px-6 py-4">
                                            {r.cvUrl && (
                                                <a href={r.cvUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-slate-900 transition-colors" title="View CV">
                                                    📄
                                                </a>
                                            )}
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusSelect
                                                initialStatus={r.status}
                                                tab="Recruiters"
                                                rowIndex={r.rowIndex}
                                                statusColumn="I" // Column I is index 8
                                                options={statusOptions}
                                            />
                                        </td>
                                    </tr>
                                ))
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
