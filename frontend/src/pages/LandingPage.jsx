import { useState } from 'react'
import {
  BookOpen,
  IndianRupee,
  MapPin,
  Building2,
  Home,
  FileText,
  Calendar,
  PhoneCall,
  Sparkles,
  Bot,
  ArrowRight,
  Sun,
  Moon,
  ShieldCheck,
  Award,
  Users,
  GraduationCap,
  ExternalLink,
  LogIn,
  LogOut,
  UserCheck,
  Cpu,
  Trophy,
  Coffee,
  HeartPulse,
  Briefcase,
  X,
  CheckCircle2,
  Clock,
  Info,
  ChevronRight,
} from 'lucide-react'
import campusHeroImg from '../assets/daviet_campus_hero_transparent.png'
import { useAuth } from '../context/AuthContext'

const EXPLORE_TOPICS = [
  {
    id: 'academics',
    title: 'Academics & Courses',
    subtitle: 'B.Tech, M.Tech, MBA, MCA, syllabus & PTU regulations',
    icon: BookOpen,
    iconColor: '#7c3aed',
    iconBg: '#ede4ff',
    prompt: 'What engineering programs, syllabus, and academic courses are offered at DAVIET?',
  },
  {
    id: 'fees',
    title: 'Fee Structure',
    subtitle: 'Tuition fees, semester payments & university charges',
    icon: IndianRupee,
    iconColor: '#059669',
    iconBg: '#d1fae5',
    prompt: 'What is the B.Tech fee structure and payment schedule as per IKG-PTU university guidelines?',
  },
  {
    id: 'location',
    title: 'Campus Navigation',
    subtitle: 'Knowledge Centre, TPO, Auditorium, R&D & Core Block',
    icon: MapPin,
    iconColor: '#e11d48',
    iconBg: '#ffe4e6',
    prompt: 'Where is the Training and Placement Office and Central Library on campus?',
  },
  {
    id: 'departments',
    title: 'Departments & Labs',
    subtitle: 'CSE, AI & ML, ECE, EE, ME, CE & Applied Sciences',
    icon: Building2,
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
    prompt: 'Tell me about the Computer Science and other Engineering Departments at DAVIET.',
  },
  {
    id: 'hostel',
    title: 'Hostels & Mess',
    subtitle: 'Sutlej, Beas & Raavi hostels, mess menu & security',
    icon: Home,
    iconColor: '#9333ea',
    iconBg: '#f3e8ff',
    prompt: 'What hostel facilities, mess timings, and accommodation options are available for students?',
  },
  {
    id: 'admissions',
    title: 'Admissions 2026',
    subtitle: 'Eligibility criteria, annual intake & registration',
    icon: FileText,
    iconColor: '#ea580c',
    iconBg: '#ffedd5',
    prompt: 'What is the admission procedure, eligibility criteria, and intake for DAVIET?',
  },
  {
    id: 'timetable',
    title: 'Hours & Timetable',
    subtitle: 'Working hours (9 AM - 5 PM), lecture slots & library',
    icon: Calendar,
    iconColor: '#0284c7',
    iconBg: '#e0f2fe',
    prompt: 'What are the college working hours, class timetable patterns, and academic calendar dates?',
  },
  {
    id: 'contact',
    title: 'Contacts & Helpline',
    subtitle: 'Principal office, TPO, anti-ragging & emails',
    icon: PhoneCall,
    iconColor: '#c026d3',
    iconBg: '#fae8ff',
    prompt: 'What are the official contact numbers, email addresses, and administration office details of DAVIET?',
  },
]

