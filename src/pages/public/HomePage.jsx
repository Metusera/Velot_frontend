import { Link } from 'react-router-dom';
import { useAuth } from '../../hooks/useAuth';

const SERVICES = [
  {
    label: 'Software',
    title: 'Custom Software Development',
    desc: 'We design and build robust web applications, mobile apps, and enterprise platforms tailored to solve real business problems — using modern technologies and global best practices.',
    img: 'https://images.unsplash.com/photo-1461749280684-dccba630e2f6?w=720&q=80',
    imgAlt: 'Developer writing code on a monitor',
  },
  {
    label: 'IoT',
    title: 'Internet of Things Solutions',
    desc: 'Smart, connected solutions for agriculture, cities, and industry — helping organisations monitor, automate, and optimise their operations in real time across Africa and beyond.',
    img: 'https://images.unsplash.com/photo-1518770660439-4636190af475?w=720&q=80',
    imgAlt: 'Circuit board representing IoT technology',
  },
  {
    label: 'AI & ML',
    title: 'Artificial Intelligence & Machine Learning',
    desc: 'From predictive analytics to intelligent automation — we build AI-powered systems that help organisations make smarter, faster decisions with confidence.',
    img: 'https://images.unsplash.com/photo-1677442135703-1787eea5ce01?w=720&q=80',
    imgAlt: 'AI and machine learning visualization',
  },
  {
    label: 'Data',
    title: 'Data Analytics & Reporting',
    desc: 'We turn raw data into clear, actionable insights through dashboards, reporting tools, and advanced analysis — giving your organisation the intelligence it needs to grow.',
    img: 'https://images.unsplash.com/photo-1551288049-bebda4e38f71?w=720&q=80',
    imgAlt: 'Data analytics dashboard on screen',
  },
  {
    label: 'Training',
    title: 'Technology Training & Capacity Building',
    desc: "Industry-aligned, hands-on training in software engineering, IoT, AI, and cloud — designed to upskill Africa's next generation of tech professionals and leaders.",
    img: 'https://images.unsplash.com/photo-1524178232363-1fb2b075b655?w=720&q=80',
    imgAlt: 'Training workshop with participants',
  },
  {
    label: 'Research',
    title: 'Research & Innovation',
    desc: 'Applied research in emerging technologies — from IoT sensor networks and AI models to data-driven policy insights — advancing knowledge that solves real-world challenges across Africa.',
    img: 'https://images.unsplash.com/photo-1582719508461-905c673771fd?w=720&q=80',
    imgAlt: 'Researcher working in a technology lab',
  },
];

const TEAM = [
  {
    name: 'Faith Lwakabamba',
    role: 'CEO',
    img: '/faith.jpeg',
    initials: 'FL',
    linkedin: 'https://www.linkedin.com/in/faith-lwakabamba-74558998/',
    twitter: 'https://x.com/faith_lwakabamba',
  },
  {
    name: 'Metusera NSENGIMANA',
    role: 'Director of Operations',
    img: '/Metusera.jpeg',
    initials: 'MN',
    linkedin: 'https://www.linkedin.com/in/nsengimana-metusera-89806a268/',
    twitter: 'https://x.com/metusera_n',
  },
  {
    name: 'Kagabo Riziki',
    role: 'General Manager',
    img: '/Riziki.jpg',
    initials: 'KR',
    linkedin: 'https://www.linkedin.com/in/kagabo-riziki-dsp-929a73275/',
    twitter: 'https://x.com/kagabo_riziki',
  },
];

