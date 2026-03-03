import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';
import StatusSelect from '@/components/admin/StatusSelect';

export const revalidate = 0;

async function getCompanyRequests() {
    try {
        const sheets = await getGoogleSheetsClient();
        const response = await sheets.spreadsheets.values.get({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Company Requests!A:J',
        });

        const rows = response.data.values;
        if (!rows || rows.length === 0) return [];

        const dataRows = rows.slice(1);

        return dataRows.map((row, index) => ({
            rowIndex: index,
            timestamp: row[0] || '',
            companyName: row[1] || '',
            contactPerson: row[2] || '',
            email: row[3] || '',
            phone: row[4] || '',
            count: row[5] || '',
            campaign: row[6] || '',
            budget: row[7] || '',
            timeline: row[8] || '',
            status: row[9] || 'New Request'
        })).reverse();
    } catch (err) {
        console.error(err);
        return [];
    }
}

export default async function CompaniesAdminPage() {
    const requests = await getCompanyRequests();

    const statusOptions = [
        'New Request',
        'In Progress',
        'Fulfilled',
        'Rejected'
    ];

    return (
        <div>
            <div className="flex justify-between items-center mb-8">
                <h1 className="text-3xl font-bold text-white">Company Requests</h1>
                <div className="bg-slate-900 border border-slate-800 rounded-lg px-4 py-2 text-sm text-slate-400">
                    Total: {requests.length}
                </div>
            </div>

            <div className="bg-slate-900 border border-slate-800 rounded-2xl overflow-hidden shadow-xl">
                <div className="overflow-x-auto">
                    <table className="w-full text-left text-sm text-slate-400">
                        <thead className="bg-slate-950 text-xs uppercase text-slate-500 border-b border-slate-800">
                            <tr>
                                <th className="px-6 py-4">Date</th>
                                <th className="px-6 py-4">Company & Contact</th>
                                <th className="px-6 py-4">Campaign Details</th>
                                <th className="px-6 py-4">Timeline & Budget</th>
                                <th className="px-6 py-4">Status</th>
                            </tr>
                        </thead>
                        <tbody className="divide-y divide-slate-800">
                            {requests.length === 0 ? (
                                <tr>
                                    <td colSpan={5} className="px-6 py-8 text-center text-slate-500">
                                        No requests found.
                                    </td>
                                </tr>
                            ) : (
                                requests.map((r, i) => (
                                    <tr key={i} className="hover:bg-slate-800/50 transition-colors">
                                        <td className="px-6 py-4 whitespace-nowrap">
                                            {new Date(r.timestamp).toLocaleDateString()}
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-bold text-white mb-1 uppercase text-gold-400">{r.companyName}</div>
                                            <div className="text-sm font-medium text-slate-300 mb-1">{r.contactPerson}</div>
                                            <div className="text-xs text-slate-500">{r.email} | {r.phone}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-white mb-1">{r.count} Agents</div>
                                            <div className="text-xs text-slate-400">{r.campaign}</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <div className="font-medium text-slate-300 mb-1">{r.timeline}</div>
                                            <div className="text-xs text-slate-400">{r.budget}/agent</div>
                                        </td>
                                        <td className="px-6 py-4">
                                            <StatusSelect
                                                initialStatus={r.status}
                                                tab="Company Requests"
                                                rowIndex={r.rowIndex}
                                                statusColumn="J" // Column J is index 9
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
