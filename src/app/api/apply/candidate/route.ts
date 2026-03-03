import { NextRequest, NextResponse } from 'next/server';
import { supabase } from '@/lib/supabase';
import { getGoogleSheetsClient, SPREADSHEET_ID } from '@/lib/google-sheets';
import { sendNotificationEmail } from '@/lib/email';

export async function POST(req: NextRequest) {
    try {
        const formData = await req.formData();

        const fullName = formData.get('fullName') as string;
        const phone = formData.get('phone') as string;
        const email = formData.get('email') as string;
        const age = formData.get('age') as string;
        const city = formData.get('city') as string;
        const englishLevel = formData.get('englishLevel') as string;
        const experience = formData.get('experience') as string;
        const preferredCompany = formData.get('preferredCompany') as string || 'General';
        const recruiterReference = formData.get('recruiterReference') as string || 'None';

        const cv = formData.get('cv') as File | null;
        const voice = formData.get('voice') as File | null;
        const voiceLink = formData.get('voiceLink') as string | null;

        if (!voice && !voiceLink) {
            return NextResponse.json({ error: 'Voice File or Link is required' }, { status: 400 });
        }

        // 1. Upload CV to Supabase Storage (Optional)
        let cvUrl = 'Not Provided';
        if (cv) {
            const cvBuffer = await cv.arrayBuffer();
            const cvExt = cv.name.split('.').pop();
            const cvFileName = `candidates/cv_${Date.now()}_${fullName.replace(/\s+/g, '_')}.${cvExt}`;
            const { error: cvError } = await supabase.storage
                .from('applications')
                .upload(cvFileName, cvBuffer, { contentType: cv.type });

            if (cvError) throw new Error(`CV Upload failed: ${cvError.message}`);
            cvUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/applications/${cvFileName}`;
        }

        // 2. Upload Voice Note to Supabase Storage or use Link
        let voiceUrl = voiceLink || '';

        if (voice) {
            const voiceBuffer = await voice.arrayBuffer();
            const voiceExt = voice.name.split('.').pop() || 'mp3';
            const voiceFileName = `candidates/voice_${Date.now()}_${fullName.replace(/\s+/g, '_')}.${voiceExt}`;
            const { error: voiceError } = await supabase.storage
                .from('applications')
                .upload(voiceFileName, voiceBuffer, { contentType: voice.type });

            if (voiceError) throw new Error(`Voice Upload failed: ${voiceError.message}`);
            voiceUrl = `${process.env.NEXT_PUBLIC_SUPABASE_URL}/storage/v1/object/public/applications/${voiceFileName}`;
        }

        // 3. Save to Google Sheets
        const sheets = await getGoogleSheetsClient();
        const timestamp = new Date().toISOString();
        const status = 'Applied';

        // We append to a tab named "Candidates"
        await sheets.spreadsheets.values.append({
            spreadsheetId: SPREADSHEET_ID,
            range: 'Candidates!A:M', // Make sure you have a tab named Candidates
            valueInputOption: 'USER_ENTERED',
            requestBody: {
                values: [
                    [
                        timestamp,         // A: Timestamp
                        fullName,          // B: Name
                        phone,             // C: Phone
                        email,             // D: Email
                        age,               // E: Age
                        city,              // F: City
                        englishLevel,      // G: English Level
                        experience,        // H: Experience
                        preferredCompany,  // I: Preferred Company
                        cvUrl,             // J: CV Link
                        voiceUrl,          // K: Voice Note Link
                        status,            // L: Status
                        recruiterReference // M: Recruiter Reference
                    ]
                ]
            }
        });

        // 4. Optionally Send Email Notification (Ignoring failure if Nodemailer not fully setup)
        if (process.env.EMAIL_USER && process.env.EMAIL_APP_PASSWORD) {
            await sendNotificationEmail(
                email,
                "Application Received - Y-Talenteer",
                `<h2>Hi ${fullName},</h2><p>We have successfully received your application for ${preferredCompany}. Our recruiters will review your voice note and resume shortly.</p><p>Best,<br/>Y-Talenteer Team</p>`
            );
        }

        return NextResponse.json({ success: true, message: 'Application submitted successfully' }, { status: 200 });

    } catch (error: any) {
        console.error('Application submission error:', error);
        return NextResponse.json({ error: error.message || 'Internal Server Error' }, { status: 500 });
    }
}