const CAMPUS_FACILITIES = [
  {
    id: 'library',
    title: 'Central Knowledge Centre & Library',
    category: 'Academic & Digital Resources',
    badge: '35,000+ Books',
    icon: BookOpen,
    iconColor: '#7c3aed',
    iconBg: '#ede4ff',
    desc: 'State-of-the-art 3-storey air-conditioned Knowledge Centre equipped with over 35,000 volumes, IEEE e-journals, DELNET access, and quiet study pods.',
    highlights: [
      'Access to IEEE, Springer & DELNET e-resources',
      'High-speed multimedia digital library section',
      'Working hours: 8:00 AM to 8:00 PM (extended during exams)',
      'Automated book issue/return with OPAC catalog',
    ],
    prompt: 'Tell me in detail about the Central Library, e-resources, working hours, and book issuing rules at DAVIET.',
    location: 'Central Knowledge Centre Block',
    timings: '8:00 AM - 8:00 PM (Mon-Sat)',
  },
  {
    id: 'labs',
    title: 'Advanced AI & Engineering Labs',
    category: 'Research & Innovation',
    badge: 'High-Performance Computing',
    icon: Cpu,
    iconColor: '#2563eb',
    iconBg: '#dbeafe',
    desc: 'Modern specialized labs for Artificial Intelligence, Machine Learning, Robotics, Embedded Systems, IoT, and CNC manufacturing.',
    highlights: [
      'NVIDIA GPU workstations for AI & Deep Learning',
      '1 Gbps dedicated campus fiber internet',
      'IoT development kits & 3D printing facility',
      'Industry-standard software (MATLAB, SolidWorks, Cadence)',
    ],
    prompt: 'What engineering and AI research laboratories, software tools, and computing facilities exist at DAVIET?',
    location: 'Core Engineering Blocks (CSE, ECE, ME, EE)',
    timings: '9:00 AM - 5:00 PM (Extended research hours)',
  },
  {
    id: 'hostels',
    title: 'Student Hostels & Mess',
    category: 'Residential & Dining',
    badge: '24/7 Security & Wi-Fi',
    icon: Building2,
    iconColor: '#9333ea',
    iconBg: '#f3e8ff',
    desc: 'Separate, well-furnished hostels for boys (Sutlej & Beas) and girls (Raavi) with hygienic 4-time mess, RO water, and sports courts inside grounds.',
    highlights: [
      'Air-conditioned & air-cooled room choices',
      'Hygienic mess serving 4 nutritious meals daily',
      '24/7 power backup and high-speed Wi-Fi',
      'Biometric access, security guards & resident wardens',
    ],
    prompt: 'What are the hostel room types, mess menus, security rules, and fee structures for DAVIET hostels?',
    location: 'DAVIET Residential Zone (Sutlej, Beas & Raavi)',
    timings: '24/7 Residential Security',
  },
  {
    id: 'auditorium',
    title: 'Lala Lajpat Rai Auditorium',
    category: 'Events & Culture',
    badge: '1200+ Capacity',
    icon: Users,
    iconColor: '#e11d48',
    iconBg: '#ffe4e6',
    desc: 'A grand 1200-seat fully air-conditioned auditorium with theatrical lighting, dolby surround acoustics, and green rooms for mega campus events.',
    highlights: [
      'Venue for Annual Youth Fest "Aagaz"',
      'National conferences, seminars & tech summits',
      'State-of-the-art audio-visual presentation systems',
      'Spacious foyer & VIP reception lounge',
    ],
    prompt: 'Tell me about the Auditorium capacity, annual fests like Aagaz, and event halls at DAVIET.',
    location: 'Main Administrative Complex',
    timings: 'As per event schedule',
  },
  {
    id: 'sports',
    title: 'Sports Complex & Fitness Gym',
    category: 'Athletics & Wellness',
    badge: 'Multi-Sport Arena',
    icon: Trophy,
    iconColor: '#059669',
    iconBg: '#d1fae5',
    desc: 'Expansive sports grounds featuring cricket pitches, football field, basketball court, volleyball arena, indoor badminton, and a modern gym.',
    highlights: [
      'Fully equipped weight-training & cardio gymnasium',
      'Professional coaches for inter-college tournaments',
      'Table Tennis, Chess, and Carrom indoor lounge',
      'Annual Athletic Meet and Sports Day celebrations',
    ],
    prompt: 'What sports grounds, athletic courts, and fitness gymnasium facilities are available for students at DAVIET?',
    location: 'DAVIET Sports Grounds & Gym Block',
    timings: '6:00 AM - 8:00 AM & 4:00 PM - 7:00 PM',
  },
  {
    id: 'cafeteria',
    title: 'Campus Cafeteria & Food Court',
    category: 'Refreshments & Social',
    badge: 'Nescafe & Food Court',
    icon: Coffee,
    iconColor: '#ea580c',
    iconBg: '#ffedd5',
    desc: 'Vibrant dining area with a branded Nescafe hub, multi-cuisine food joint, fresh juices, and open-air seating plazas for student socializing.',
    highlights: [
      'Freshly prepared North Indian, South Indian & Chinese dishes',
      'Hygienic preparation standards at affordable student pricing',
      'Branded Nescafe coffee & snack lounge',
      'Comfortable outdoor shaded seating area',
    ],
    prompt: 'What options, menu items, and dining facilities are present at the DAVIET campus cafeteria?',
    location: 'Central Campus Plaza',
    timings: '8:30 AM - 6:00 PM',
  },
  {
    id: 'health',
    title: 'Medical Center & Health Services',
    category: 'Health & First Aid',
    badge: '24/7 First-Aid',
    icon: HeartPulse,
    iconColor: '#0284c7',
    iconBg: '#e0f2fe',
    desc: 'On-campus medical clinic providing routine health checkups, emergency first-aid, qualified medical officer, and 24/7 ambulance service.',
    highlights: [
      'Qualified resident doctor and nursing staff',
      'Free consultation & essential medicines for students',
      '24/7 dedicated campus emergency ambulance on standby',
      'Tie-up with leading super-specialty hospitals in Jalandhar',
    ],
    prompt: 'What medical clinic, ambulance, and healthcare support is available on campus at DAVIET?',
    location: 'Ground Floor, Administrative Block',
    timings: '24/7 Emergency Support',
  },
  {
    id: 'tpo',
    title: 'Training & Placement Office (TPO)',
    category: 'Career & Corporate Engagement',
    badge: 'Top Recruiters Support',
    icon: Briefcase,
    iconColor: '#c026d3',
    iconBg: '#fae8ff',
    desc: 'Dedicated corporate block with mock interview cabins, group discussion rooms, presentation halls, and career counseling suites.',
    highlights: [
      'Corporate drive halls with high-speed testing setups',
      'Dedicated GD rooms & 1-on-1 interview suites',
      'Pre-placement training & skill enhancement workshops',
      'Placement records and company interaction lounge',
    ],
    prompt: 'Where is the Training and Placement Office (TPO) located and what recruitment facilities does it provide?',
    location: 'TPO Complex, Knowledge Centre Annex',
    timings: '9:00 AM - 5:00 PM (Mon-Fri)',
  },
]

