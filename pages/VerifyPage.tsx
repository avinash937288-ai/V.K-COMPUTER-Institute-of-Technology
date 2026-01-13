
import React, { useState, useMemo } from 'react';
import { db } from '../services/dbService';

const VerifyPage: React.FC = () => {
  const content = db.getContent();
  const [docType, setDocType] = useState('');
  const [regNo, setRegNo] = useState('');
  const [captchaInput, setCaptchaInput] = useState('');
  const [error, setError] = useState('');
  const [result, setResult] = useState<any>(null);

  // Generate simple math captcha
  const captcha = useMemo(() => {
    const a = Math.floor(Math.random() * 20) + 1;
    const b = Math.floor(Math.random() * 10) + 1;
    return { q: `${a} + ${b} = ?`, ans: a + b };
  }, []);

  const handleVerify = (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    
    if (parseInt(captchaInput) !== captcha.ans) {
      setError('Invalid security check result. Try again.');
      return;
    }

    const verification = db.verify(regNo);
    if (verification.student || verification.cert) {
      setResult(verification);
    } else {
      setError('No records found for this Registration Number.');
    }
  };

  const handleDownload = (photo: string, fileName: string) => {
    const link = document.createElement('a');
    link.href = photo;
    link.download = fileName;
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
  };

  return (
    <div className="bg-slate-50 dark:bg-background-dark min-h-screen">
      <div className="bg-white dark:bg-slate-900 border-b border-slate-200 dark:border-slate-800">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
          <h2 className="font-heading text-3xl font-bold text-slate-900 dark:text-white mb-2">Student Credential Verification</h2>
          <p className="text-slate-500">Secure validation portal for V.K Computer Institute certificates.</p>
        </div>
      </div>

      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-12">
        <div className="grid lg:grid-cols-12 gap-12 items-start">
          <div className="lg:col-span-4 space-y-6">
            <div className="bg-white dark:bg-slate-900 p-8 rounded-xl border border-slate-200 dark:border-slate-800 shadow-sm">
              <div className="flex items-center gap-4 mb-4">
                <img src={content.directorPhoto} alt={`Director ${content.directorName}`} className="w-16 h-16 rounded-full border-2 border-primary object-cover" />
                <div>
                  <h3 className="font-bold text-lg dark:text-white">Director's Desk</h3>
                  <p className="text-sm text-slate-500">{content.directorName}</p>
                </div>
              </div>
              <p className="text-slate-600 dark:text-slate-400 text-sm leading-relaxed italic">
                "This portal ensures every certificate issued carries the weight of genuine academic achievement."
              </p>
            </div>
          </div>

          <div className="lg:col-span-8">
            {!result ? (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl overflow-hidden">
                <div className="bg-primary p-6 text-white flex justify-between items-center">
                  <h3 className="text-xl font-bold flex items-center gap-2">
                    <span className="material-symbols-outlined">fact_check</span> Verification Form
                  </h3>
                </div>
                <form className="p-8 space-y-8" onSubmit={handleVerify}>
                  <div className="grid md:grid-cols-2 gap-8">
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Document Type*</label>
                      <select 
                        value={docType}
                        onChange={(e) => setDocType(e.target.value)}
                        className="w-full rounded-lg border-slate-300 dark:bg-slate-800"
                        required
                      >
                        <option value="">Select Document Type</option>
                        <option value="certificate">Certificate</option>
                        <option value="marksheet">Marksheet</option>
                        <option value="ntt">NTT</option>
                      </select>
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-semibold">Registration No.*</label>
                      <input 
                        type="text"
                        value={regNo}
                        onChange={(e) => setRegNo(e.target.value)}
                        placeholder="e.g. VKCI-2023-XXXX"
                        className="w-full rounded-lg border-slate-300 dark:bg-slate-800"
                        required
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="block text-sm font-semibold">Security Check*</label>
                    <div className="flex flex-col sm:flex-row items-center gap-4 bg-slate-50 dark:bg-slate-800 p-6 rounded-xl border border-slate-200 dark:border-slate-700">
                      <div className="text-2xl font-bold heading-font tracking-widest text-primary italic px-6 py-3 rounded-lg border-2 border-dashed select-none">
                        {captcha.q}
                      </div>
                      <input 
                        type="number"
                        value={captchaInput}
                        onChange={(e) => setCaptchaInput(e.target.value)}
                        placeholder="Result"
                        className="w-full sm:w-40 rounded-lg border-slate-300 dark:bg-slate-900 text-center text-lg font-bold"
                        required
                      />
                    </div>
                  </div>

                  {error && (
                    <div className="p-4 bg-red-50 text-red-600 rounded-lg text-sm font-medium flex items-center gap-2">
                      <span className="material-symbols-outlined">error</span> {error}
                    </div>
                  )}

                  <button className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-5 rounded-xl transition-all shadow-lg flex items-center justify-center gap-3">
                    <span className="material-symbols-outlined">verified</span>
                    Verify Credential Now
                  </button>
                </form>
              </div>
            ) : (
              <div className="bg-white dark:bg-slate-900 rounded-2xl border border-slate-200 dark:border-slate-800 shadow-2xl p-8 animate-fade-in relative">
                <div className="flex justify-between items-start mb-8">
                  <h3 className="text-2xl font-bold text-green-600 flex items-center gap-2">
                    <span className="material-symbols-outlined text-3xl">verified</span>
                    Verified Successfully
                  </h3>
                  <button onClick={() => setResult(null)} className="text-slate-400 hover:text-primary">
                    <span className="material-symbols-outlined">close</span>
                  </button>
                </div>
                
                <div className="grid md:grid-cols-2 gap-8">
                  <div className="space-y-6">
                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <span className="text-slate-500 font-medium text-sm">Student Name:</span>
                      <span className="font-bold text-slate-900 dark:text-white uppercase text-sm">
                        {result.student?.name || 'NOT FOUND'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <span className="text-slate-500 font-medium text-sm">Registration No:</span>
                      <span className="font-bold font-mono text-sm">{regNo}</span>
                    </div>
                    <div className="grid grid-cols-2 gap-4 border-b border-slate-100 dark:border-slate-800 pb-4">
                      <span className="text-slate-500 font-medium text-sm">Course:</span>
                      <span className="font-bold uppercase text-sm">
                        {db.getCourses().find(c => c.id === result.student?.courseId)?.name || 'N/A'}
                      </span>
                    </div>
                    <div className="grid grid-cols-2 gap-4">
                      <span className="text-slate-500 font-medium text-sm">Status:</span>
                      <span className="inline-flex items-center px-2.5 py-1 rounded-lg text-[10px] font-bold uppercase bg-green-100 text-green-700">
                        VALID CREDENTIAL
                      </span>
                    </div>
                  </div>

                  {result.cert?.documentPhoto && (
                    <div className="space-y-4">
                      <p className="text-xs font-bold text-slate-400 uppercase tracking-widest">Digital Preview</p>
                      <div className="relative group rounded-xl overflow-hidden border border-slate-200 dark:border-slate-700 bg-slate-50 dark:bg-slate-800 shadow-sm">
                        <img 
                          src={result.cert.documentPhoto} 
                          alt="Verified Document" 
                          className="w-full h-auto max-h-[300px] object-contain mx-auto"
                        />
                        <div className="absolute inset-0 bg-black/40 opacity-0 group-hover:opacity-100 transition-opacity flex items-center justify-center p-4">
                           <button 
                            onClick={() => handleDownload(result.cert.documentPhoto, `VKCI_${regNo}_Document.png`)}
                            className="bg-white text-primary px-4 py-2 rounded-lg font-bold flex items-center gap-2 shadow-xl lift-hover text-sm"
                          >
                            <span className="material-symbols-outlined text-sm">download</span> Download Original
                          </button>
                        </div>
                      </div>
                      <button 
                        onClick={() => handleDownload(result.cert.documentPhoto, `VKCI_${regNo}_Document.png`)}
                        className="md:hidden w-full bg-primary text-white py-3 rounded-lg font-bold flex items-center justify-center gap-2 text-sm"
                      >
                        <span className="material-symbols-outlined text-sm">download</span> Download Document
                      </button>
                    </div>
                  )}
                </div>
                
                <div className="mt-10 p-6 bg-slate-50 dark:bg-slate-800 rounded-xl border border-dashed border-slate-300 dark:border-slate-700">
                  <p className="text-[10px] text-slate-500 text-center leading-relaxed">
                    This document is digitally verified as per the official records of V.K Computer Institute. 
                    The digital copy shown is a true representation of the original issued credential. 
                    Any discrepancy should be reported to the administrative office immediately.
                  </p>
                </div>
              </div>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default VerifyPage;
