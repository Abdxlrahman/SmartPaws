'use client';
import React, { useState } from 'react';
import AppLayout from '@/components/AppLayout';
import { User, Mail, Phone, MapPin, Camera, Save, Shield, PawPrint } from 'lucide-react';

export default function ProfilePage() {
  const [saved, setSaved] = useState(false);
  const [form, setForm] = useState({
    name: 'Abdul Rahman',
    email: 'abdxlrahman03@gmail.com',
    phone: '+971 50 000 0000',
    location: 'Dubai',
    role: 'Pet Owner',
    bio: 'Proud parent of Lucifer 🐶 — Golden Retriever, 3 years old. Using SmartPaws to keep Lucifer healthy and happy!',
  });

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 800));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  return (
    <AppLayout activeRoute="/profile">
      <div className="space-y-6 fade-in max-w-3xl">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">My Profile</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Manage your personal information and account details</p>
        </div>

        {/* Avatar card */}
        <div className="glass-card rounded-2xl p-6 border border-border flex flex-col sm:flex-row items-center gap-6">
          <div className="relative flex-shrink-0">
            <div className="w-20 h-20 rounded-2xl bg-gradient-to-br from-primary to-accent flex items-center justify-center text-3xl">
              🐾
            </div>
            <button className="absolute -bottom-1 -right-1 w-7 h-7 rounded-full bg-primary flex items-center justify-center border-2 border-background hover:bg-primary/90 transition-colors">
              <Camera size={12} className="text-primary-foreground" />
            </button>
          </div>
          <div className="text-center sm:text-left">
            <h2 className="text-lg font-bold text-foreground">{form?.name}</h2>
            <p className="text-sm text-muted-foreground">{form?.email}</p>
            <div className="flex items-center gap-2 mt-2 justify-center sm:justify-start">
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-primary/15 text-primary text-xs font-semibold">
                <Shield size={11} /> {form?.role}
              </span>
              <span className="inline-flex items-center gap-1 px-2.5 py-1 rounded-full bg-accent/15 text-accent text-xs font-semibold">
                <PawPrint size={11} /> 1 Pet
              </span>
            </div>
          </div>
        </div>

        {/* Form */}
        <div className="glass-card rounded-2xl p-6 border border-border space-y-5">
          <h3 className="text-sm font-semibold text-foreground">Personal Information</h3>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">Full Name</label>
              <div className="relative">
                <User size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form?.name}
                  onChange={(e) => setForm({ ...form, name: e?.target?.value })}
                  className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">Email</label>
              <div className="relative">
                <Mail size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="email"
                  value={form?.email}
                  onChange={(e) => setForm({ ...form, email: e?.target?.value })}
                  className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">Phone</label>
              <div className="relative">
                <Phone size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="tel"
                  value={form?.phone}
                  onChange={(e) => setForm({ ...form, phone: e?.target?.value })}
                  className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
            <div>
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">Location</label>
              <div className="relative">
                <MapPin size={14} className="absolute left-3 top-1/2 -translate-y-1/2 text-muted-foreground" />
                <input
                  type="text"
                  value={form?.location}
                  onChange={(e) => setForm({ ...form, location: e?.target?.value })}
                  className="w-full bg-input border border-border rounded-xl pl-9 pr-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring"
                />
              </div>
            </div>
          </div>

          <div>
            <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest block mb-1.5">Bio</label>
            <textarea
              rows={3}
              value={form?.bio}
              onChange={(e) => setForm({ ...form, bio: e?.target?.value })}
              className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground focus:outline-none focus:ring-2 focus:ring-ring resize-none"
            />
          </div>

          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-press hover:bg-primary/90 transition-colors"
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Changes'}
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