const HomePage = () => {
  const { user } = useAuth();

  return (
    <div className="font-sans">

      {/* ── 1. HERO ── */}
      <section className="relative min-h-screen flex items-center overflow-hidden">
        {/* Background image */}
        <img
          src="https://images.unsplash.com/photo-1504384308090-c894fdcc538d?w=1920&q=80"
          alt="Technology workspace"
          className="absolute inset-0 w-full h-full object-cover object-center"
        />
        {/* Dark overlay */}
        <div className="absolute inset-0 bg-secondary-900/80" />
        {/* Gradient accent */}
        <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/60 via-transparent to-transparent" />

        <div className="relative max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-32 w-full">
          <div className="max-w-3xl">
            <div className="inline-flex items-center gap-2 bg-primary-600/20 border border-primary-600/30 rounded-full px-4 py-1.5 mb-8">
              <span className="w-2 h-2 rounded-full bg-primary-500 animate-pulse" />
              <span className="text-primary-300 text-sm font-semibold tracking-wide">Kigali, Rwanda</span>
            </div>

            <h1 className="text-5xl sm:text-6xl lg:text-7xl font-extrabold text-white leading-[1.1] mb-6">
              Innovating<br />
              Technology.<br />
              <span className="text-primary-400">Building Africa's</span><br />
              <span className="text-primary-400">Digital Future.</span>
            </h1>

            <p className="text-gray-300 text-xl sm:text-2xl mb-10 max-w-2xl leading-relaxed font-light">
              We deliver cutting-edge software, IoT, AI, and data solutions — while training Africa's next generation of tech professionals.
            </p>

            <div className="flex flex-wrap gap-4">
              <a href="#services"
                className="inline-flex items-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-full text-lg hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/30">
                Explore Our Services
                <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                </svg>
              </a>
              <Link to="/contact"
                className="inline-flex items-center gap-2 px-8 py-4 bg-white/10 text-white font-semibold rounded-full text-lg border border-white/20 hover:bg-white/20 transition-all backdrop-blur-sm">
                Contact Us
              </Link>
            </div>
          </div>
        </div>

        {/* Bottom fade */}
        <div className="absolute bottom-0 left-0 right-0 h-28 bg-gradient-to-t from-white to-transparent" />
      </section>

      {/* ── 2. MISSION & VISION ── */}
      <section className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest bg-primary-50 px-4 py-1.5 rounded-full mb-4">Who We Are</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-800 mb-4 leading-tight">
              Our Mission & Vision
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              Everything we do is guided by a clear purpose and an ambitious vision for Africa's technological future.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
            <div className="relative p-10 bg-secondary-800 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="absolute top-0 right-0 w-56 h-56 bg-primary-600/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-primary-600 rounded-2xl flex items-center justify-center mb-6 shadow-lg shadow-primary-600/30">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M13 10V3L4 14h7v7l9-11h-7z" />
                  </svg>
                </div>
                <p className="text-primary-400 text-sm font-bold uppercase tracking-widest mb-3">Mission</p>
                <h3 className="text-2xl font-extrabold text-white mb-4">What Drives Us Every Day</h3>
                <p className="text-gray-300 leading-relaxed text-lg">
                  To empower African organisations and individuals through innovative technology solutions, applied research, and practical training — bridging the digital divide and building local capacity for sustainable growth.
                </p>
              </div>
            </div>

            <div className="relative p-10 bg-gradient-to-br from-primary-500 to-primary-700 rounded-3xl overflow-hidden hover:shadow-2xl transition-shadow">
              <div className="absolute bottom-0 left-0 w-56 h-56 bg-white/10 rounded-full blur-3xl" />
              <div className="relative">
                <div className="w-16 h-16 bg-white/20 rounded-2xl flex items-center justify-center mb-6 shadow-lg">
                  <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                  </svg>
                </div>
                <p className="text-white/70 text-sm font-bold uppercase tracking-widest mb-3">Vision</p>
                <h3 className="text-2xl font-extrabold text-white mb-4">Where We're Headed</h3>
                <p className="text-primary-100 leading-relaxed text-lg">
                  To become Africa's leading technology partner — recognised for delivering world-class software, IoT, AI, and data solutions that transform industries and create a thriving ecosystem of skilled tech professionals.
                </p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ── 3. SERVICES (alternating rows with photos) ── */}
      <section id="services">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 pt-16 pb-8 text-center">
          <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest bg-primary-50 px-4 py-1.5 rounded-full mb-4">What We Do</span>
          <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-800 mb-4 leading-tight">
            End-to-End Technology Solutions
          </h2>
          <p className="text-gray-500 text-lg leading-relaxed max-w-2xl mx-auto">
            From building enterprise software to training your workforce — everything organisations need to thrive in the digital economy.
          </p>
        </div>

        {SERVICES.map((svc, i) => {
          const isEven = i % 2 === 0;
          return (
            <div key={svc.title} className={`py-6 ${isEven ? 'bg-white' : 'bg-gray-50'}`}>
              <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-10">
                <div className={`flex flex-col ${isEven ? 'md:flex-row' : 'md:flex-row-reverse'} gap-12 items-center`}>

                  {/* Photo */}
                  <div className="w-full md:w-5/12 flex-shrink-0">
                    <div className="relative rounded-3xl overflow-hidden shadow-2xl h-72 sm:h-80">
                      <img
                        src={svc.img}
                        alt={svc.imgAlt}
                        className="w-full h-full object-cover object-center transition-transform duration-500 hover:scale-105"
                      />
                      {/* label badge over image */}
                      <div className="absolute top-4 left-4">
                        <span className="bg-primary-600 text-white text-xs font-bold uppercase tracking-widest px-3 py-1.5 rounded-full shadow">
                          {svc.label}
                        </span>
                      </div>
                    </div>
                  </div>

                  {/* Text */}
                  <div className="w-full md:w-7/12">
                    <span className="inline-block text-primary-600 font-bold text-xs uppercase tracking-widest bg-primary-50 px-3 py-1 rounded-full mb-4">
                      {svc.label}
                    </span>
                    <h3 className="text-3xl sm:text-4xl font-extrabold text-secondary-800 mb-4 leading-tight">
                      {svc.title}
                    </h3>
                    <p className="text-gray-500 text-lg leading-relaxed mb-7">
                      {svc.desc}
                    </p>
                    <Link to="/contact"
                      className="inline-flex items-center gap-2 px-7 py-3.5 bg-secondary-700 text-white font-semibold rounded-full hover:bg-primary-600 transition-all group shadow-lg">
                      Get Started
                      <svg className="w-4 h-4 group-hover:translate-x-1 transition-transform" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                      </svg>
                    </Link>
                  </div>

                </div>
              </div>
            </div>
          );
        })}
      </section>

      {/* ── 4. WHY CHOOSE US ── */}
      <section className="py-24 bg-secondary-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-primary-400 font-bold text-sm uppercase tracking-widest bg-primary-600/20 px-4 py-1.5 rounded-full mb-4">Why VeloT Africa</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
              Built for Africa. Built for Impact.
            </h2>
            <p className="text-gray-400 text-lg leading-relaxed">
              We combine world-class technical capability with deep local knowledge to deliver technology that creates lasting value.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {[
              { title: 'African-Focused', desc: 'Solutions engineered for African markets, challenges, and opportunities.', icon: '🌍' },
              { title: 'Expert Team', desc: 'Seasoned engineers, scientists, and consultants across every tech domain.', icon: '👥' },
              { title: 'End-to-End', desc: 'Full lifecycle ownership — from discovery to deployment and ongoing support.', icon: '🔄' },
              { title: 'Proven Results', desc: 'Dozens of projects delivered and hundreds of professionals trained.', icon: '📈' },
            ].map((item) => (
              <div key={item.title}
                className="bg-white/5 border border-white/10 rounded-2xl p-7 hover:bg-white/10 hover:border-primary-600/40 transition-all duration-200">
                <div className="text-4xl mb-4">{item.icon}</div>
                <h3 className="text-lg font-bold text-white mb-2">{item.title}</h3>
                <p className="text-gray-400 text-sm leading-relaxed">{item.desc}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 5. STATS ── */}
      <section className="py-20 bg-primary-600">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            {[
              { value: '50+', label: 'Professionals Trained' },
              { value: '15+', label: 'Projects Delivered' },
              { value: '5+', label: 'Enterprise Clients' },
              { value: '90%', label: 'Client Satisfaction' },
            ].map((s) => (
              <div key={s.label}>
                <p className="text-4xl sm:text-5xl font-extrabold text-white mb-1">{s.value}</p>
                <p className="text-primary-100 text-sm font-medium">{s.label}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 6. TEAM ── */}
      <section id="team" className="py-24 bg-white">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="text-center max-w-2xl mx-auto mb-16">
            <span className="inline-block text-primary-600 font-bold text-sm uppercase tracking-widest bg-primary-50 px-4 py-1.5 rounded-full mb-4">Our People</span>
            <h2 className="text-4xl sm:text-5xl font-extrabold text-secondary-800 mb-4 leading-tight">
              Meet the Team
            </h2>
            <p className="text-gray-500 text-lg leading-relaxed">
              A passionate group of professionals working together to drive Africa's digital transformation.
            </p>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-3 gap-8 max-w-4xl mx-auto">
            {TEAM.map((member) => (
              <div key={member.name}
                className="group text-center bg-gray-50 border border-gray-200 rounded-3xl overflow-hidden hover:border-primary-400 hover:shadow-2xl transition-all duration-300">
                {/* Photo */}
                <div className="relative h-60 overflow-hidden">
                  <img
                    src={member.img}
                    alt={member.name}
                    className="w-full h-full object-cover object-top group-hover:scale-105 transition-transform duration-500"
                    onError={(e) => {
                      e.target.style.display = 'none';
                      e.target.nextSibling.style.display = 'flex';
                    }}
                  />
                  {/* Fallback initials */}
                  <div className="hidden w-full h-full bg-secondary-700 items-center justify-center">
                    <span className="text-white text-4xl font-extrabold">{member.initials}</span>
                  </div>
                  {/* Gradient overlay at bottom */}
                  <div className="absolute bottom-0 left-0 right-0 h-16 bg-gradient-to-t from-gray-50 to-transparent" />
                </div>
                {/* Info */}
                <div className="px-6 pb-7 pt-3">
                  <h3 className="text-xl font-extrabold text-secondary-800 mb-0.5">{member.name}</h3>
                  <p className="text-primary-600 text-sm font-bold mb-4 uppercase tracking-wide">{member.role}</p>
                  {/* Social links */}
                  <div className="flex items-center justify-center gap-3">
                    <a href={member.linkedin} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary-600 hover:bg-primary-600 hover:text-white hover:border-primary-600 transition-all shadow-sm">
                      {/* LinkedIn icon */}
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M20.447 20.452h-3.554v-5.569c0-1.328-.027-3.037-1.852-3.037-1.853 0-2.136 1.445-2.136 2.939v5.667H9.351V9h3.414v1.561h.046c.477-.9 1.637-1.85 3.37-1.85 3.601 0 4.267 2.37 4.267 5.455v6.286zM5.337 7.433a2.062 2.062 0 01-2.063-2.065 2.064 2.064 0 112.063 2.065zm1.782 13.019H3.555V9h3.564v11.452zM22.225 0H1.771C.792 0 0 .774 0 1.729v20.542C0 23.227.792 24 1.771 24h20.451C23.2 24 24 23.227 24 22.271V1.729C24 .774 23.2 0 22.222 0h.003z" />
                      </svg>
                    </a>
                    <a href={member.twitter} target="_blank" rel="noopener noreferrer"
                      className="w-9 h-9 bg-white border border-gray-200 rounded-lg flex items-center justify-center text-secondary-600 hover:bg-secondary-800 hover:text-white hover:border-secondary-800 transition-all shadow-sm">
                      {/* X (Twitter) icon */}
                      <svg className="w-4 h-4" fill="currentColor" viewBox="0 0 24 24">
                        <path d="M18.244 2.25h3.308l-7.227 8.26 8.502 11.24H16.17l-5.214-6.817L4.99 21.75H1.68l7.73-8.835L1.254 2.25H8.08l4.713 6.231zm-1.161 17.52h1.833L7.084 4.126H5.117z" />
                      </svg>
                    </a>
                  </div>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* ── 7. CONTACT CTA ── */}
      <section id="contact" className="py-24 bg-gray-50">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="relative bg-secondary-800 rounded-3xl overflow-hidden">
            {/* Background photo */}
            <img
              src="https://images.unsplash.com/photo-1521737604893-d14cc237f11d?w=1600&q=80"
              alt="Team collaboration"
              className="absolute inset-0 w-full h-full object-cover opacity-20"
            />
            <div className="absolute inset-0 bg-gradient-to-r from-secondary-900/90 to-secondary-800/70" />

            <div className="relative grid grid-cols-1 md:grid-cols-2 gap-12 items-center p-12 sm:p-20">
              <div>
                <span className="inline-block text-primary-400 font-bold text-sm uppercase tracking-widest bg-primary-600/20 px-4 py-1.5 rounded-full mb-6">Get In Touch</span>
                <h2 className="text-4xl sm:text-5xl font-extrabold text-white mb-4 leading-tight">
                  Let's Build Something Great Together
                </h2>
                <p className="text-gray-300 text-lg leading-relaxed mb-8">
                  Have a project in mind, need a technology partner, or want to train your team? We'd love to hear from you.
                </p>
                <div className="space-y-4">
                  <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 8l7.89 5.26a2 2 0 002.22 0L21 8M5 19h14a2 2 0 002-2V7a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z" />
                    </svg>
                    info@velotafrica.com
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M3 5a2 2 0 012-2h3.28a1 1 0 01.948.684l1.498 4.493a1 1 0 01-.502 1.21l-2.257 1.13a11.042 11.042 0 005.516 5.516l1.13-2.257a1 1 0 011.21-.502l4.493 1.498a1 1 0 01.684.949V19a2 2 0 01-2 2h-1C9.716 21 3 14.284 3 6V5z" />
                    </svg>
                    +250 788 930 475
                  </div>
                  <div className="flex items-center gap-3 text-gray-300">
                    <svg className="w-5 h-5 text-primary-400 flex-shrink-0" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M17.657 16.657L13.414 20.9a1.998 1.998 0 01-2.827 0l-4.244-4.243a8 8 0 1111.314 0z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="1.5" d="M15 11a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Kigali, Rwanda
                  </div>
                </div>
              </div>

              <div className="flex flex-col gap-4">
                <Link to="/contact"
                  className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-primary-600 text-white font-bold rounded-full text-lg hover:bg-primary-500 transition-all shadow-xl shadow-primary-600/30">
                  Send Us a Message
                  <svg className="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth="2" d="M17 8l4 4m0 0l-4 4m4-4H3" />
                  </svg>
                </Link>
                
                {!user && (
                  <Link to="/signup"
                    className="inline-flex items-center justify-center gap-2 px-8 py-4 bg-white/5 text-white font-semibold rounded-full border border-white/10 hover:bg-white/10 transition-all">
                    Create a Free Account
                  </Link>
                )}
              </div>
            </div>
          </div>
        </div>
      </section>

    </div>
  );
};

export default HomePage;
