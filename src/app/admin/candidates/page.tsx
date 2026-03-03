import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';
import StatusSelect from '@/components/admin/StatusSelect';

export const revalidate = 0; // Disable cache to always fetch latest

async function getCandidates() {
    try {
        const sheets = await getGoogleSheetsClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Candidates!A:L',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return [];

        // Remove header row
        const dataRows = rows.slice(1);

        return dataRows.map((row, index) => ({
            rowIndex: index, // This maps to 0-indexed for the data array
            timestamp: row[0] || '',
            fullName: row[1] || '',
            phone: row[2] || '',
            email: row[3] || '',
            age: row[4] || '',
            city: row[5] || '',
            englishLevel: row[6] || '',
            experience: row[7] || '',
            company: row[8] || '',
            cvUrl: row[9] || '',
            voiceUrl: row[10] || '',
            status: row[11] || 'Applied'
        })).reverse(); // Show newest first
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default async function CandidatesAdminPage() {
    const candidates = await getCandidates();

    const statusOptions = [
        'Applied',
        'Interview Scheduled',
        'Rejected',
        'Accepted',
        'Placed'
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Candidates</h1>
                <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-400">
                    Total: {candidates.length}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Candidate Profile</th>
                                <th className="px-6 py-4">English / Exp</th>
                                <th className="px-6 py-4">Role/Company</th>
                                <th className="px-6 py-4">Attachments</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {candidates.length === 0 ? (
                                <tr>
                                    <td colSpan={6} className="px-6 py-8 text-center text-slate-500">
                                        No candidates found.
                                    </td>
                                </tr>
                            ) : (
                                candidates.map((c, i) => {
                                    // Reversing means index calculation needs to reflect the original array position
                                    // originalRowIndex = (candidates.length - 1 - i)
                                    // but we saved the original rowIndex on the object explicitly!
                                    return (
                                        <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                            <td className="px-6 py-4 whitespace-nowrap">
                                                {new Date(c.timestamp).toLocaleDateString()}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-bold text-white mb-1">{c.fullName}</div>
                                                <div className="text-xs text-slate-500 mb-1">{c.email}</div>
                                                <div className="text-xs text-slate-500">{c.phone} | {c.city}, {c.age}</div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="font-medium text-slate-300 mb-1">{c.englishLevel}</div>
                                                <div className="text-xs">{c.experience}</div>
                                            </td>
                                            <td className="px-6 py-4 font-medium text-slate-300">
                                                {c.company}
                                            </td>
                                            <td className="px-6 py-4">
                                                <div className="flex gap-2">
                                                    {c.cvUrl && (
                                                        <a href={c.cvUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-gold-400 hover:bg-gold-500 hover:text-slate-900 transition-colors" title="View CV">
                                                            📄
                                                        </a>
                                                    )}
                                                    {c.voiceUrl && (
                                                        <a href={c.voiceUrl} target="_blank" rel="noreferrer" className="w-8 h-8 rounded-lg bg-slate-800 border border-slate-700 flex items-center justify-center text-blue-400 hover:bg-blue-500 hover:text-slate-900 transition-colors" title="Listen to Voice Note">
                                                            🎙️
                                                        </a>
                                                    )}
                                                </div>
                                            </td>
                                            <td className="px-6 py-4">
                                                <StatusSelect
                                                    initialStatus={c.status}
                                                    tab="Candidates"
                                                    rowIndex={c.rowIndex}
                                                    statusColumn="L" // Column L is index 11
                                                    options={statusOptions}
                                                />
                                            </td>
                                        </tr>
                                    )
                                })
                            )}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}
