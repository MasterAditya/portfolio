import { education } from '../data/portfolioData';
import { GraduationCap, BookOpen } from 'lucide-react';

const Education = ({ language = 'en' }) => {
  const t = {
    heading: language === 'de' ? 'Bildung' : 'Education',
    coursework: language === 'de' ? 'Relevante Kurse' : 'Relevant Coursework',
    keySubjects: language === 'de' ? 'Kernfaecher' : 'Key Subjects',
    cgpa: language === 'de' ? 'Notenschnitt' : 'CGPA',
    twelfth: language === 'de' ? 'Abschluss Sekundarstufe II (12. Klasse)' : 'Senior Secondary School Certificate (12th Grade)',
    tenth: language === 'de' ? 'Abschluss Sekundarstufe I (10. Klasse)' : 'Secondary School Certificate (10th Grade)',
    percentage: language === 'de' ? 'Prozentsatz' : 'Percentage'
  };

  const educationItems = [
    {
      title: language === 'de' ? 'B.Tech in Informatik (Spezialisierung: Machine Learning)' : education.degree,
      institute: education.university,
      duration: education.duration,
      scoreLabel: t.cgpa,
      score: education.cgpa,
      coursework: education.coursework
    },
    ...(education.schoolEducation || []).map((item) => ({
      title:
        item.level === 'Senior Secondary School Certificate (12th Grade)'
          ? t.twelfth
          : item.level === 'Secondary School Certificate (10th Grade)'
          ? t.tenth
          : item.level,
      institute: item.school,
      duration: item.year,
      location: item.location,
      scoreLabel: item.scoreLabel === 'Percentage' ? t.percentage : item.scoreLabel,
      score: item.score,
      keySubjects:
        language === 'de' && item.keySubjects
          ? item.keySubjects.map((subject) => ({
              Physics: 'Physik',
              Chemistry: 'Chemie',
              Mathematics: 'Mathematik',
              'Computer Science': 'Informatik'
            }[subject] || subject))
          : item.keySubjects
    }))
  ];

  return (
    <section id="education" className="py-20 bg-[var(--background)] section-reveal">
      <div className="max-w-6xl mx-auto px-4 sm:px-6 lg:px-8">
        <h2 className="section-title">{t.heading}</h2>

        <div className="max-w-4xl mx-auto space-y-6">
          {educationItems.map((item, index) => (
            <div key={index} className="card">
              <div className="flex items-start gap-4">
                <div className="bg-[var(--background)] p-3 rounded-lg border border-[var(--border)]">
                  <GraduationCap className="icon-primary" size={24} />
                </div>
                <div className="flex-1">
                  <h3 className="text-xl font-semibold text-gray-900">{item.title}</h3>
                  <p className="text-gray-600 mt-1">{item.institute}</p>
                  <div className="flex flex-wrap gap-4 mt-2 text-sm text-gray-500">
                    <span>{item.duration}</span>
                    {item.location && <span>{item.location}</span>}
                    {item.score && <span>{item.scoreLabel}: {item.score}</span>}
                  </div>
                </div>
              </div>

              {item.coursework?.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <div className="flex items-center gap-2 mb-3">
                    <BookOpen size={20} className="icon-primary" />
                    <h4 className="font-semibold text-gray-700">{t.coursework}</h4>
                  </div>
                  <div className="grid sm:grid-cols-2 gap-2">
                    {item.coursework.map((course, courseIndex) => (
                      <div key={courseIndex} className="flex items-center gap-2">
                        <span className="icon-action">•</span>
                        <span className="text-gray-600 text-sm">{course}</span>
                      </div>
                    ))}
                  </div>
                </div>
              )}

              {item.keySubjects?.length > 0 && (
                <div className="border-t pt-6 mt-6">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium text-gray-700">{t.keySubjects}:</span>{' '}
                    {item.keySubjects.join(', ')}
                  </p>
                </div>
              )}
            </div>
          ))}
        </div>
      </div>
    </section>
  );
};

export default Education;