export default function LandingPage({ onOpenChat, theme, onToggleTheme }) {
  const isDark = theme === 'dark'
  const { user, openAuthModal, logout } = useAuth()
  const [activeFacilityModal, setActiveFacilityModal] = useState(null)

  return (
    <div className="landing-page">
      {/* Top Navbar */}
      <header className="landing-navbar">
        <div className="landing-navbar__inner">
          <div className="landing-brand">
            <div className="landing-brand__emblem">DAV</div>
            <div className="landing-brand__text">
              <span className="landing-brand__name">DAVIET Jalandhar</span>
              <span className="landing-brand__sub">Smart Campus Portal</span>
            </div>
          </div>

          <nav className="landing-nav-links">
            <a href="#explore" className="landing-nav-link">Academics</a>
            <a href="#facilities" className="landing-nav-link">Facilities</a>
            <a href="#about" className="landing-nav-link">About</a>
            <a href="https://davietjal.org" target="_blank" rel="noopener noreferrer" className="landing-nav-link external">
              Official Portal <ExternalLink size={13} />
            </a>
          </nav>

          <div className="landing-nav-actions">
            <button
              type="button"
              className="landing-theme-toggle"
              onClick={onToggleTheme}
              aria-label="Toggle theme"
            >
              {isDark ? <Sun size={18} /> : <Moon size={18} />}
            </button>

            {user ? (
              <div className="landing-user-profile">
                <div className="landing-user-chip" title={user.email}>
                  <div className="landing-user-avatar">
                    {user.name ? user.name.charAt(0).toUpperCase() : 'U'}
                  </div>
                  <div className="landing-user-details">
                    <span className="landing-user-name">{user.name}</span>
                    <span className="landing-user-role">Student</span>
                  </div>
                </div>
                <button
                  type="button"
                  className="landing-logout-btn"
                  onClick={logout}
                  title="Sign out of account"
                >
                  <LogOut size={16} />
                  <span className="landing-logout-text">Sign Out</span>
                </button>
              </div>
            ) : (
              <div className="landing-auth-buttons">
                <button
                  type="button"
                  className="landing-signin-btn"
                  onClick={() => openAuthModal('login')}
                >
                  <LogIn size={15} />
                  <span>Sign In</span>
                </button>
                <button
                  type="button"
                  className="landing-signup-btn"
                  onClick={() => openAuthModal('signup')}
                >
                  <span>Sign Up</span>
                </button>
              </div>
            )}

            <button
              type="button"
              className="landing-cta-btn"
              onClick={() => onOpenChat?.()}
            >
              <Sparkles size={16} />
              <span>Ask Campus AI</span>
            </button>
          </div>
        </div>
      </header>

      <main className="landing-content">
        {/* Hero Section */}
        <section className="landing-hero">
          <div className="landing-hero__grid">
            <div className="landing-hero__text">
              <div className="landing-pill">
                <span className="landing-pill__dot" />
                <span>AI-Powered Smart Campus</span>
                <span className="landing-pill__sep">•</span>
                <span>IKG-PTU Affiliated</span>
              </div>

              <h1 className="landing-hero__title">
                DAV Institute of Engineering &amp; Technology
              </h1>

              <p className="landing-hero__desc">
                {user ? (
                  <>Welcome back, <strong>{user.name}</strong>! Your chat sessions and questions are securely saved to your student profile. Ask about courses, exams, fees, or faculty anytime.</>
                ) : (
                  <>Welcome to the next-generation DAVIET Smart Campus Portal. Explore programs, fee structures, admissions, and get instant verified answers from our AI Assistant 24/7.</>
                )}
              </p>

              <div className="landing-hero__actions">
                <button
                  type="button"
                  className="landing-btn-primary"
                  onClick={() => onOpenChat?.()}
                >
                  <Bot size={18} />
                  <span>Chat with Campus AI</span>
                  <ArrowRight size={16} />
                </button>

                {!user && (
                  <button
                    type="button"
                    className="landing-btn-secondary"
                    onClick={() => openAuthModal('signup')}
                  >
                    <UserCheck size={16} />
                    <span>Create Free Account</span>
                  </button>
                )}

                <a href="#explore" className="landing-btn-secondary">
                  <span>Explore Academics</span>
                </a>
              </div>

              <div className="landing-badges">
                <div className="landing-badge">
                  <Award size={15} className="landing-badge-icon" />
                  <span>NAAC Accredited</span>
                </div>
                <div className="landing-badge">
                  <ShieldCheck size={15} className="landing-badge-icon" />
                  <span>AICTE Approved</span>
                </div>
                <div className="landing-badge">
                  <GraduationCap size={15} className="landing-badge-icon" />
                  <span>IKG-PTU Affiliation</span>
                </div>
              </div>
            </div>

            <div className="landing-hero__visual">
              <div className="landing-hero__glow" />
              <img
                src={campusHeroImg}
                alt="DAVIET Campus Building Illustration"
                className="landing-hero__image"
              />
            </div>
          </div>
        </section>

        {/* Quick Stats Bar */}
        <section className="landing-stats">
          <div className="landing-stats__inner">
            <div className="landing-stat-card">
              <span className="stat-number">24+</span>
              <span className="stat-label">Years of Excellence</span>
            </div>
            <div className="landing-stat-card">
              <span className="stat-number">6+</span>
              <span className="stat-label">Engineering Streams</span>
            </div>
            <div className="landing-stat-card">
              <span className="stat-number">1200+</span>
              <span className="stat-label">Auditorium Capacity</span>
            </div>
            <div className="landing-stat-card">
              <span className="stat-number">24/7</span>
              <span className="stat-label">AI Campus Assistance</span>
            </div>
          </div>
        </section>

        {/* Explore DAVIET Grid */}
        <section id="explore" className="landing-explore">
          <div className="landing-section-header">
            <h2 className="landing-section-title">Explore DAVIET &amp; Ask Instant Questions</h2>
            <p className="landing-section-subtitle">
              Click any topic to launch the AI Assistant with instant answers from verified college records.
            </p>
          </div>

          <div className="landing-grid">
            {EXPLORE_TOPICS.map((topic) => {
              const IconComp = topic.icon
              return (
                <div
                  key={topic.id}
                  className="landing-card"
                  onClick={() => onOpenChat?.(topic.prompt)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      onOpenChat?.(topic.prompt)
                    }
                  }}
                >
                  <div
                    className="landing-card__icon"
                    style={{ background: topic.iconBg, color: topic.iconColor }}
                  >
                    <IconComp size={22} strokeWidth={2.2} />
                  </div>
                  <h3 className="landing-card__title">{topic.title}</h3>
                  <p className="landing-card__subtitle">{topic.subtitle}</p>
                  <div className="landing-card__action">
                    <span>Ask AI</span>
                    <ArrowRight size={14} />
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* Facilities Section */}
        <section id="facilities" className="landing-facilities">
          <div className="landing-section-header">
            <div className="landing-pill" style={{ margin: '0 auto 1rem' }}>
              <span className="landing-pill__dot" />
              <span>Campus Infrastructure</span>
            </div>
            <h2 className="landing-section-title">World-Class Campus Facilities</h2>
            <p className="landing-section-subtitle">
              Explore DAVIET's state-of-the-art Knowledge Centre, AI research labs, modern hostels, auditorium, and sports arenas. Click any facility for full details or to consult the AI Assistant.
            </p>
          </div>

          <div className="facilities-grid">
            {CAMPUS_FACILITIES.map((facility) => {
              const IconComp = facility.icon
              return (
                <div
                  key={facility.id}
                  className="facility-card"
                  onClick={() => setActiveFacilityModal(facility)}
                  role="button"
                  tabIndex={0}
                  onKeyDown={(e) => {
                    if (e.key === 'Enter' || e.key === ' ') {
                      setActiveFacilityModal(facility)
                    }
                  }}
                >
                  <div className="facility-card__header">
                    <div
                      className="facility-card__icon"
                      style={{ background: facility.iconBg, color: facility.iconColor }}
                    >
                      <IconComp size={22} strokeWidth={2.2} />
                    </div>
                    <span className="facility-card__badge">{facility.badge}</span>
                  </div>

                  <span className="facility-card__category">{facility.category}</span>
                  <h3 className="facility-card__title">{facility.title}</h3>
                  <p className="facility-card__desc">{facility.desc}</p>

                  <div className="facility-card__meta">
                    <div className="facility-meta-item">
                      <MapPin size={13} />
                      <span>{facility.location}</span>
                    </div>
                    <div className="facility-meta-item">
                      <Clock size={13} />
                      <span>{facility.timings}</span>
                    </div>
                  </div>

                  <div className="facility-card__actions">
                    <button
                      type="button"
                      className="facility-btn-details"
                      onClick={(e) => {
                        e.stopPropagation()
                        setActiveFacilityModal(facility)
                      }}
                    >
                      <Info size={14} />
                      <span>View Details</span>
                    </button>
                    <button
                      type="button"
                      className="facility-btn-ai"
                      onClick={(e) => {
                        e.stopPropagation()
                        onOpenChat?.(facility.prompt)
                      }}
                      title="Ask AI Assistant about this facility"
                    >
                      <Bot size={14} />
                      <span>Ask AI</span>
                      <ArrowRight size={13} />
                    </button>
                  </div>
                </div>
              )
            })}
          </div>
        </section>

        {/* About DAVIET Section */}
        <section id="about" className="landing-about">
          <div className="landing-about__inner">
            <div className="landing-about__card">
              <h2 className="landing-about__title">About DAVIET, Jalandhar</h2>
              <p className="landing-about__text">
                DAV Institute of Engineering &amp; Technology (DAVIET) was established in 2001 under the aegis of the DAV College Managing Committee (DAVCMC), New Delhi — the largest non-governmental educational organization in India.
              </p>
              <p className="landing-about__text">
                Situated in Kabir Nagar, Jalandhar, Punjab, the institute offers undergraduate and postgraduate programmes in Computer Science, AI &amp; ML, Electronics, Electrical, Mechanical, and Civil Engineering, approved by AICTE and affiliated to I.K. Gujral Punjab Technical University (IKG-PTU).
              </p>
              <div className="landing-about__links">
                <a
                  href="https://davietjal.org"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="landing-btn-secondary"
                >
                  Visit Official Website <ExternalLink size={14} />
                </a>
              </div>
            </div>
          </div>
        </section>
      </main>

      {/* Facility Detail Interactive Modal */}
      {activeFacilityModal && (
        <div
          className="facility-modal-overlay"
          onClick={() => setActiveFacilityModal(null)}
        >
          <div
            className="facility-modal"
            onClick={(e) => e.stopPropagation()}
            role="dialog"
            aria-modal="true"
          >
            <button
              type="button"
              className="facility-modal__close"
              onClick={() => setActiveFacilityModal(null)}
              aria-label="Close modal"
            >
              <X size={18} />
            </button>

            <div className="facility-modal__header">
              <div
                className="facility-modal__icon"
                style={{
                  background: activeFacilityModal.iconBg,
                  color: activeFacilityModal.iconColor,
                }}
              >
                {(() => {
                  const IconComp = activeFacilityModal.icon
                  return <IconComp size={28} strokeWidth={2.2} />
                })()}
              </div>
              <div className="facility-modal__header-text">
                <span className="facility-modal__category">{activeFacilityModal.category}</span>
                <h2 className="facility-modal__title">{activeFacilityModal.title}</h2>
                <span className="facility-modal__badge">{activeFacilityModal.badge}</span>
              </div>
            </div>

            <div className="facility-modal__body">
              <p className="facility-modal__desc">{activeFacilityModal.desc}</p>

              <div className="facility-modal__info-grid">
                <div className="facility-info-box">
                  <MapPin size={16} className="facility-info-icon" />
                  <div>
                    <span className="facility-info-label">Campus Location</span>
                    <span className="facility-info-value">{activeFacilityModal.location}</span>
                  </div>
                </div>
                <div className="facility-info-box">
                  <Clock size={16} className="facility-info-icon" />
                  <div>
                    <span className="facility-info-label">Operating Hours</span>
                    <span className="facility-info-value">{activeFacilityModal.timings}</span>
                  </div>
                </div>
              </div>

              <div className="facility-modal__highlights">
                <h4 className="facility-highlights-title">Key Highlights &amp; Features</h4>
                <ul className="facility-highlights-list">
                  {activeFacilityModal.highlights.map((item, idx) => (
                    <li key={idx} className="facility-highlight-item">
                      <CheckCircle2 size={16} className="facility-check-icon" />
                      <span>{item}</span>
                    </li>
                  ))}
                </ul>
              </div>
            </div>

            <div className="facility-modal__footer">
              <button
                type="button"
                className="facility-modal-btn-secondary"
                onClick={() => setActiveFacilityModal(null)}
              >
                Close
              </button>
              <button
                type="button"
                className="facility-modal-btn-primary"
                onClick={() => {
                  const prompt = activeFacilityModal.prompt
                  setActiveFacilityModal(null)
                  onOpenChat?.(prompt)
                }}
              >
                <Bot size={17} />
                <span>Ask AI About This Facility</span>
                <ChevronRight size={16} />
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Floating Chat Trigger Button */}
      <button
        type="button"
        className="landing-floating-chat"
        onClick={() => onOpenChat?.()}
        aria-label="Open AI Assistant"
      >
        <div className="floating-chat-icon">
          <Bot size={22} />
          <span className="floating-chat-dot" />
        </div>
        <span className="floating-chat-text">Ask DAVIET AI</span>
      </button>

      {/* Footer */}
      <footer className="landing-footer">
        <div className="landing-footer__inner">
          <p>© {new Date().getFullYear()} DAV Institute of Engineering &amp; Technology, Jalandhar. All rights reserved.</p>
          <p className="landing-footer__sub">Kabir Nagar, Jalandhar, Punjab 144008 • Approved by AICTE • Affiliated to IKG-PTU</p>
        </div>
      </footer>
    </div>
  )
}

