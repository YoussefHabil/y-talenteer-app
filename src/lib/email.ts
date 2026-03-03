import nodemailer from 'nodemailer';

// Since we are using free tools, Gmail is often used for Nodemailer.
// You would need an App Password from your Google Account for this.
const transporter = nodemailer.createTransport({
    service: 'gmail',
    auth: {
        user: process.env.EMAIL_USER,
        pass: process.env.EMAIL_APP_PASSWORD,
    },
});

export const sendNotificationEmail = async (to: string, subject: string, html: string) => {
    try {
        const info = await transporter.sendMail({
            from: `"Y-Talenteer System" <${process.env.EMAIL_USER}>`,
            to,
            subject,
            html,
        });
        return { success: true, info };
    } catch (error) {
        console.error('Error sending email:', error);
        return { success: false, error };
    }
};
