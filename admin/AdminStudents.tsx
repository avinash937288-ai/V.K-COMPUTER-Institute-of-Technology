
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { Student } from '../types';

const AdminStudents: React.FC = () => {
  const [students, setStudents] = useState<Student[]>([]);
  const [isAdding, setIsAdding] = useState(false);
  const [newStudent, setNewStudent] = useState<Partial<Student>>({
    name: '',
    fatherName: '',
    courseId: '',
    sessionYear: '',
    registrationNo: '',
    status: 'verified'
  });

  const courses = db.getCourses();

  useEffect(() => {
    setStudents(db.getStudents());
  }, []);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveStudent({ ...newStudent, id: Date.now().toString() } as Student);
    setStudents(db.getStudents());
    setIsAdding(false);
    setNewStudent({ name: '', fatherName: '', courseId: '', sessionYear: '', registrationNo: '', status: 'verified' });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Student Records</h3>
        <button 
          onClick={() => setIsAdding(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 lift-hover"
        >
          <span className="material-symbols-outlined">person_add</span> Register Student
        </button>
      </div>

      {isAdding && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h4 className="font-bold text-lg">New Student Registration</h4>
              <button onClick={() => setIsAdding(false)} className="material-symbols-outlined">close</button>
            </div>
            <form onSubmit={handleSave} className="p-8 space-y-4">
              <div className="grid grid-cols-2 gap-4">
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase mb-1">Student Name</label>
                  <input 
                    type="text" 
                    value={newStudent.name} 
                    onChange={e => setNewStudent({...newStudent, name: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    required 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase mb-1">Father's Name</label>
                  <input 
                    type="text" 
                    value={newStudent.fatherName} 
                    onChange={e => setNewStudent({...newStudent, fatherName: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Course</label>
                  <select 
                    value={newStudent.courseId}
                    onChange={e => setNewStudent({...newStudent, courseId: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800"
                    required
                  >
                    <option value="">Select Course</option>
                    {courses.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold uppercase mb-1">Session Year</label>
                  <input 
                    type="text" 
                    value={newStudent.sessionYear} 
                    onChange={e => setNewStudent({...newStudent, sessionYear: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800" 
                    placeholder="e.g. 2023-24"
                    required 
                  />
                </div>
                <div className="col-span-2">
                  <label className="block text-xs font-bold uppercase mb-1">Registration/Roll No.</label>
                  <input 
                    type="text" 
                    value={newStudent.registrationNo} 
                    onChange={e => setNewStudent({...newStudent, registrationNo: e.target.value})}
                    className="w-full rounded-lg border-slate-300 dark:bg-slate-800 font-mono" 
                    placeholder="e.g. VKCI-2024-1001"
                    required 
                  />
                </div>
              </div>
              <button className="w-full bg-primary text-white py-3 rounded-xl font-bold mt-4 shadow-lg active:scale-95 transition-all">
                Complete Registration
              </button>
            </form>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-500 uppercase border-b">
            <tr>
              <th className="px-6 py-4">Reg No</th>
              <th className="px-6 py-4">Name</th>
              <th className="px-6 py-4">Course</th>
              <th className="px-6 py-4">Session</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {students.map(student => (
              <tr key={student.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono text-xs font-bold text-primary">{student.registrationNo}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-slate-800 dark:text-slate-200">{student.name}</p>
                  <p className="text-[10px] text-slate-500 uppercase tracking-wider">S/o {student.fatherName}</p>
                </td>
                <td className="px-6 py-4 text-sm font-medium">
                  {courses.find(c => c.id === student.courseId)?.name || 'Unknown'}
                </td>
                <td className="px-6 py-4 text-sm text-slate-600">{student.sessionYear}</td>
                <td className="px-6 py-4">
                  <span className="px-2 py-1 rounded-lg text-[10px] font-bold uppercase bg-green-100 text-green-700">
                    {student.status}
                  </span>
                </td>
              </tr>
            ))}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminStudents;
