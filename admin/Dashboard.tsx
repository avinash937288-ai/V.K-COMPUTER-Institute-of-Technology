
import React from 'react';
import { db } from '../services/dbService';

const Dashboard: React.FC = () => {
  const stats = [
    { label: 'Total Courses', value: db.getCourses().length, icon: 'library_books', color: 'blue' },
    { label: 'Students', value: db.getStudents().length, icon: 'person_add', color: 'emerald' },
    { label: 'Certificates', value: db.getCertificates().length, icon: 'workspace_premium', color: 'amber' },
    { label: 'Verifications', value: db.getLogs().length, icon: 'fact_check', color: 'indigo' },
  ];

  const recentStudents = db.getStudents().slice(-3).reverse();
  const recentLeads = db.getLeads().slice(-3);

  return (
    <div className="space-y-8 animate-fade-in">
      {/* Stats Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
        {stats.map((stat, i) => (
          <div key={i} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 dark:border-slate-700 shadow-sm lift-hover">
            <div className="flex items-center justify-between mb-4">
              <div className={`w-12 h-12 rounded-xl bg-${stat.color}-100 dark:bg-${stat.color}-900/40 flex items-center justify-center`}>
                <span className={`material-symbols-outlined text-${stat.color}-600 dark:text-${stat.color}-400`}>{stat.icon}</span>
              </div>
            </div>
            <h3 className="text-slate-500 text-xs font-semibold uppercase tracking-wider">{stat.label}</h3>
            <p className="text-3xl font-bold mt-1">{stat.value}</p>
          </div>
        ))}
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8">
        {/* Recent Students Table */}
        <div className="lg:col-span-2 bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
          <div className="p-6 border-b flex items-center justify-between">
            <h4 className="font-bold">Recent Registrations</h4>
            <button className="text-primary text-sm font-bold">View All</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-slate-50 dark:bg-slate-900 text-[10px] uppercase font-bold text-slate-400 border-b">
                <tr>
                  <th className="px-6 py-4">Student Info</th>
                  <th className="px-6 py-4">Course</th>
                  <th className="px-6 py-4">Status</th>
                </tr>
              </thead>
              <tbody className="divide-y">
                {recentStudents.map(student => (
                  <tr key={student.id} className="hover:bg-slate-50">
                    <td className="px-6 py-4">
                      <div className="flex items-center gap-3">
                        <div className="w-8 h-8 rounded-full bg-blue-100 flex items-center justify-center text-xs font-bold text-blue-700 overflow-hidden">
                           <img src={`https://api.dicebear.com/7.x/initials/svg?seed=${student.name}`} alt={student.name} />
                        </div>
                        <div>
                          <p className="text-sm font-bold">{student.name}</p>
                          <p className="text-[10px] text-slate-500">{student.registrationNo}</p>
                        </div>
                      </div>
                    </td>
                    <td className="px-6 py-4 text-sm font-medium">
                      {db.getCourses().find(c => c.id === student.courseId)?.name}
                    </td>
                    <td className="px-6 py-4">
                      <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                        student.status === 'verified' ? 'bg-green-100 text-green-700' : 'bg-amber-100 text-amber-700'
                      }`}>
                        {student.status}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>

        {/* Quick Activity / Leads */}
        <div className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="font-bold mb-6">Recent Enquiries</h4>
          <div className="space-y-6">
            {recentLeads.length > 0 ? recentLeads.map(lead => (
              <div key={lead.id} className="flex gap-4">
                <div className="w-2 h-2 rounded-full bg-primary mt-2 flex-shrink-0"></div>
                <div>
                  <p className="text-sm font-bold">{lead.name}</p>
                  <p className="text-[10px] text-slate-500">{lead.mobile}</p>
                  <p className="text-xs text-slate-600 dark:text-slate-400 mt-1 line-clamp-2">{lead.message}</p>
                </div>
              </div>
            )) : (
              <p className="text-sm text-slate-400 italic">No recent enquiries found.</p>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Dashboard;
