"use client";

import { useState } from 'react';

export default function JoinRecruiterPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        email: '',
        phone: '',
        experience: '',
        industries: '',
        whyUs: ''
    });

    const [cvFile, setCvFile] = useState<File | null>(null);

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (!cvFile) {
            setError('CV upload is mandatory.');
            setIsSubmitting(false);
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => data.append(key, value));
            data.append('cv', cvFile);

            const response = await fetch('/api/apply/recruiter', {
                method: 'POST',
                body: data,
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                setError(result.error || 'Failed to submit application.');
            }
        } catch (err) {
            setError('An unexpected error occurred. Please try again later.');
        } finally {
            setIsSubmitting(false);
        }
    };

    if (success) {
        return (
            <div className="min-h-screen pt-32 pb-24 px-4 flex items-center justify-center max-w-3xl mx-auto">
                <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl w-full">
                    <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                    <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                    <p className="text-slate-400 mb-8">
                        Thank you for wanting to join the Y-Talenteer family. Our HR director will review your profile and reach out to you if your qualifications match our current needs.
                    </p>
                    <button onClick={() => window.location.href = '/'} className="px-6 py-3 rounded-xl bg-gold-500 text-slate-950 font-bold hover:bg-gold-400 transition-colors">
                        Return Home
                    </button>
                </div>
            </div>
        );
    }

    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Join <span className="text-gold-400">Our Team</span></h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    We are always looking for sharp, ambitious recruiters who understand the value of elite talent matching.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                        <input required type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Recruitment Experience *</label>
                        <select required value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition appearance-none">
                            <option value="">Select Experience</option>
                            <option value="Less than 1 Year">Less than 1 Year</option>
                            <option value="1-3 Years">1-3 Years</option>
                            <option value="3-5 Years">3-5 Years</option>
                            <option value="5+ Years">5+ Years</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Phone *</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Industries Worked In *</label>
                    <input required type="text" value={formData.industries} onChange={e => setFormData({ ...formData, industries: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" placeholder="e.g. BPO, Tech, Healthcare" />
                </div>

                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Why Y-Talenteer? *</label>
                    <textarea required rows={4} value={formData.whyUs} onChange={e => setFormData({ ...formData, whyUs: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" placeholder="Tell us why you want to join our agency..."></textarea>
                </div>

                <div className="border-t border-slate-800 pt-8 mt-8">
                    <h3 className="text-xl font-bold mb-6 text-white text-center">Your Resume</h3>
                    <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/20 text-center hover:border-gold-500/50 transition-colors max-w-md mx-auto">
                        <div className="text-4xl mb-4">📄</div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Upload CV (PDF/DOCX) *</label>
                        <input required type="file" accept=".pdf,.doc,.docx" onChange={e => setCvFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-gold-400 hover:file:bg-slate-700 cursor-pointer" />
                    </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full mt-8 px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center">
                    {isSubmitting ? (
                        <span className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : "Submit Recruiter Profile"}
                </button>
            </form>
        </div>
    );
}
