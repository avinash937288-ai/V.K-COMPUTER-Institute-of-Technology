
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { Course, CourseStatus } from '../types';

const AdminCourses: React.FC = () => {
  const [courses, setCourses] = useState<Course[]>([]);
  const [isEditing, setIsEditing] = useState(false);
  const [currentCourse, setCurrentCourse] = useState<Partial<Course>>({
    name: '',
    duration: '',
    fees: '',
    description: '',
    status: CourseStatus.ACTIVE
  });

  useEffect(() => {
    setCourses(db.getCourses());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveCourse(currentCourse as Course);
    setCourses(db.getCourses());
    setIsEditing(false);
    setCurrentCourse({ name: '', duration: '', fees: '', description: '', status: CourseStatus.ACTIVE });
  };

  const handleEdit = (course: Course) => {
    setCurrentCourse(course);
    setIsEditing(true);
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Course Management</h3>
        <button 
          onClick={() => { setIsEditing(true); setCurrentCourse({ name: '', duration: '', fees: '', description: '', status: CourseStatus.ACTIVE }); }}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 lift-hover"
        >
          <span className="material-symbols-outlined">add</span> Add New Course
        </button>
      </div>

      {isEditing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-lg rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h4 className="font-bold text-lg">{currentCourse.id ? 'Edit Course' : 'New Course'}</h4>
              <button onClick={() => setIsEditing(false)} className="material-symbols-outlined">close</button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase mb-1">Course Name</label>
                  <input 
                    type="text" 
                    value={currentCourse.name} 
                    onChange={e => setCurrentCourse({...currentCourse, name: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Duration</label>
                  <input 
                    type="text" 
                    value={currentCourse.duration} 
                    onChange={e => setCurrentCourse({...currentCourse, duration: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    placeholder="e.g. 6 Months"
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Fees</label>
                  <input 
                    type="text" 
                    value={currentCourse.fees} 
                    onChange={e => setCurrentCourse({...currentCourse, fees: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    placeholder="e.g. ₹5,000"
                    required 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase mb-1">Status</label>
                  <select 
                    value={currentCourse.status}
                    onChange={e => setCurrentCourse({...currentCourse, status: e.target.value as CourseStatus})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800"
                  >
                    <option value={CourseStatus.ACTIVE}>Active</option>
                    <option value={CourseStatus.INACTIVE}>Inactive</option>
                  </select>
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase mb-1">Description</label>
                  <textarea 
                    value={currentCourse.description} 
                    onChange={e => setCurrentCourse({...currentCourse, description: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    rows={3}
                  ></textarea>
                </div>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition-all">
                Save Course Details
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-500 uppercase border-b border-slate-200 dark:border-slate-700">
            <tr>
              <th className="px-6 py-4">Course Name</th>
              <th className="px-6 py-4">Duration</th>
              <th className="px-6 py-4">Fees</th>
              <th className="px-6 py-4">Status</th>
              <th className="px-6 py-4 text-right">Actions</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {courses.map(course => (
              <tr key={course.id} className="hover:bg-slate-50 dark:hover:bg-slate-700/30 transition-colors">
                <td className="px-6 py-4 font-bold text-slate-800 dark:text-slate-200">{course.name}</td>
                <td className="px-6 py-4 text-sm text-slate-600 dark:text-slate-400">{course.duration}</td>
                <td className="px-6 py-4 text-sm font-bold text-primary">{course.fees}</td>
                <td className="px-6 py-4 text-sm">
                  <span className={`px-2 py-1 rounded-lg font-bold text-[10px] uppercase ${
                    course.status === CourseStatus.ACTIVE ? 'bg-green-100 text-green-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {course.status}
                  </span>
                </td>
                <td className="px-6 py-4 text-right space-x-2">
                  <button onClick={() => handleEdit(course)} className="p-2 text-blue-600 hover:bg-blue-50 rounded-lg">
                    <span className="material-symbols-outlined text-[18px]">edit</span>
                  </button>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCourses;
