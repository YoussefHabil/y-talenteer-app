import { google } from 'googleapis';

const SCOPES = ['https://www.googleapis.com/auth/spreadsheets'];

export async function getGoogleSheetsClient() {
    const email = process.env.GOOGLE_SERVICE_ACCOUNT_EMAIL;
    // Replace escaped newlines with actual newlines in the private key if needed
    const privateKey = process.env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n');

    if (!email || !privateKey) {
        throw new Error('Missing Google Service Account credentials in environment variables.');
    }

    const jwt = new google.auth.JWT(
        email,
        undefined,
        privateKey,
        SCOPES
    );

    await jwt.authorize();

    return google.sheets({ version: 'v4', auth: jwt });
}

export const SPREADSHEET_ID = process.env.GOOGLE_SHEET_ID!;
