
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { VerificationLog } from '../types';

const AdminLogs: React.FC = () => {
  const [logs, setLogs] = useState<VerificationLog[]>([]);

  useEffect(() => {
    setLogs(db.getLogs());
  }, []);

  return (
    <div className="space-y-6 animate-fade-in">
      <h3 className="text-2xl font-bold">Verification Traffic Logs</h3>
      
      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 text-xs font-bold text-slate-500 uppercase border-b">
            <tr>
              <th className="px-6 py-4">Timestamp</th>
              <th className="px-6 py-4">Query / Reg No</th>
              <th className="px-6 py-4">IP Address</th>
              <th className="px-6 py-4">Outcome</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {logs.length > 0 ? logs.map(log => (
              <tr key={log.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 text-xs font-medium text-slate-500">
                  {new Date(log.timestamp).toLocaleString()}
                </td>
                <td className="px-6 py-4 font-mono text-sm font-bold">{log.query}</td>
                <td className="px-6 py-4 text-xs font-mono">{log.ip}</td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    log.result === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {log.result}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={4} className="px-6 py-12 text-center text-slate-400 italic">No verification attempts logged yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminLogs;
