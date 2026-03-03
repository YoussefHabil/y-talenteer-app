"use client";

import { useState } from 'react';

export default function CompanyApplyPage() {
    const [isSubmitting, setIsSubmitting] = useState(false);
    const [success, setSuccess] = useState(false);
    const [error, setError] = useState('');

    const [formData, setFormData] = useState({
        companyName: '',
        agentsCount: '',
        campaignType: '',
        timeline: '',
        budgetRange: '',
        contactPerson: '',
        email: '',
        phone: ''
    });

    const handleSubmit = async (e: React.FormEvent) => {
        e.preventDefault();
        setIsSubmitting(true);
        setError('');

        try {
            const response = await fetch('/api/apply/company', {
                method: 'POST',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify(formData),
            });

            const result = await response.json();

            if (response.ok) {
                setSuccess(true);
            } else {
                setError(result.error || 'Failed to submit request.');
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
                    <h2 className="text-3xl font-bold text-white mb-4">Request Received!</h2>
                    <p className="text-slate-400 mb-8">
                        Thank you for trusting Y-Talenteer. Our B2B account manager will contact you within 24 hours to discuss your hiring requirements in detail.
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
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Let's Build Your <span className="text-gold-400">Elite Team</span></h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Tell us about your campaign needs. Whether you need 5 specialized agents or a team of 50, we have the talent ready.
                </p>
            </div>

            <form onSubmit={handleSubmit} className="bg-slate-900 border border-slate-800 rounded-3xl p-8 md:p-12 shadow-2xl space-y-8">
                {error && <div className="p-4 bg-red-500/10 border border-red-500/20 text-red-500 rounded-xl">{error}</div>}

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Company Name *</label>
                        <input required type="text" value={formData.companyName} onChange={e => setFormData({ ...formData, companyName: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Required Agents Count *</label>
                        <input required type="number" min="1" value={formData.agentsCount} onChange={e => setFormData({ ...formData, agentsCount: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" placeholder="e.g. 15" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Contact Person Name *</label>
                        <input required type="text" value={formData.contactPerson} onChange={e => setFormData({ ...formData, contactPerson: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Campaign Type *</label>
                        <select required value={formData.campaignType} onChange={e => setFormData({ ...formData, campaignType: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition appearance-none">
                            <option value="">Select Campaign Type</option>
                            <option value="Inbound Customer Service">Inbound Customer Service</option>
                            <option value="Outbound Sales/Telesales">Outbound Sales/Telesales</option>
                            <option value="Technical Support">Technical Support</option>
                            <option value="Retention & Loyalty">Retention & Loyalty</option>
                            <option value="Other">Other (Mixed)</option>
                        </select>
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Business Email *</label>
                        <input required type="email" value={formData.email} onChange={e => setFormData({ ...formData, email: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Contact Phone *</label>
                        <input required type="tel" value={formData.phone} onChange={e => setFormData({ ...formData, phone: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition" />
                    </div>
                </div>

                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Budget Range (Monthly per agent) *</label>
                        <select required value={formData.budgetRange} onChange={e => setFormData({ ...formData, budgetRange: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition appearance-none">
                            <option value="">Select Range</option>
                            <option value="10,000 - 15,000 EGP">10,000 - 15,000 EGP</option>
                            <option value="15,000 - 20,000 EGP">15,000 - 20,000 EGP</option>
                            <option value="20,000 - 30,000+ EGP">20,000 - 30,000+ EGP</option>
                        </select>
                    </div>
                    <div>
                        <label className="block text-sm font-medium text-slate-300 mb-2">Expected Timeline *</label>
                        <select required value={formData.timeline} onChange={e => setFormData({ ...formData, timeline: e.target.value })} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 transition appearance-none">
                            <option value="">Select Timeline</option>
                            <option value="Immediately (Within 1 week)">Immediately (Within 1 week)</option>
                            <option value="Within 2-4 weeks">Within 2-4 weeks</option>
                            <option value="1-3 Months">1-3 Months</option>
                            <option value="Just exploring options">Just exploring options</option>
                        </select>
                    </div>
                </div>

                <button disabled={isSubmitting} type="submit" className="w-full mt-8 px-6 py-4 rounded-xl bg-gradient-to-r from-gold-500 to-gold-600 text-slate-950 font-bold hover:opacity-90 disabled:opacity-50 transition-all shadow-lg shadow-gold-500/20 flex items-center justify-center">
                    {isSubmitting ? (
                        <span className="w-6 h-6 border-2 border-slate-950 border-t-transparent rounded-full animate-spin"></span>
                    ) : "Submit Hiring Request"}
                </button>
            </form>
        </div>
    );
}
