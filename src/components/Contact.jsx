import { contact } from '../data/portfolioData';
import { Mail, Phone, Github, Linkedin } from 'lucide-react';

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
    cta: language === 'de' ? 'Kontakt' : 'Contact Me'
  };

  return (
    <section id="contact" className="py-20 bg-[var(--background)] section-reveal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t.heading}</h2>
        <p className="section-subtitle max-w-3xl mx-auto">
          {t.intro} {t.based}
        </p>

        <div className="text-center mb-8">
          <a
            href={`mailto:${contact.email}?subject=Intro%20Call%20for%20AI%20Role`}
            className="btn-accent inline-flex items-center gap-2"
          >
            {t.cta}
          </a>
          <p className="mt-3 text-sm text-gray-600">{t.support}</p>
        </div>

        <div className="max-w-3xl mx-auto grid md:grid-cols-2 gap-6">
          <a
            href={`mailto:${contact.email}`}
            className="card flex items-center gap-4 hover:bg-[#f3f4f6]"
          >
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
              <Mail className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.email}</p>
              <p className="text-gray-800 font-medium">{contact.email}</p>
            </div>
          </a>

          <a
            href={`tel:${contact.phone}`}
            className="card flex items-center gap-4 hover:bg-[#f3f4f6]"
          >
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
              <Phone className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.phone}</p>
              <p className="text-gray-800 font-medium">{contact.phone}</p>
            </div>
          </a>

          <a
            href={contact.github}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:bg-[#f3f4f6]"
          >
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
              <Github className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.github}</p>
              <p className="text-gray-800 font-medium">{t.viewProfile}</p>
            </div>
          </a>

          <a
            href={contact.linkedin}
            target="_blank"
            rel="noopener noreferrer"
            className="card flex items-center gap-4 hover:bg-[#f3f4f6]"
          >
            <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
              <Linkedin className="icon-primary" size={20} />
            </div>
            <div>
              <p className="text-sm text-gray-500">{t.linkedin}</p>
              <p className="text-gray-800 font-medium">{t.connect}</p>
            </div>
          </a>
        </div>
      </div>
    </section>
  );
};

export default Contact;
