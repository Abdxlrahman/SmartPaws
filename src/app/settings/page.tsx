'use client';
import React, { useState, useEffect } from 'react';
import AppLayout from '@/components/AppLayout';
import { Bell, Moon, Shield, Wifi, Trash2, Save, ToggleLeft, ToggleRight, Send, Eye, EyeOff, CheckCircle2, XCircle } from 'lucide-react';
import { sendTelegramAlert } from '@/lib/telegramAlert';

interface ToggleRowProps {
  label: string;
  description: string;
  value: boolean;
  onChange: (v: boolean) => void;
}

function ToggleRow({ label, description, value, onChange }: ToggleRowProps) {
  return (
    <div className="flex items-center justify-between py-3 border-b border-border last:border-0">
      <div>
        <p className="text-sm font-medium text-foreground">{label}</p>
        <p className="text-xs text-muted-foreground mt-0.5">{description}</p>
      </div>
      <button
        onClick={() => onChange(!value)}
        className={`flex-shrink-0 transition-colors ${value ? 'text-primary' : 'text-muted-foreground'}`}
      >
        {value ? <ToggleRight size={28} /> : <ToggleLeft size={28} />}
      </button>
    </div>
  );
}

type TestStatus = 'idle' | 'loading' | 'success' | 'error';

export default function SettingsPage() {
  const [settings, setSettings] = useState({
    pushNotifications: true,
    emailAlerts: true,
    criticalOnly: false,
    nightMode: false,
    darkTheme: true,
    autoDispense: true,
    sensorSync: true,
    twoFactor: false,
    dataSharing: false,
  });

  const [saved, setSaved] = useState(false);

  // Telegram state
  const [tgToken, setTgToken] = useState('');
  const [tgChatId, setTgChatId] = useState('');
  const [showToken, setShowToken] = useState(false);
  const [testStatus, setTestStatus] = useState<TestStatus>('idle');
  const [testMessage, setTestMessage] = useState('');

  useEffect(() => {
    setTgToken(localStorage.getItem('tg_token') || '');
    setTgChatId(localStorage.getItem('tg_chatid') || '');
  }, []);

  const toggle = (key: keyof typeof settings) =>
    setSettings((prev) => ({ ...prev, [key]: !prev[key] }));

  const handleSave = async () => {
    await new Promise((r) => setTimeout(r, 700));
    setSaved(true);
    setTimeout(() => setSaved(false), 2500);
  };

  const handleLinkTelegram = async () => {
    if (!tgToken.trim() || !tgChatId.trim()) {
      setTestStatus('error');
      setTestMessage('Please enter both Bot Token and Chat ID.');
      setTimeout(() => setTestStatus('idle'), 3000);
      return;
    }
    localStorage.setItem('tg_token', tgToken.trim());
    localStorage.setItem('tg_chatid', tgChatId.trim());
    setTestStatus('loading');
    setTestMessage('');
    const ok = await sendTelegramAlert('SmartPaws Connection Successful! 🎉 Your alerts are now linked.');
    if (ok) {
      setTestStatus('success');
      setTestMessage('Telegram linked! Test message sent successfully.');
    } else {
      setTestStatus('error');
      setTestMessage('Failed to send test message. Check your Bot Token and Chat ID.');
    }
    setTimeout(() => setTestStatus('idle'), 4000);
  };

  return (
    <AppLayout activeRoute="/settings">
      <div className="space-y-6 fade-in max-w-2xl">
        {/* Header */}
        <div>
          <h1 className="text-xl font-bold text-foreground">Settings</h1>
          <p className="text-xs text-muted-foreground mt-0.5">Customize your SmartPaws experience</p>
        </div>

        {/* ── Telegram & Security Settings ── */}
        <div className="rounded-2xl p-6 border border-[#229ED9]/40 bg-[#229ED9]/5 relative overflow-hidden">
          {/* subtle glow */}
          <div className="absolute inset-0 pointer-events-none rounded-2xl" style={{ boxShadow: 'inset 0 0 40px rgba(34,158,217,0.07)' }} />
          <div className="flex items-center gap-2.5 mb-5">
            <div className="w-8 h-8 rounded-xl bg-[#229ED9]/15 flex items-center justify-center">
              <Send size={15} className="text-[#229ED9]" />
            </div>
            <div>
              <h3 className="text-sm font-semibold text-foreground">Telegram &amp; Security Settings</h3>
              <p className="text-xs text-muted-foreground mt-0.5">All app alerts &amp; notifications will be pushed via Telegram</p>
            </div>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3 mb-4">
            {/* Bot Token */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Bot Token</label>
              <div className="relative">
                <input
                  type={showToken ? 'text' : 'password'}
                  value={tgToken}
                  onChange={(e) => setTgToken(e.target.value)}
                  placeholder="110201543:AAHdqTcvCH1vGWJxfSeofSAs0K5PALDsaw"
                  className="w-full bg-background/60 border border-[#229ED9]/30 focus:border-[#229ED9] text-foreground placeholder:text-muted-foreground/40 text-sm rounded-xl px-4 py-3 pr-10 outline-none transition-colors"
                />
                <button
                  type="button"
                  onClick={() => setShowToken((v) => !v)}
                  className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                >
                  {showToken ? <EyeOff size={15} /> : <Eye size={15} />}
                </button>
              </div>
            </div>

            {/* Chat ID */}
            <div className="space-y-1.5">
              <label className="text-xs font-medium text-muted-foreground uppercase tracking-widest">Chat ID</label>
              <input
                type="text"
                value={tgChatId}
                onChange={(e) => setTgChatId(e.target.value)}
                placeholder="@IDBot or numeric chat ID"
                className="w-full bg-background/60 border border-[#229ED9]/30 focus:border-[#229ED9] text-foreground placeholder:text-muted-foreground/40 text-sm rounded-xl px-4 py-3 outline-none transition-colors"
              />
            </div>
          </div>

          {/* Link Button */}
          <button
            onClick={handleLinkTelegram}
            disabled={testStatus === 'loading'}
            className="w-full flex items-center justify-center gap-2 py-3 rounded-xl font-semibold text-sm text-white transition-all disabled:opacity-60"
            style={{ background: testStatus === 'loading' ? '#1a7aaa' : 'linear-gradient(135deg, #229ED9 0%, #1a7aaa 100%)' }}
          >
            {testStatus === 'loading' ? (
              <>
                <svg className="animate-spin w-4 h-4" viewBox="0 0 24 24" fill="none">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8v8z" />
                </svg>
                Linking…
              </>
            ) : (
              <>
                <Send size={15} />
                Link Telegram &amp; Test
              </>
            )}
          </button>

          {/* Feedback */}
          {testStatus === 'success' && (
            <div className="mt-3 flex items-center gap-2 text-xs text-positive bg-positive/10 border border-positive/20 rounded-xl px-4 py-2.5">
              <CheckCircle2 size={14} className="flex-shrink-0" />
              {testMessage}
            </div>
          )}
          {testStatus === 'error' && (
            <div className="mt-3 flex items-center gap-2 text-xs text-danger bg-danger/10 border border-danger/20 rounded-xl px-4 py-2.5">
              <XCircle size={14} className="flex-shrink-0" />
              {testMessage}
            </div>
          )}

          {/* Helper note */}
          <p className="mt-4 text-xs text-muted-foreground/60 leading-relaxed">
            Create a bot via <span className="text-[#229ED9]">@BotFather</span> on Telegram, then use <span className="text-[#229ED9]">@userinfobot</span> or <span className="text-[#229ED9]">@IDBot</span> to get your Chat ID. Credentials are stored locally in your browser.
          </p>
        </div>

        {/* Notifications */}
        <div className="glass-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Bell size={16} className="text-primary" />
            <h3 className="text-sm font-semibold text-foreground">Notifications</h3>
          </div>
          <ToggleRow label="Push Notifications" description="Receive real-time alerts on your device" value={settings.pushNotifications} onChange={() => toggle('pushNotifications')} />
          <ToggleRow label="Email Alerts" description="Get daily summaries and critical alerts via email" value={settings.emailAlerts} onChange={() => toggle('emailAlerts')} />
          <ToggleRow label="Critical Alerts Only" description="Only notify for urgent issues (low food, health flags)" value={settings.criticalOnly} onChange={() => toggle('criticalOnly')} />
        </div>

        {/* Appearance */}
        <div className="glass-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Moon size={16} className="text-accent" />
            <h3 className="text-sm font-semibold text-foreground">Appearance &amp; Behavior</h3>
          </div>
          <ToggleRow label="Night Mode" description="Silence all buzzer alerts during sleep hours (10pm–7am)" value={settings.nightMode} onChange={() => toggle('nightMode')} />
          <ToggleRow label="Dark Theme" description="Use dark color scheme across the app" value={settings.darkTheme} onChange={() => toggle('darkTheme')} />
          <ToggleRow label="Auto-Dispense" description="Allow AI to automatically dispense meals on schedule" value={settings.autoDispense} onChange={() => toggle('autoDispense')} />
        </div>

        {/* Device */}
        <div className="glass-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Wifi size={16} className="text-positive" />
            <h3 className="text-sm font-semibold text-foreground">Device &amp; Sensors</h3>
          </div>
          <ToggleRow label="Live Sensor Sync" description="Continuously sync hardware sensor data" value={settings.sensorSync} onChange={() => toggle('sensorSync')} />
          <div className="mt-3 pt-3 border-t border-border">
            <p className="text-xs font-medium text-muted-foreground uppercase tracking-widest mb-2">Connected Device</p>
            <div className="flex items-center justify-between">
              <div>
                <p className="text-sm font-medium text-foreground">SmartPaws Feeder v2.1</p>
                <p className="text-xs text-muted-foreground">ID: SP-2024-BLR-0042 · Firmware 3.2.1</p>
              </div>
              <span className="px-2.5 py-1 rounded-full bg-positive/15 text-positive text-xs font-semibold">Online</span>
            </div>
          </div>
        </div>

        {/* Security */}
        <div className="glass-card rounded-2xl p-6 border border-border">
          <div className="flex items-center gap-2 mb-4">
            <Shield size={16} className="text-warning" />
            <h3 className="text-sm font-semibold text-foreground">Security &amp; Privacy</h3>
          </div>
          <ToggleRow label="Two-Factor Authentication" description="Add an extra layer of security to your account" value={settings.twoFactor} onChange={() => toggle('twoFactor')} />
          <ToggleRow label="Anonymous Data Sharing" description="Help improve SmartPaws by sharing anonymized usage data" value={settings.dataSharing} onChange={() => toggle('dataSharing')} />
        </div>

        {/* Actions */}
        <div className="flex items-center gap-3">
          <button
            onClick={handleSave}
            className="flex items-center gap-2 px-5 py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-press hover:bg-primary/90 transition-colors"
          >
            <Save size={14} />
            {saved ? 'Saved!' : 'Save Settings'}
          </button>
          <button className="flex items-center gap-2 px-5 py-2.5 rounded-xl border border-danger/40 text-danger text-sm font-medium hover:bg-danger/10 transition-colors">
            <Trash2 size={14} />
            Reset to Defaults
          </button>
        </div>
      </div>
    </AppLayout>
  );
}
