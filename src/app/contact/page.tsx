export default function ContactPage() {
    return (
        <div className="min-h-screen pt-32 pb-24 px-4 sm:px-6 lg:px-8 max-w-5xl mx-auto">
            <div className="text-center mb-16">
                <h1 className="text-4xl md:text-5xl font-bold mb-6">Contact <span className="text-gold-400">Us</span></h1>
                <p className="text-xl text-slate-400 max-w-2xl mx-auto">
                    Have a question or need assistance? Our team is available 24/7 to help you take the next step.
                </p>
            </div>

            <div className="grid md:grid-cols-2 gap-12 bg-slate-900 border border-slate-800 rounded-3xl overflow-hidden shadow-2xl">
                <div className="p-8 md:p-12 bg-slate-800/50">
                    <h2 className="text-3xl font-bold text-white mb-8">Get In Touch</h2>

                    <div className="space-y-6 text-lg">
                        <div className="flex items-start">
                            <span className="text-gold-400 mr-4 text-2xl">📧</span>
                            <div>
                                <strong className="block text-white mb-1">Email Support</strong>
                                <a href="mailto:support@y-talenteer.com" className="text-slate-400 hover:text-gold-400 transition-colors">support@y-talenteer.com</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-gold-400 mr-4 text-2xl">📞</span>
                            <div>
                                <strong className="block text-white mb-1">Hotline</strong>
                                <a href="tel:+201000000000" className="text-slate-400 hover:text-gold-400 transition-colors">+20 100 000 0000</a>
                            </div>
                        </div>
                        <div className="flex items-start">
                            <span className="text-gold-400 mr-4 text-2xl">📍</span>
                            <div>
                                <strong className="block text-white mb-1">Headquarters</strong>
                                <span className="text-slate-400 block">Maadi Technology Park,<br />Cairo, Egypt</span>
                            </div>
                        </div>
                    </div>
                </div>

                <div className="p-8 md:p-12">
                    {/* We will just make a visual contact form that links or acts as a placeholder, 
              since the main focus is the hiring forms. */}
                    <form className="space-y-6">
                        <div>
                            <label htmlFor="name" className="block text-sm font-medium text-slate-300 mb-2">Full Name</label>
                            <input type="text" id="name" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" placeholder="John Doe" />
                        </div>
                        <div>
                            <label htmlFor="email" className="block text-sm font-medium text-slate-300 mb-2">Email Address</label>
                            <input type="email" id="email" className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" placeholder="john@example.com" />
                        </div>
                        <div>
                            <label htmlFor="message" className="block text-sm font-medium text-slate-300 mb-2">Message</label>
                            <textarea id="message" rows={4} className="w-full bg-slate-950 border border-slate-700 rounded-xl px-4 py-3 text-white focus:outline-none focus:ring-2 focus:ring-gold-500 focus:border-transparent transition" placeholder="How can we help?"></textarea>
                        </div>
                        <button type="button" className="w-full px-6 py-4 rounded-xl bg-gold-500 text-slate-950 font-bold hover:bg-gold-400 transition-colors shadow-lg shadow-gold-500/20">
                            Send Message
                        </button>
                    </form>
                </div>
            </div>
        </div>
    );
}
