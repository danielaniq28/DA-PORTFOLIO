import React, { useState } from 'react';
import { Mail, Phone, MapPin, Send, CheckCircle2, Globe, MessageSquare } from 'lucide-react';
import { PERSONAL_INFO } from '../data/portfolioData';

export function ContactSection() {
  const [formData, setFormData] = useState({
    name: '',
    email: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!formData.name || !formData.email || !formData.message) return;

    // Build mailto URI for real messaging
    const mailtoSubject = encodeURIComponent(formData.subject || `Portfolio Inquiry from ${formData.name}`);
    const mailtoBody = encodeURIComponent(
      `Name: ${formData.name}\nEmail: ${formData.email}\n\nMessage:\n${formData.message}`
    );

    // Open mail client
    window.location.href = `mailto:${PERSONAL_INFO.email}?subject=${mailtoSubject}&body=${mailtoBody}`;
    setSubmitted(true);
  };

  return (
    <section id="contact" className="py-24 relative border-t border-white/10">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 items-start">
          {/* Left Column: Direct Info */}
          <div className="lg:col-span-5 space-y-8">
            <div>
              <div className="flex items-center gap-2 text-xs font-semibold tracking-wider text-red-500 uppercase mb-3">
                <span>Direct Inquiry</span>
                <span aria-hidden="true" className="text-zinc-600">·</span>
                <span>Get In Touch</span>
              </div>

              <h2 className="text-3xl sm:text-4xl font-bold tracking-tight text-white mb-4 [text-wrap:balance]">
                Let&apos;s build resilient systems together.
              </h2>

              <p className="text-base text-zinc-400 leading-relaxed [text-wrap:balance]">
                Whether you are exploring automotive telematics integration, hardware correlation benches, or Apple ecosystem technical escalations, my lines are always open.
              </p>
            </div>

            <div className="space-y-4 pt-2">
              <a
                href={`mailto:${PERSONAL_INFO.email}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-red-500/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <Mail className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono">Email Directly</div>
                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    {PERSONAL_INFO.email}
                  </div>
                </div>
              </a>

              <a
                href={`tel:${PERSONAL_INFO.phone}`}
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-red-500/50 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-red-400 group-hover:scale-105 transition-transform">
                  <Phone className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono">Direct Line</div>
                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    {PERSONAL_INFO.phone}
                  </div>
                </div>
              </a>

              <div className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/70 border border-white/10">
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
                  <MapPin className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono">Base Location</div>
                  <div className="text-sm font-semibold text-white">
                    {PERSONAL_INFO.location}
                  </div>
                </div>
              </div>

              <a
                href={PERSONAL_INFO.website}
                target="_blank"
                rel="noreferrer"
                className="flex items-center gap-4 p-4 rounded-2xl bg-zinc-950/70 border border-white/10 hover:border-zinc-700 transition-colors group"
              >
                <div className="w-10 h-10 rounded-xl bg-zinc-900 border border-white/10 flex items-center justify-center text-zinc-400">
                  <Globe className="w-5 h-5" />
                </div>
                <div>
                  <div className="text-[11px] text-zinc-500 uppercase font-mono">Personal Domain</div>
                  <div className="text-sm font-semibold text-white group-hover:text-red-400 transition-colors">
                    {PERSONAL_INFO.website}
                  </div>
                </div>
              </a>
            </div>
          </div>

          {/* Right Column: Interactive Dispatch Form */}
          <div className="lg:col-span-7">
            <div className="rounded-3xl bg-zinc-900/60 border border-white/10 p-6 sm:p-8 backdrop-blur-xl">
              <div className="flex items-center gap-2 mb-6 pb-4 border-b border-white/10">
                <MessageSquare className="w-4 h-4 text-red-500" />
                <h3 className="text-base font-bold text-white">Send Direct Dispatch</h3>
              </div>

              {submitted ? (
                <div className="py-12 flex flex-col items-center justify-center text-center space-y-4">
                  <div className="w-12 h-12 rounded-full bg-emerald-500/10 border border-emerald-500/20 flex items-center justify-center text-emerald-400">
                    <CheckCircle2 className="w-6 h-6" />
                  </div>
                  <h4 className="text-lg font-bold text-white">Dispatch Prepared</h4>
                  <p className="text-xs sm:text-sm text-zinc-400 max-w-sm">
                    Your email client has been opened to send directly to <span className="text-white font-medium">{PERSONAL_INFO.email}</span>. Thank you for reaching out!
                  </p>
                  <button
                    onClick={() => {
                      setSubmitted(false);
                      setFormData({ name: '', email: '', subject: '', message: '' });
                    }}
                    className="px-4 py-2 text-xs font-semibold text-zinc-300 hover:text-white bg-zinc-800 rounded-lg cursor-pointer"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="space-y-4">
                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Your Name
                      </label>
                      <input
                        type="text"
                        required
                        value={formData.name}
                        onChange={(e) => setFormData({ ...formData, name: e.target.value })}
                        placeholder="e.g. Alex Wong"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                        Your Email
                      </label>
                      <input
                        type="email"
                        required
                        value={formData.email}
                        onChange={(e) => setFormData({ ...formData, email: e.target.value })}
                        placeholder="alex@company.com"
                        className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                      />
                    </div>
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Subject / Project Scope
                    </label>
                    <input
                      type="text"
                      value={formData.subject}
                      onChange={(e) => setFormData({ ...formData, subject: e.target.value })}
                      placeholder="e.g. Telematics Integration / Systems Consultation"
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors"
                    />
                  </div>

                  <div>
                    <label className="block text-xs font-medium text-zinc-400 mb-1.5">
                      Message
                    </label>
                    <textarea
                      required
                      rows={4}
                      value={formData.message}
                      onChange={(e) => setFormData({ ...formData, message: e.target.value })}
                      placeholder="Describe your inquiry, project scope, or technical topic..."
                      className="w-full px-4 py-2.5 rounded-xl bg-zinc-950 border border-white/10 text-white text-xs sm:text-sm placeholder:text-zinc-600 focus:outline-none focus:border-red-500 focus:ring-1 focus:ring-red-500 transition-colors resize-none"
                    />
                  </div>

                  <button
                    type="submit"
                    className="w-full sm:w-auto inline-flex items-center justify-center gap-2 px-6 py-3 rounded-full bg-red-600 hover:bg-red-500 text-white text-xs font-semibold shadow-lg shadow-red-600/25 transition-all cursor-pointer focus:outline-none focus-visible:ring-2 focus-visible:ring-red-400"
                  >
                    <span>Transmit Message</span>
                    <Send className="w-3.5 h-3.5" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      </div>
    </section>
  );
}
