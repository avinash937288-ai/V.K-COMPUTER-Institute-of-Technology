
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { ContactLead } from '../types';

const AdminLeads: React.FC = () => {
  const [leads, setLeads] = useState<ContactLead[]>([]);

  useEffect(() => {
    setLeads(db.getLeads());
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold">Enquiry Leads</h3>
      
      <div className="grid gap-6">
        {leads.length > 0 ? leads.map(lead => (
          <div key={lead.id} className="bg-white dark:bg-slate-800 p-6 rounded-2xl border border-slate-200 shadow-sm flex flex-col md:flex-row gap-6 items-start">
            <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
              <span className="material-symbols-outlined">person</span>
            </div>
            <div className="flex-grow space-y-2">
              <div className="flex justify-between items-start">
                <div>
                  <h4 className="font-bold text-lg">{lead.name}</h4>
                  <p className="text-primary font-bold text-sm">{lead.mobile}</p>
                </div>
                <div className="text-right">
                  <p className="text-[10px] text-slate-400 font-bold uppercase tracking-widest">{new Date(lead.date).toLocaleDateString()}</p>
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase inline-block mt-1 ${
                    lead.status === 'new' ? 'bg-blue-100 text-blue-700' : 'bg-slate-100 text-slate-500'
                  }`}>
                    {lead.status}
                  </span>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm italic border-l-2 border-slate-200 dark:border-slate-700 pl-4 py-1">
                "{lead.message}"
              </p>
              <div className="flex gap-2 pt-4">
                <button className="text-xs font-bold bg-slate-900 text-white px-4 py-2 rounded-lg lift-hover">Mark as Contacted</button>
                <a href={`tel:${lead.mobile}`} className="text-xs font-bold border border-slate-200 px-4 py-2 rounded-lg lift-hover inline-block">Call Now</a>
              </div>
            </div>
          </div>
        )) : (
          <div className="bg-white p-12 text-center rounded-2xl border border-dashed border-slate-300">
            <span className="material-symbols-outlined text-4xl text-slate-300 mb-4">mail</span>
            <p className="text-slate-500">No enquiries found at the moment.</p>
          </div>
        )}
      </div>
    </div>
  );
};

export default AdminLeads;
