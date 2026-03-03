import type { Metadata } from 'next'
import './globals.css'
import Navbar from '@/components/layout/Navbar'
import Footer from '@/components/layout/Footer'

export const metadata: Metadata = {
    title: 'Y-Talenteer | Premium Recruitment Agency in Egypt',
    description: 'Specialized in call center and bilingual recruitment in Egypt. We connect top talent with industry-leading companies for BPO, Tech Support, and Sales roles.',
    keywords: 'Call center jobs in Egypt, English account jobs, Bilingual jobs, Recruitment agency in Egypt, BPO hiring, Tech support jobs Cairo',
}

export default function RootLayout({
    children,
}: {
    children: React.ReactNode
}) {
    return (
        <html lang="en">
            <body className="antialiased min-h-screen flex flex-col bg-slate-900 text-slate-50">
                <Navbar />
                <main className="flex-grow">
                    {children}
                </main>
                <Footer />
            </body>
        </html>
    )
}
