
import React, { useState } from 'react';
import { db } from '../services/dbService';

const ContactPage: React.FC = () => {
  const [formData, setFormData] = useState({ name: '', mobile: '', message: '' });
  const [submitted, setSubmitted] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    db.saveLead(formData);
    setSubmitted(true);
    setFormData({ name: '', mobile: '', message: '' });
  };

  return (
    <div className="py-20 animate-fade-in">
      <div className="container mx-auto px-4 max-w-5xl">
        <div className="grid md:grid-cols-2 gap-16">
          <div>
            <h2 className="text-4xl font-extrabold mb-8">Get In Touch</h2>
            <p className="text-slate-600 dark:text-slate-400 mb-12 leading-relaxed">
              Have questions about our courses or the verification process? 
              Fill out the form and our team will get back to you within 24 hours.
            </p>
            
            <div className="space-y-8">
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">location_on</span>
                </div>
                <div>
                  <h4 className="font-bold">Our Location</h4>
                  <p className="text-slate-500 text-sm">Sikariganj Road, Old UCO Bank, Uruwa Bazar, PIN - 273407</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">mail</span>
                </div>
                <div>
                  <h4 className="font-bold">Email Support</h4>
                  <p className="text-slate-500 text-sm">info@vkcomputer.edu.in</p>
                </div>
              </div>
              <div className="flex items-start gap-4">
                <div className="w-12 h-12 rounded-xl bg-primary/10 text-primary flex items-center justify-center flex-shrink-0">
                  <span className="material-symbols-outlined">phone</span>
                </div>
                <div>
                  <h4 className="font-bold">Phone</h4>
                  <p className="text-slate-500 text-sm">+91 9125914320</p>
                </div>
              </div>
            </div>
          </div>

          <div className="bg-white dark:bg-slate-800 p-8 rounded-2xl shadow-xl border border-slate-200 dark:border-slate-700">
            {submitted ? (
              <div className="text-center py-12">
                <div className="w-20 h-20 bg-green-100 text-green-600 rounded-full flex items-center justify-center mx-auto mb-6">
                  <span className="material-symbols-outlined text-4xl">check_circle</span>
                </div>
                <h3 className="text-2xl font-bold mb-2">Message Sent!</h3>
                <p className="text-slate-500 mb-8">Thank you for reaching out. We will contact you soon.</p>
                <button onClick={() => setSubmitted(false)} className="text-primary font-bold underline">Send another message</button>
              </div>
            ) : (
              <form onSubmit={handleSubmit} className="space-y-6">
                <div>
                  <label className="block text-sm font-semibold mb-2">Full Name</label>
                  <input 
                    type="text" 
                    value={formData.name}
                    onChange={(e) => setFormData({...formData, name: e.target.value})}
                    className="w-full rounded-xl border-slate-300 dark:bg-slate-900" 
                    placeholder="Enter your name" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Mobile Number</label>
                  <input 
                    type="tel" 
                    value={formData.mobile}
                    onChange={(e) => setFormData({...formData, mobile: e.target.value})}
                    className="w-full rounded-xl border-slate-300 dark:bg-slate-900" 
                    placeholder="+91 00000 00000" 
                    required 
                  />
                </div>
                <div>
                  <label className="block text-sm font-semibold mb-2">Your Message</label>
                  <textarea 
                    rows={4}
                    value={formData.message}
                    onChange={(e) => setFormData({...formData, message: e.target.value})}
                    className="w-full rounded-xl border-slate-300 dark:bg-slate-900" 
                    placeholder="How can we help you?" 
                    required
                  ></textarea>
                </div>
                <button className="w-full bg-primary hover:bg-blue-800 text-white font-bold py-4 rounded-xl transition-all shadow-lg flex items-center justify-center gap-2">
                  Send Message <span className="material-symbols-outlined">send</span>
                </button>
              </form>
            )}
          </div>
        </div>
      </div>
    </div>
  );
};

export default ContactPage;
