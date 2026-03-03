"use client";

import { useState, Suspense } from 'react';
import { useSearchParams } from 'next/navigation';

function CandidateForm() {
    const searchParams = useSearchParams();
    const prefillCompany = searchParams.get('company') || '';
    const prefillRole = searchParams.get('role') || '';

    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        fullName: '',
        phone: '',
        email: '',
        age: '',
        city: '',
        englishLevel: '',
        experience: '',
        preferredCompany: prefillCompany.replace('-', ' '),
        recruiterReference: '',
    });

    const [cvFile, setCvFile] = useState<File | null>(null);
    const [voiceFile, setVoiceFile] = useState<File | null>(null);
    const [voiceLink, setVoiceLink] = useState('');

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        if (!voiceFile && !voiceLink) {
            setError('Either a Voice Note file or a Vocaroo link is mandatory.');
            setIsSubmitting(false);
            return;
        }

        try {
            const data = new FormData();
            Object.entries(formData).forEach(([key, value]) => data.append(key, value));
            if (cvFile) data.append('cv', cvFile);
            if (voiceFile) data.append('voice', voiceFile);
            if (voiceLink) data.append('voiceLink', voiceLink);

            const response = await fetch('/api/apply/candidate', {
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
            <div className="text-center p-12 bg-slate-900 border border-slate-800 rounded-3xl shadow-2xl">
                <div className="w-20 h-20 bg-green-500/20 text-green-400 rounded-full flex items-center justify-center mx-auto mb-6 text-4xl">✓</div>
                <h2 className="text-3xl font-bold text-white mb-4">Application Submitted!</h2>
                <p className="text-slate-400 mb-8 max-w-md mx-auto">
                    We have received your application. Our team will review your CV and voice note, and get back to you shortly.
                </p>
                <button onClick={() => window.location.href = '/companies'} className="px-6 py-3 rounded-xl bg-gold-500 text-slate-950 font-bold hover:bg-gold-400 transition-colors">
                    Browse More Jobs
                </button>
            </div>
        );
    }

    return (
        <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
            {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">{error}</div>}

            {prefillRole && (
                <div className="p-4 bg-gold-500/10 border border-gold-500/20 rounded-xl mb-8">
                    <p className="text-gold-400 text-sm font-semibold">Applying for:</p>
                    <p className="text-xl text-white font-bold">{prefillRole} {prefillCompany ? `at ${prefillCompany.replace('-', ' ').toUpperCase()}` : ''}</p>
                </div>
            )}

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Full Name *</label>
                    <input required type="text" value={formData.fullName} onChange={e => setFormData({ ...formData, fullName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Phone Number *</label>
                    <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Email *</label>
                    <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                </div>
                <div className="grid grid-cols-2 gap-4">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Age *</label>
                        <input required type="number" min="18" value={formData.age} onChange={e => setFormData({ ...formData, age: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">City *</label>
                        <input required type="text" value={formData.city} onChange={e => setFormData({ ...formData, city: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                </div>
            </div>

            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">English Level *</label>
                    <select required value={formData.englishLevel} onChange={e => setFormData({ ...formData, englishLevel: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition appearance-none">
                        <option value="">Select Level</option>
                        <option value="B1 - Intermediate">B1 - Intermediate</option>
                        <option value="B2 - Upper Intermediate">B2 - Upper Intermediate</option>
                        <option value="C1 - Advanced">C1 - Advanced</option>
                        <option value="C2 - Fluent/Native">C2 - Fluent/Native</option>
                    </select>
                </div>
                <div>
                    <label className="block text-sm font-medium text-slate-300 mb-2">Experience Level *</label>
                    <select required value={formData.experience} onChange={e => setFormData({ ...formData, experience: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition appearance-none">
                        <option value="">Select Experience</option>
                        <option value="No Experience (0 years)">No Experience (0 years)</option>
                        <option value="0-1 Years">0-1 Years</option>
                        <option value="1-3 Years">1-3 Years</option>
                        <option value="3+ Years">3+ Years</option>
                    </select>
                </div>
            </div>

            <div>
                <label className="block text-sm font-medium text-slate-300 mb-2">Recruiter Name / Reference (Optional)</label>
                <input type="text" value={formData.recruiterReference} onChange={e => setFormData({ ...formData, recruiterReference: e.target.value })} placeholder="Did someone refer you? Let us know!" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
            </div>

            <div className="border-t border-slate-800 pt-8 mt-8">
                <h3 className="text-xl font-bold mb-6 text-white text-center">Mandatory Uploads</h3>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                    <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/20 text-center hover:border-gold-500/50 transition-colors">
                        <div className="text-4xl mb-4">📄</div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Upload CV (PDF/DOCX) (Optional)</label>
                        <input type="file" accept=".pdf,.doc,.docx" onChange={e => setCvFile(e.target.files?.[0] || null)} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-gold-400 hover:file:bg-slate-700 cursor-pointer" />
                    </div>

                    <div className="p-6 border-2 border-dashed border-slate-700 rounded-2xl bg-slate-800/20 text-center hover:border-gold-500/50 transition-colors">
                        <div className="text-4xl mb-4">🎙️</div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Upload Voice Note (MP3/WAV) *</label>
                        <p className="text-xs text-slate-500 mb-4 px-4">Please record a 1-minute audio introducing yourself in English. You can either upload an audio file or paste a link from <a href="https://vocaroo.com/" target="_blank" rel="noreferrer" className="text-gold-400 hover:underline">Vocaroo</a>.</p>

                        <div className="space-y-4">
                            <input type="file" accept="audio/*" onChange={e => { setVoiceFile(e.target.files?.[0] || null); setVoiceLink(''); }} className="w-full text-sm text-slate-400 file:mr-4 file:py-2 file:px-4 file:rounded-full file:border-0 file:text-sm file:font-semibold file:bg-slate-800 file:text-gold-400 hover:file:bg-slate-700 cursor-pointer" />

                            <div className="relative">
                                <div className="absolute inset-0 flex items-center">
                                    <div className="w-full border-t border-slate-700"></div>
                                </div>
                                <div className="relative flex justify-center text-sm">
                                    <span className="px-2 bg-slate-900 text-slate-500">OR PASTE LINK</span>
                                </div>
                            </div>

                            <input type="url" value={voiceLink} onChange={e => { setVoiceLink(e.target.value); setVoiceFile(null); }} placeholder="https://vocaroo.com/..." className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition text-left" />
                        </div>
                    </div>
                </div>
            </div>

            <button disabled={isSubmitting} type="submit" className="w-full mt-8 px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center">
                {isSubmitting ? (
                    <span className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                ) : "Submit Application"}
            </button>
        </form>
    );
}

export default function CandidateApplyPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-4xl mx-auto">
            <div className="text-center mb-12">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Candidate <span className="text-gold-400">Application</span></h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Start your journey with top-tier companies. Fill out the form accurately to expedite your placement.
                </p>
            </div>

            <Suspense fallback={<div className="text-center text-slate-400">Loading form...</div>}>
                <CandidateForm />
            </Suspense>
        </div>
    );
}
