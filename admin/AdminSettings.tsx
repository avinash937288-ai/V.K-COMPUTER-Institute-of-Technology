
import React, { useState, useEffect } from 'react';
import { db } from '../services/dbService';
import { SiteContent } from '../types';

const AdminSettings: React.FC = () => {
  const [content, setContent] = useState<SiteContent>(db.getContent());
  const [saved, setSaved] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveContent(content);
    setSaved(true);
    setTimeout(() => setSaved(false), 3000);
  };

  const handleImageUpload = (e: React.ChangeEvent<HTMLInputElement>, field: keyof SiteContent) => {
    const file = e.target.files?.[0];
    if (file) {
      const reader = new FileReader();
      reader.onloadend = () => {
        setContent({ ...content, [field]: reader.result as string });
      };
      reader.readAsDataURL(file);
    }
  };

  return (
    <div className="max-w-4xl space-y-8 animate-fade-in">
      <div className="flex justify-between items-center">
        <h3 className="text-2xl font-bold">Site Settings</h3>
        {saved && (
          <div className="bg-green-100 text-green-700 px-4 py-2 rounded-lg text-sm font-bold flex items-center gap-2">
            <span className="material-symbols-outlined text-sm">check_circle</span> Changes Saved
          </div>
        )}
      </div>

      <form onSubmit={handleSave} className="space-y-8">
        {/* Images Section */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">image</span> Media & Branding
          </h4>
          <div className="grid md:grid-cols-2 gap-12">
            <div className="space-y-4">
              <label className="block text-xs font-bold uppercase tracking-wider text-slate-500">Director's Portrait</label>
              <div className="relative group w-48 h-64 mx-auto">
                <img 
                  src={content.directorPhoto} 
                  className="w-full h-full object-cover rounded-xl border-4 border-slate-100 shadow-lg" 
                  alt="Director" 
                />
                <label className="absolute inset-0 bg-black/50 opacity-0 group-hover:opacity-100 transition-opacity flex flex-col items-center justify-center cursor-pointer rounded-xl text-white">
                  <span className="material-symbols-outlined text-3xl">upload_file</span>
                  <span className="text-xs font-bold mt-2">Change Image</span>
                  <input type="file" className="hidden" accept="image/*" onChange={(e) => handleImageUpload(e, 'directorPhoto')} />
                </label>
              </div>
            </div>
            <div className="space-y-6">
              <div>
                <label className="block text-xs font-bold uppercase mb-2">Director's Name</label>
                <input 
                  type="text" 
                  value={content.directorName}
                  onChange={e => setContent({...content, directorName: e.target.value})}
                  className="w-full rounded-lg border-slate-300 dark:bg-slate-900" 
                />
              </div>
              <p className="text-sm text-slate-400">
                Update the official photo and name of the director. This will reflect on the Homepage and Verify pages.
              </p>
            </div>
          </div>
        </div>

        {/* Content Section */}
        <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl border border-slate-200 shadow-sm">
          <h4 className="text-lg font-bold mb-6 flex items-center gap-2">
            <span className="material-symbols-outlined text-primary">article</span> Homepage Content
          </h4>
          <div className="space-y-6">
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Hero Title</label>
              <input 
                type="text" 
                value={content.heroTitle}
                onChange={e => setContent({...content, heroTitle: e.target.value})}
                className="w-full rounded-lg border-slate-300 dark:bg-slate-900" 
              />
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Hero Subtitle</label>
              <textarea 
                rows={2}
                value={content.heroSubtitle}
                onChange={e => setContent({...content, heroSubtitle: e.target.value})}
                className="w-full rounded-lg border-slate-300 dark:bg-slate-900" 
              ></textarea>
            </div>
            <div>
              <label className="block text-xs font-bold uppercase mb-2">Director's Message</label>
              <textarea 
                rows={4}
                value={content.directorMessage}
                onChange={e => setContent({...content, directorMessage: e.target.value})}
                className="w-full rounded-lg border-slate-300 dark:bg-slate-900 italic" 
              ></textarea>
            </div>
          </div>
        </div>

        <button className="bg-primary text-white px-8 py-4 rounded-xl font-bold shadow-lg hover:bg-blue-800 transition-all flex items-center gap-2">
          <span className="material-symbols-outlined">save</span> Save All Settings
        </button>
      </form>
    </div>
  );
};

export default AdminSettings;
