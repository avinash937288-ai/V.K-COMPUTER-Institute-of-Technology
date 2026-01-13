
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { Certificate, Student } from '../types';

const AdminCertificates: React.FC = () => {
  const [certs, setCerts] = useState<Certificate[]>([]);
  const [isIssuing, setIsIssuing] = useState(false);
  const [searchRoll, setSearchRoll] = useState('');
  const [foundStudent, setFoundStudent] = useState<Student | null>(null);
  
  const [newCert, setNewCert] = useState<Partial<Certificate>>({
    certificateNo: '',
    studentId: '',
    type: 'certificate',
    issueDate: new Date().toISOString().split('T')[0],
    status: 'valid',
    documentPhoto: ''
  });

  useEffect(() => {
    setCerts(db.getCertificates());
  }, []);

  const handleSearch = () => {
    const student = db.getStudents().find(s => s.registrationNo.toLowerCase() === searchRoll.toLowerCase());
    if (student) {
      setFoundStudent(student);
      setNewCert(prev => ({ ...prev, studentId: student.id, certificateNo: student.registrationNo }));
    } else {
      alert("No student found with this Roll Number");
      setFoundStudent(null);
    }
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setNewCert({ ...newCert, documentPhoto: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newCert.studentId || !newCert.certificateNo) {
      alert("Please find a student first");
      return;
    }
    
    db.saveCertificate({
      ...newCert,
      id: Date.now().toString(),
    } as Certificate);
    
    setCerts(db.getCertificates());
    setIsIssuing(false);
    resetForm();
  };

  const resetForm = () => {
    setSearchRoll('');
    setFoundStudent(null);
    setNewCert({
      certificateNo: '',
      studentId: '',
      type: 'certificate',
      issueDate: new Date().toISOString().split('T')[0],
      status: 'valid',
      documentPhoto: ''
    });
  };

  return (
    <div className="space-y-6 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Certificates & Marksheets</h3>
        <button 
          onClick={() => setIsIssuing(true)}
          className="bg-primary text-white px-4 py-2 rounded-lg font-bold text-sm flex items-center gap-2 lift-hover"
        >
          <span className="material-symbols-outlined">print</span> Issue New
        </button>
      </div>

      {isIssuing && (
        <div className="fixed inset-0 bg-black/50 backdrop-blur-sm z-50 flex items-center justify-center p-4 overflow-y-auto">
          <div className="bg-white dark:bg-slate-900 w-full max-w-xl rounded-2xl shadow-2xl overflow-hidden animate-slide-up my-8">
            <div className="bg-primary p-6 text-white flex justify-between items-center">
              <h4 className="font-bold text-lg">Issue New Document</h4>
              <button onClick={() => { setIsIssuing(false); resetForm(); }} className="material-symbols-outlined hover:rotate-90 transition-transform">close</button>
            </div>
            
            <div className="p-8 space-y-6">
              {!foundStudent ? (
                <div className="space-y-4">
                  <div className="flex items-center gap-2 text-primary">
                    <span className="material-symbols-outlined">search</span>
                    <label className="block text-xs font-bold uppercase tracking-wider">Step 1: Search by Roll Number</label>
                  </div>
                  <div className="flex gap-2">
                    <input 
                      type="text" 
                      value={searchRoll}
                      onChange={e => setSearchRoll(e.target.value)}
                      placeholder="Enter Roll Number (e.g. VKCI-2023-1001)"
                      className="flex-1 rounded-lg border-slate-300 dark:bg-slate-800 font-mono focus:ring-primary focus:border-primary"
                      onKeyDown={(e) => e.key === 'Enter' && handleSearch()}
                    />
                    <button 
                      onClick={handleSearch}
                      className="bg-slate-900 hover:bg-black text-white px-6 py-2 rounded-lg font-bold transition-colors"
                    >
                      Search
                    </button>
                  </div>
                </div>
              ) : (
                <form onSubmit={handleSave} className="space-y-6">
                  <div className="bg-blue-50 dark:bg-blue-900/20 p-4 rounded-xl border border-blue-100 dark:border-blue-800 flex items-center gap-4">
                    <div className="w-12 h-12 bg-primary text-white rounded-full flex items-center justify-center font-bold text-xl">
                      {foundStudent.name[0]}
                    </div>
                    <div>
                      <h5 className="font-bold text-slate-900 dark:text-white leading-none mb-1">{foundStudent.name}</h5>
                      <p className="text-[10px] font-mono text-slate-500 uppercase tracking-tighter">
                        {foundStudent.registrationNo} | {db.getCourses().find(c => c.id === foundStudent.courseId)?.name}
                      </p>
                    </div>
                    <button type="button" onClick={() => setFoundStudent(null)} className="ml-auto text-xs text-red-500 font-bold hover:underline">Change</button>
                  </div>

                  <div className="grid grid-cols-2 gap-4">
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Document Roll Number</label>
                      <input 
                        type="text" 
                        value={newCert.certificateNo} 
                        onChange={e => setNewCert({...newCert, certificateNo: e.target.value})}
                        className="w-full rounded-lg border-slate-300 dark:bg-slate-800 font-mono text-sm" 
                        required 
                      />
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Document Type</label>
                      <select 
                        value={newCert.type}
                        onChange={e => setNewCert({...newCert, type: e.target.value as any})}
                        className="w-full rounded-lg border-slate-300 dark:bg-slate-800 text-sm"
                      >
                        <option value="certificate">Certificate</option>
                        <option value="marksheet">Marksheet</option>
                        <option value="ntt">NTT</option>
                      </select>
                    </div>
                    <div>
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-1">Issue Date</label>
                      <input 
                        type="date" 
                        value={newCert.issueDate} 
                        onChange={e => setNewCert({...newCert, issueDate: e.target.value})}
                        className="w-full rounded-lg border-slate-300 dark:bg-slate-800 text-sm" 
                        required 
                      />
                    </div>
                    
                    <div className="col-span-2">
                      <label className="block text-[10px] font-bold uppercase text-slate-400 mb-2">Upload Document Photo (Scan/Image)</label>
                      <div className="flex items-center gap-4">
                        <div className="flex-1 border-2 border-dashed border-slate-200 dark:border-slate-700 rounded-xl p-4 text-center relative group hover:border-primary transition-colors">
                          {newCert.documentPhoto ? (
                            <div className="relative inline-block">
                              <img src={newCert.documentPhoto} className="h-32 rounded shadow-sm border" alt="Preview" />
                              <button 
                                type="button"
                                onClick={() => setNewCert({...newCert, documentPhoto: ''})}
                                className="absolute -top-2 -right-2 bg-red-500 text-white rounded-full p-1 shadow-lg"
                              >
                                <span className="material-symbols-outlined text-xs">close</span>
                              </button>
                            </div>
                          ) : (
                            <div className="py-4">
                              <span className="material-symbols-outlined text-slate-300 text-3xl">add_a_photo</span>
                              <p className="text-[10px] text-slate-400 font-bold uppercase mt-2">Click to select photo</p>
                            </div>
                          )}
                          <input 
                            type="file" 
                            accept="image/*" 
                            className="absolute inset-0 opacity-0 cursor-pointer" 
                            onChange={handleImageUpload}
                          />
                        </div>
                      </div>
                    </div>
                  </div>
                  
                  <button className="w-full bg-primary hover:bg-blue-800 text-white py-4 rounded-xl font-bold shadow-lg shadow-primary/20 active:scale-95 transition-all flex items-center justify-center gap-2">
                    <span className="material-symbols-outlined">verified</span>
                    Issue {newCert.type?.toUpperCase()}
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      <div className="bg-white dark:bg-slate-800 rounded-2xl border border-slate-200 shadow-sm overflow-hidden">
        <table className="w-full text-left">
          <thead className="bg-slate-50 dark:bg-slate-900 text-[10px] font-bold text-slate-400 uppercase border-b">
            <tr>
              <th className="px-6 py-4">Cert No</th>
              <th className="px-6 py-4">Student</th>
              <th className="px-6 py-4">Type</th>
              <th className="px-6 py-4">Issue Date</th>
              <th className="px-6 py-4">Image</th>
              <th className="px-6 py-4">Status</th>
            </tr>
          </thead>
          <tbody className="divide-y divide-slate-100 dark:divide-slate-700">
            {certs.length > 0 ? certs.map(cert => (
              <tr key={cert.id} className="hover:bg-slate-50 transition-colors">
                <td className="px-6 py-4 font-mono font-bold text-slate-800 dark:text-slate-200">{cert.certificateNo}</td>
                <td className="px-6 py-4">
                  <p className="font-bold text-sm dark:text-slate-300">
                    {db.getStudents().find(s => s.id === cert.studentId)?.name || 'Unknown Student'}
                  </p>
                </td>
                <td className="px-6 py-4">
                  <span className="text-xs font-bold uppercase text-slate-500">{cert.type}</span>
                </td>
                <td className="px-6 py-4 text-sm dark:text-slate-400">{new Date(cert.issueDate).toLocaleDateString()}</td>
                <td className="px-6 py-4">
                  {cert.documentPhoto ? (
                    <div className="w-10 h-10 rounded border border-slate-200 overflow-hidden shadow-sm">
                      <img src={cert.documentPhoto} className="w-full h-full object-cover" alt="Doc" />
                    </div>
                  ) : (
                    <span className="text-[10px] text-slate-300 uppercase font-bold italic">No Photo</span>
                  )}
                </td>
                <td className="px-6 py-4">
                  <span className={`px-2 py-1 rounded-lg text-[10px] font-bold uppercase ${
                    cert.status === 'valid' ? 'bg-green-100 text-green-700' : 'bg-red-100 text-red-700'
                  }`}>
                    {cert.status}
                  </span>
                </td>
              </tr>
            )) : (
              <tr>
                <td colSpan={6} className="px-6 py-12 text-center text-slate-400 italic">No documents issued yet.</td>
              </tr>
            )}
          </tbody>
        </table>
      </div>
    </div>
  );
};

export default AdminCertificates;
