
import React from 'react';
import { Link } from 'react-router-dom';
import { db } from '../services/dbService';

const HomePage: React.FC = () => {
  const content = db.getContent();
  const courses = db.getCourses().filter(c => c.status === 'active').slice(0, 3);

  return (
    <div className="animate-fade-in">
      {/* Hero Section */}
      <section className="relative py-20 lg:py-32 overflow-hidden hero-pattern">
        <div className="container mx-auto px-4 relative z-10 text-center">
          <div className="inline-flex items-center bg-blue-50 dark:bg-blue-900/30 text-primary px-4 py-1.5 rounded-full text-sm font-bold mb-8 border border-blue-100 dark:border-blue-800">
            <span className="material-symbols-outlined text-[18px] mr-2">military_tech</span>
            ISO 9001:2015 Certified Institute
          </div>
          <h2 className="text-4xl md:text-6xl font-extrabold mb-8 leading-tight max-w-4xl mx-auto tracking-tight">
            {content.heroTitle || "Transform Your Future"}
          </h2>
          <p className="text-lg md:text-xl text-slate-700 dark:text-slate-300 mb-12 max-w-2xl mx-auto leading-relaxed font-medium">
            {content.heroSubtitle}
          </p>
          <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
            <Link className="w-full sm:w-auto bg-primary text-white px-8 py-4 rounded-lg font-bold text-lg lift-hover flex items-center justify-center gap-2 shadow-lg shadow-primary/20" to="/verify">
              <span className="material-symbols-outlined">qr_code_scanner</span>
              Verify Your Certificate
            </Link>
            <Link className="w-full sm:w-auto bg-white dark:bg-slate-800 border-2 border-slate-200 dark:border-slate-700 px-8 py-4 rounded-lg font-bold text-lg lift-hover text-slate-800 dark:text-white" to="/courses">
              Explore Courses
            </Link>
          </div>
        </div>
        <div className="absolute top-1/2 left-0 -translate-y-1/2 -translate-x-1/2 w-64 h-64 bg-primary/10 rounded-full blur-3xl"></div>
        <div className="absolute bottom-0 right-0 translate-y-1/2 translate-x-1/2 w-96 h-96 bg-primary/5 rounded-full blur-3xl"></div>
      </section>

      {/* Director Message */}
      <section className="py-24 bg-white dark:bg-slate-900/50" id="about">
        <div className="container mx-auto px-4">
          <div className="grid lg:grid-cols-2 gap-16 items-center">
            <div className="relative group">
              <div className="absolute -inset-4 bg-primary/5 rounded-2xl transition-all duration-500 group-hover:bg-primary/10"></div>
              <div className="relative overflow-hidden rounded-xl shadow-2xl border-8 border-white dark:border-slate-800">
                <img src={content.directorPhoto} alt={`Director ${content.directorName}`} className="w-full max-w-md mx-auto aspect-[3/4] object-cover transition-transform duration-700 group-hover:scale-105" />
              </div>
            </div>
            <div className="space-y-8">
              <div className="inline-block px-4 py-1 bg-primary/10 text-primary rounded font-bold text-xs tracking-widest uppercase border border-primary/20">
                Leadership Message
              </div>
              <h3 className="text-3xl md:text-4xl font-bold tracking-tight">Message from the Director</h3>
              <div className="space-y-6 text-slate-800 dark:text-slate-300 leading-relaxed text-lg italic">
                <p className="relative pl-6 border-l-4 border-primary/20">
                  "{content.directorMessage}"
                </p>
              </div>
              <div className="pt-8 border-t border-slate-200 dark:border-slate-800">
                <h4 className="font-bold text-2xl text-primary">{content.directorName}</h4>
                <p className="text-slate-600 dark:text-slate-400 font-bold uppercase tracking-wider text-sm mt-1">Founder & Director</p>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Popular Courses */}
      <section className="py-24">
        <div className="container mx-auto px-4">
          <div className="text-center mb-16">
            <h3 className="text-3xl font-bold mb-4 tracking-tight">Our Popular Courses</h3>
            <div className="w-20 h-1.5 bg-primary mx-auto rounded-full mb-6"></div>
          </div>
          <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
            {courses.map(course => (
              <div key={course.id} className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-sm border border-slate-100 dark:border-slate-700 lift-hover group cursor-pointer">
                <div className="w-14 h-14 bg-blue-50 dark:bg-blue-900/20 text-primary rounded-xl flex items-center justify-center mb-6 group-hover:bg-primary group-hover:text-white transition-all duration-300">
                  <span className="material-symbols-outlined text-3xl">school</span>
                </div>
                <h4 className="text-xl font-bold mb-3 group-hover:text-primary transition-colors">{course.name}</h4>
                <p className="text-slate-700 dark:text-slate-300 mb-6 leading-relaxed font-medium">{course.description}</p>
                <div className="flex items-center justify-between pt-4 border-t border-slate-100 dark:border-slate-700">
                  <span className="text-sm font-bold text-slate-500 italic underline">{course.duration} Duration</span>
                  <span className="material-symbols-outlined text-primary group-hover:translate-x-1 transition-transform">arrow_forward</span>
                </div>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Stats */}
      <section className="bg-primary py-20 text-white relative overflow-hidden">
        <div className="container mx-auto px-4 relative z-10">
          <div className="grid grid-cols-2 md:grid-cols-4 gap-8 text-center">
            <div className="lift-hover p-4 rounded-xl">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">1500+</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-bold">Students Trained</div>
            </div>
            <div className="lift-hover p-4 rounded-xl">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">15+</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-bold">Expert Faculty</div>
            </div>
            <div className="lift-hover p-4 rounded-xl">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">12+</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-bold">Courses Offered</div>
            </div>
            <div className="lift-hover p-4 rounded-xl">
              <div className="text-4xl md:text-5xl font-extrabold mb-2">100%</div>
              <div className="text-blue-200 uppercase tracking-widest text-xs font-bold">Job Assistance</div>
            </div>
          </div>
        </div>
      </section>
    </div>
  );
};

export default HomePage;
