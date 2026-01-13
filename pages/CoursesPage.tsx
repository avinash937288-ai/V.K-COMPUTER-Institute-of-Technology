
import React from 'react';
import { db } from '../services/dbService';

const CoursesPage: React.FC = () => {
  const courses = db.getCourses();

  return (
    <div className="py-20 animate-fade-in">
      <div className="container mx-auto px-4">
        <div className="text-center mb-16">
          <h2 className="text-4xl font-extrabold mb-4">Professional Course Tracks</h2>
          <p className="text-slate-500 max-w-2xl mx-auto">
            Choose from our specialized programs designed to build high-demand industry skills.
          </p>
        </div>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-8">
          {courses.map(course => (
            <div key={course.id} className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 overflow-hidden lift-hover group">
              <div className="h-48 bg-slate-100 dark:bg-slate-900 flex items-center justify-center relative">
                <span className="material-symbols-outlined text-primary text-6xl opacity-20">menu_book</span>
                <div className="absolute top-4 right-4 bg-primary text-white text-[10px] font-bold px-3 py-1 rounded-full uppercase tracking-widest">
                  {course.status}
                </div>
              </div>
              <div className="p-8">
                <h3 className="text-xl font-bold mb-2 group-hover:text-primary transition-colors">{course.name}</h3>
                <p className="text-slate-600 dark:text-slate-400 text-sm mb-6 leading-relaxed">
                  {course.description}
                </p>
                <div className="flex items-center justify-between pt-6 border-t border-slate-100 dark:border-slate-700">
                  <div className="flex flex-col">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Duration</span>
                    <span className="text-sm font-bold text-slate-700 dark:text-slate-200">{course.duration}</span>
                  </div>
                  <div className="flex flex-col text-right">
                    <span className="text-[10px] text-slate-400 uppercase font-bold tracking-wider">Fees</span>
                    <span className="text-sm font-bold text-primary">{course.fees}</span>
                  </div>
                </div>
                <button className="w-full mt-6 bg-slate-900 dark:bg-slate-700 text-white font-bold py-3 rounded-xl hover:bg-primary transition-colors flex items-center justify-center gap-2">
                  Enquire Now <span className="material-symbols-outlined text-sm">arrow_forward</span>
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
};

export default CoursesPage;
