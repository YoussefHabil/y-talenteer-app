import { NextRequest, NextResponse } from 'next';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const data = await req.json();

        const {
            companyName,
            agentsCount,
            campaignType,
            timeline,
            budgetRange,
            contactPerson,
            email,
            phone
        } = data;

        // Save to Google Sheets
        const sheets = await getGoogleSheetsClient();
        const timestamp = new Date().toISOString();
        const status = 'New Request';

        // Append to "Company Requests" tab
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Company Requests!A:J',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        timestamp,       // A: Timestamp
                        companyName,     // B: Company Name
                        contactPerson,   // C: Contact Person
                        email,           // D: Email
                        phone,           // E: Phone
                        agentsCount,     // F: Count
                        campaignType,    // G: Campaign Type
                        budgetRange,     // H: Budget
                        timeline,        // I: Timeline
                        status           // J: Status
                    ]
                ]
            }
        });

        if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
            await sendNotificationEmail(
                email,
                "Hiring Request Received - Y-Talenteer",
                `<h2>Hi ${contactPerson},</h2><p>We have successfully received your hiring request for ${companyName}. Our B2B Account Manager will reach out within 24 hours.</p><p>Best,<br/>Y-Talenteer Team</p>`
            );
        }

        return NextResponse.json({ success: true, message: 'Form submitted successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('Company form submission error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
