import { contact } from '../data/portfolioData';
import { Mail, Zap, Github, Linkedin } from 'lucide-react';

const Contact = ({ language = 'en' }) => {
  const t = {
    heading: language === 'de' ? 'Zusammenarbeit' : 'Work With Me',
    intro:
      language === 'de'
        ? 'Interesse an Rollen in Backend-Engineering, KI-Systemen und Platform Engineering.'
        : contact.openTo,
    based:
      language === 'de'
        ? 'Standort: Indien | Offen fuer internationale Moeglichkeiten.'
        : 'Location: India | Open to international opportunities.',
    support:
      language === 'de'
        ? 'Fokus auf Backend-Systeme, KI-Systeme und skalierbare Datensysteme.'
        : 'Focused on backend systems, AI systems, and scalable data systems.',
    email: language === 'de' ? 'E-Mail' : 'Email',
    phone: language === 'de' ? 'Telefon' : 'Phone',
    github: 'GitHub',
    linkedin: 'LinkedIn',
    viewProfile: language === 'de' ? 'Profil ansehen' : 'View Profile',
    connect: language === 'de' ? 'Verbinden' : 'Connect',
    cta: language === 'de' ? 'Kontakt' : 'Contact Me',
    availability: language === 'de' ? 'Verfügbarkeit' : 'Availability',
    availabilityStatus: language === 'de' ? 'Offen für Gelegenheiten' : 'Open to Opportunities',
    availabilityDesc: language === 'de' ? 'Backend • KI-Systeme • Plattformen' : 'Backend • AI Systems • Platforms'
  };

  return (
    <section id="contact" className="py-32 bg-gradient-to-b from-[var(--background)] via-white to-[var(--background)] section-reveal border-t-2 border-[var(--border)]">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <p className="mono text-xs uppercase tracking-widest text-[var(--primary)] font-semibold mb-3 text-center">Get In Touch</p>
        <h2 className="section-title mb-3">{t.heading}</h2>
        <p className="section-subtitle max-w-3xl mx-auto mb-8">
          {t.intro} {t.based}
        </p>

        <div className="text-center mb-12">
          <a
            href={`mailto:${contact.email}?subject=Intro%20Call%20for%20AI%20Role`}
            className="btn-accent inline-flex items-center gap-2"
          >
            {t.cta}
          </a>
          <p className="mt-4 text-sm text-gray-600 font-medium">{t.support}</p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="card flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[var(--primary)]/5 p-3 rounded-lg border border-[var(--primary)]/10">
              <Mail className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t.email}</p>
              <p className="text-gray-800 font-semibold">{contact.email}</p>
            </div>
          </a>

          <a
            href={`tel:${contact.phone}`}
            title="Call or WhatsApp"
            className="card flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[var(--primary)]/5 p-3 rounded-lg border border-[var(--primary)]/10">
              <Zap className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t.availability}</p>
              <p className="text-gray-800 font-semibold">{t.availabilityStatus}</p>
              <p className="text-xs text-gray-600 mt-1">{t.availabilityDesc}</p>
            </div>
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[var(--primary)]/5 p-3 rounded-lg border border-[var(--primary)]/10">
              <Github className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t.github}</p>
              <p className="text-gray-800 font-semibold">{t.viewProfile}</p>
            </div>
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:shadow-md transition-shadow"
          >
            <div className="bg-[var(--primary)]/5 p-3 rounded-lg border border-[var(--primary)]/10">
              <Linkedin className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500 font-medium">{t.linkedin}</p>
              <p className="text-gray-800 font-semibold">{t.connect}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
