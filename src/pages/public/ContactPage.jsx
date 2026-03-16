import { useState } from 'react';

const SUBJECTS = [
  'Software Development',
  'Internet of Things (IoT)',
  'AI & Machine Learning',
  'Data Analytics & Reporting',
  'Technology Training',
  'Research & Innovation',
  'General Inquiry',
];

const ContactPage = () => {
  const [form, setForm] = useState({
    firstName: '',
    lastName: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [submitted, setSubmitted] = useState(false);
  const [loading, setLoading] = useState(false);

  const handleChange = (e) => {
    setForm((prev) => ({ ...prev, [e.target.name]: e.target.value }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    setLoading(true);
    // Simulate async submission
    setTimeout(() => {
      setLoading(false);
      setSubmitted(true);
      setForm({ firstName: '', lastName: '', email: '', phone: '', subject: '', message: '' });
    }, 1200);
  };

  return (
    <div className="font-sans">

      {/* ── HERO ── */}
      <section className="relative h-72 sm:h-96 flex items-end overflow-hidden">
        <img
          src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1920&q=80"
          alt="Team collaborating in an office"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        <div className="absolute inset-0 bg-secondary-900/75" />
        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pb-12 w-full">
          <span className="inline-block text-primary-400 font-bold text-sm uppercase tracking-widest bg-primary-600/20 px-4 py-1.5 rounded-full mb-4">Get In Touch</span>
          <h1 className="text-4xl sm:text-5xl font-extrabold text-white leading-tight">
            Contact Us
          </h1>
        </div>
      </section>

      {/* ── MAIN CONTENT ── */}
      <section className="py-20 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-5 gap-12">

            {/* ── LEFT: Contact info ── */}
            <div className="lg:col-span-2 space-y-8">
              <div>
                <h2 className="text-3xl font-extrabold text-secondary-800 mb-3">Let's Work Together</h2>
                <p className="text-gray-500 leading-relaxed">
                  Whether you have a project idea, need a technology partner, or want to upskill your team — reach out and we'll get back to you within 24 hours.
                </p>
              </div>

              {/* Contact cards */}
              <div className="space-y-4">
                <a href="mailto:info@velotafrica.com"
                  className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-primary-400 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-primary-50 border border-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Email</p>
                    <p className="text-secondary-700 font-semibold">info@velotafrica.com</p>
                  </div>
                </a>

                <a href="tel:+250788930475"
                  className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl hover:border-primary-400 hover:shadow-lg transition-all group">
                  <div className="w-12 h-12 bg-primary-50 border border-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0 group-hover:bg-primary-600 group-hover:text-white transition-all">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Phone</p>
                    <p className="text-secondary-700 font-semibold">+250 788 930 475</p>
                  </div>
                </a>

                <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl">
                  <div className="w-12 h-12 bg-primary-50 border border-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Office</p>
                    <p className="text-secondary-700 font-semibold">Kigali, Rwanda</p>
                  </div>
                </div>

                <div className="flex items-center gap-4 p-5 bg-white border border-gray-200 rounded-2xl">
                  <div className="w-12 h-12 bg-primary-50 border border-primary-100 text-primary-600 rounded-xl flex items-center justify-center flex-shrink-0">
                    <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
                    </svg>
                  </div>
                  <div>
                    <p className="text-xs text-gray-400 font-medium uppercase tracking-wide mb-0.5">Working Hours</p>
                    <p className="text-secondary-700 font-semibold">Mon – Fri, 8:00 AM – 6:00 PM</p>
                  </div>
                </div>
              </div>

              {/* Social links */}
              <div>
                <p className="text-sm font-semibold text-secondary-700 mb-3">Follow Us</p>
                <div className="flex gap-3">
                  {[
                    {
                      href: '#', label: 'LinkedIn',
                      icon: <path d="M16 8a6 6 0 016 6v7h-4v-7a2 2 0 00-2-2 2 2 0 00-2 2v7h-4v-7a6 6 0 016-6zM2 9h4v12H2z" />,
                    },
                    {
                      href: '#', label: 'Twitter/X',
                      icon: <path d="M23 3a10.9 10.9 0 01-3.14 1.53 4.48 4.48 0 00-7.86 3v1A10.66 10.66 0 013 4s-4 9 5 13a11.64 11.64 0 01-7 2c9 5 20 0 20-11.5a4.5 4.5 0 00-.08-.83A7.72 7.72 0 0023 3z" />,
                    },
                    {
                      href: '#', label: 'Facebook',
                      icon: <path d="M18 2h-3a5 5 0 00-5 5v3H7v4h3v8h4v-8h3l1-4h-4V7a1 1 0 011-1h3z" />,
                    },
                  ].map((s) => (
                    <a key={s.label} href={s.href}
                      className="w-10 h-10 bg-white border border-gray-200 rounded-xl flex items-center justify-center text-secondary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all">
                      <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24" strokeLinecap="round" strokeLinejoin="round" strokeWidth="2">
                        {s.icon}
                      </svg>
                    </a>
                  ))}
                </div>
              </div>

              {/* Map placeholder */}
              <div className="rounded-2xl overflow-hidden border border-gray-200 shadow-sm h-52 relative bg-gray-200">
                <img
                  src="https://images.unsplash.com/photo-1524661135-423995f22d0b?w=700&q=80"
                  alt="Kigali, Rwanda map area"
                  className="w-full h-full object-cover opacity-80"
                />
                <div className="absolute inset-0 flex items-center justify-center">
                  <div className="bg-white/90 backdrop-blur-sm rounded-2xl px-5 py-3 text-center shadow-lg">
                    <p className="text-secondary-800 font-bold text-sm">Kigali, Rwanda</p>
                    <p className="text-gray-500 text-xs mt-0.5">East Africa</p>
                  </div>
                </div>
              </div>
            </div>

            {/* ── RIGHT: Contact form ── */}
            <div className="lg:col-span-3">
              <div className="bg-white border border-gray-200 rounded-3xl p-8 sm:p-12 shadow-sm">

                {submitted ? (
                  <div className="text-center py-16">
                    <div className="w-20 h-20 bg-green-50 border border-green-100 rounded-full flex items-center justify-center mx-auto mb-6">
                      <svg className="w-10 h-10 text-green-600" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
                      </svg>
                    </div>
                    <h3 className="text-2xl font-extrabold text-secondary-800 mb-2">Message Sent!</h3>
                    <p className="text-gray-500 mb-8">
                      Thank you for reaching out. Our team will get back to you within 24 hours.
                    </p>
                    <button
                      onClick={() => setSubmitted(false)}
                      className="px-8 py-3 bg-primary-600 text-white font-bold rounded-full hover:bg-primary-500 transition-colors">
                      Send Another Message
                    </button>
                  </div>
                ) : (
                  <>
                    <div className="mb-8">
                      <h2 className="text-2xl font-extrabold text-secondary-800 mb-2">Send Us a Message</h2>
                      <p className="text-gray-500">Fill in the form below and we'll respond as soon as possible.</p>
                    </div>

                    <form onSubmit={handleSubmit} className="space-y-5">
                      {/* Name row */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-secondary-700 mb-1.5" htmlFor="firstName">
                            First Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="firstName"
                            name="firstName"
                            type="text"
                            required
                            value={form.firstName}
                            onChange={handleChange}
                            placeholder="manzi"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-secondary-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-secondary-700 mb-1.5" htmlFor="lastName">
                            Last Name <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="lastName"
                            name="lastName"
                            type="text"
                            required
                            value={form.lastName}
                            onChange={handleChange}
                            placeholder="Chance"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-secondary-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Email & Phone */}
                      <div className="grid grid-cols-1 sm:grid-cols-2 gap-5">
                        <div>
                          <label className="block text-sm font-semibold text-secondary-700 mb-1.5" htmlFor="email">
                            Email Address <span className="text-red-500">*</span>
                          </label>
                          <input
                            id="email"
                            name="email"
                            type="email"
                            required
                            value={form.email}
                            onChange={handleChange}
                            placeholder="you@example.com"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-secondary-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                        <div>
                          <label className="block text-sm font-semibold text-secondary-700 mb-1.5" htmlFor="phone">
                            Phone Number
                          </label>
                          <input
                            id="phone"
                            name="phone"
                            type="tel"
                            value={form.phone}
                            onChange={handleChange}
                            placeholder="+250 780 000 000"
                            className="w-full px-4 py-3 border border-gray-200 rounded-xl text-secondary-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all"
                          />
                        </div>
                      </div>

                      {/* Subject */}
                      <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-1.5" htmlFor="subject">
                          Subject <span className="text-red-500">*</span>
                        </label>
                        <select
                          id="subject"
                          name="subject"
                          required
                          value={form.subject}
                          onChange={handleChange}
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-secondary-800 bg-white focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all appearance-none"
                        >
                          <option value="" disabled>Select a service or topic</option>
                          {SUBJECTS.map((s) => (
                            <option key={s} value={s}>{s}</option>
                          ))}
                        </select>
                      </div>

                      {/* Message */}
                      <div>
                        <label className="block text-sm font-semibold text-secondary-700 mb-1.5" htmlFor="message">
                          Message <span className="text-red-500">*</span>
                        </label>
                        <textarea
                          id="message"
                          name="message"
                          required
                          rows={6}
                          value={form.message}
                          onChange={handleChange}
                          placeholder="Tell us about your project, challenge, or question..."
                          className="w-full px-4 py-3 border border-gray-200 rounded-xl text-secondary-800 placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-primary-500 focus:border-transparent transition-all resize-none"
                        />
                      </div>

                      {/* Submit */}
                      <button
                        type="submit"
                        disabled={loading}
                        className="w-full inline-flex items-center justify-center gap-3 px-8 py-4 bg-primary-600 text-white font-bold rounded-full text-lg hover:bg-primary-500 disabled:opacity-60 disabled:cursor-not-allowed transition-all shadow-lg shadow-primary-600/30">
                        {loading ? (
                          <>
                            <svg className="w-5 h-5 animate-spin" fill="none" viewBox="0 0 24 24">
                              <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                              <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4z" />
                            </svg>
                            Sending…
                          </>
                        ) : (
                          <>
                            Send Message
                            <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M12 19l9 2-9-18-9 18 9-2zm0 0v-8" />
                            </svg>
                          </>
                        )}
                      </button>

                      <p className="text-xs text-gray-400 text-center">
                        We respect your privacy. Your information will never be shared with third parties.
                      </p>
                    </form>
                  </>
                )}
              </div>
            </div>

          </div>
        </div>
      </section>

    </div>
  );
};

export default ContactPage;
