import { NextRequest, NextResponse } from 'next';
import { supabase } from '@/lib/supabase';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const fullName = formData.get('fullName') as string;
        const email = formData.get('email') as string;
        const phone = formData.get('phone') as string;
        const experience = formData.get('experience') as string;
        const industries = formData.get('industries') as string;
        const whyUs = formData.get('whyUs') as string;

        const cv = formData.get('cv') as File;

        if (!cv) {
            return NextResponse.json({ error: 'CV File is required' }, { status: 400 });
        }

        // 1. Upload CV to Supabase Storage
        const cvBuffer = await cv.arrayBuffer();
        const cvExt = cv.name.split('.').pop();
        const cvFileName = `recruiters/cv_${Date.now()}_${fullName.replace(/\s+/g, '_')}.${cvExt}`;
        const { error: cvError } = await supabase.storage
            .from('applications')
            .upload(cvFileName, cvBuffer, { contentType: cv.type });

        if (cvError) throw new Error(`CV Upload failed: ${cvError.message}`);
        const cvUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/applications/${cvFileName}`;

        // 2. Save to Google Sheets
        const sheets = await getGoogleSheetsClient();
        const timestamp = new Date().toISOString();
        const status = 'New Application';

        // Must have a tab named "Recruiters"
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Recruiters!A:H',
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        timestamp,     // A
                        fullName,      // B
                        email,         // C
                        phone,         // D
                        experience,    // E
                        industries,    // F
                        whyUs,         // G
                        cvUrl,         // H
                        status         // I
                    ]
                ]
            }
        });

        if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
            await sendNotificationEmail(
                email,
                "Recruiter Application Received - Y-Talenteer",
                `<h2>Hi ${fullName},</h2><p>Thank you for expressing interest in joining our recruitment team. Our HR director will review your profile and reach out if there is a match.</p><p>Best,<br/>Y-Talenteer Team</p>`
            );
        }

        return NextResponse.json({ success: true, message: 'Recruiter Application submitted successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('Recruiter submission error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
