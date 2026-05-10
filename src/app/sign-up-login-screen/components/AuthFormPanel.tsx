'use client';
import React, { useState } from 'react';
import { useForm } from 'react-hook-form';
import { Eye, EyeOff, Copy, Check } from 'lucide-react';
import { useRouter } from 'next/navigation';
import AppLogo from '@/components/ui/AppLogo';
import { toast } from 'sonner';

type Mode = 'login' | 'signup';
type Role = 'owner' | 'professional';

interface LoginFormData {
  email: string;
  password: string;
  remember: boolean;
}

const demoCredentials = [
  { role: 'owner' as Role, label: 'Pet Owner', email: 'kavitha@smartpaws.app', password: 'Biscuit@2026', redirect: '/pet-owner-dashboard' },
  { role: 'professional' as Role, label: 'Professional', email: 'dr.priya@smartpaws.app', password: 'VetPanel@2026', redirect: '/professional-admin-panel' },
];

export default function AuthFormPanel() {
  const [mode, setMode] = useState<Mode>('login');
  const [role, setRole] = useState<Role>('owner');
  const [showPassword, setShowPassword] = useState(false);
  const [loading, setLoading] = useState(false);
  const [copiedField, setCopiedField] = useState<string | null>(null);
  const router = useRouter();

  const {
    register,
    handleSubmit,
    setValue,
    setError,
    formState: { errors },
  } = useForm<LoginFormData>();

  const copyToClipboard = async (value: string, key: string) => {
    await navigator.clipboard.writeText(value);
    setCopiedField(key);
    setTimeout(() => setCopiedField(null), 2000);
  };

  const autofillCredentials = (cred: typeof demoCredentials[0]) => {
    setValue('email', cred.email);
    setValue('password', cred.password);
    setRole(cred.role);
    toast(`Demo credentials filled for ${cred.label}`);
  };

  const onSubmit = async (data: LoginFormData) => {
    setLoading(true);
    // Backend: POST /api/auth/login { email, password, role }
    await new Promise((r) => setTimeout(r, 1600));

    const match = demoCredentials.find(
      (c) => c.email === data.email && c.password === data.password
    );

    if (!match) {
      setLoading(false);
      setError('email', {
        message: 'Invalid credentials — use the demo accounts below to sign in',
      });
      return;
    }

    setLoading(false);
    toast.success(`Welcome back! Redirecting to your ${match.label} dashboard…`);
    await new Promise((r) => setTimeout(r, 800));
    router.push(match.redirect);
  };

  return (
    <div className="flex flex-col flex-1 items-center justify-center p-6 sm:p-10 overflow-y-auto scrollbar-thin">
      {/* Mobile logo */}
      <div className="flex items-center gap-2 mb-8 lg:hidden">
        <AppLogo size={36} />
        <span className="text-lg font-bold text-gradient-cyan">SmartPaws</span>
      </div>

      <div className="w-full max-w-sm space-y-6">
        {/* Mode toggle */}
        <div className="flex rounded-xl border border-border overflow-hidden">
          {(['login', 'signup'] as Mode[]).map((m) => (
            <button
              key={`mode-${m}`}
              onClick={() => setMode(m)}
              className={`flex-1 py-2.5 text-sm font-semibold transition-colors btn-press
                ${mode === m ? 'bg-primary text-primary-foreground' : 'text-muted-foreground hover:text-foreground hover:bg-muted/30'}`}
            >
              {m === 'login' ? 'Sign In' : 'Sign Up'}
            </button>
          ))}
        </div>

        <div>
          <h2 className="text-xl font-bold text-foreground">
            {mode === 'login' ? 'Welcome back' : 'Create your account'}
          </h2>
          <p className="text-xs text-muted-foreground mt-1">
            {mode === 'login' ? 'Sign in to your SmartPaws account' : 'Set up your SmartPaws account in 60 seconds'}
          </p>
        </div>

        {/* Role selector */}
        <div>
          <label className="text-xs font-medium uppercase tracking-widest text-muted-foreground block mb-2">
            I am a
          </label>
          <div className="flex gap-2">
            {(['owner', 'professional'] as Role[]).map((r) => (
              <button
                key={`role-${r}`}
                onClick={() => setRole(r)}
                className={`flex-1 py-2.5 px-3 rounded-xl text-sm font-semibold border transition-all btn-press
                  ${role === r
                    ? 'bg-primary/15 border-primary/50 text-primary' :'border-border text-muted-foreground hover:border-primary/30 hover:text-foreground'}`}
              >
                {r === 'owner' ? '🐾 Pet Owner' : '🩺 Professional'}
              </button>
            ))}
          </div>
        </div>

        <form onSubmit={handleSubmit(onSubmit)} className="space-y-4" noValidate>
          {/* Name field (signup only) */}
          {mode === 'signup' && (
            <div>
              <label htmlFor="name" className="text-xs font-medium text-muted-foreground block mb-1.5">
                Full Name
              </label>
              <input
                id="name"
                type="text"
                placeholder={role === 'professional' ? 'Dr. Priya Nair' : 'Kavitha Reddy'}
                className="w-full bg-input border border-border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors"
              />
            </div>
          )}

          {/* Email */}
          <div>
            <label htmlFor="email" className="text-xs font-medium text-muted-foreground block mb-1.5">
              Email address
            </label>
            <input
              id="email"
              type="email"
              autoComplete="email"
              placeholder={role === 'professional' ? 'dr.you@clinic.com' : 'you@example.com'}
              {...register('email', {
                required: 'Email is required',
                pattern: { value: /^\S+@\S+\.\S+$/, message: 'Enter a valid email address' },
              })}
              className={`w-full bg-input border rounded-xl px-3 py-2.5 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors
                ${errors.email ? 'border-danger' : 'border-border'}`}
            />
            {errors.email && (
              <p className="text-xs text-danger mt-1">{errors.email.message}</p>
            )}
          </div>

          {/* Password */}
          <div>
            <label htmlFor="password" className="text-xs font-medium text-muted-foreground block mb-1.5">
              Password
            </label>
            <div className="relative">
              <input
                id="password"
                type={showPassword ? 'text' : 'password'}
                autoComplete={mode === 'login' ? 'current-password' : 'new-password'}
                placeholder={mode === 'signup' ? 'Min. 8 characters' : '••••••••'}
                {...register('password', {
                  required: 'Password is required',
                  minLength: { value: 6, message: 'Password must be at least 6 characters' },
                })}
                className={`w-full bg-input border rounded-xl px-3 py-2.5 pr-10 text-sm text-foreground placeholder:text-muted-foreground focus:outline-none focus:ring-2 focus:ring-ring transition-colors
                  ${errors.password ? 'border-danger' : 'border-border'}`}
              />
              <button
                type="button"
                onClick={() => setShowPassword((p) => !p)}
                className="absolute right-3 top-1/2 -translate-y-1/2 text-muted-foreground hover:text-foreground transition-colors"
                aria-label={showPassword ? 'Hide password' : 'Show password'}
              >
                {showPassword ? <EyeOff size={14} /> : <Eye size={14} />}
              </button>
            </div>
            {errors.password && (
              <p className="text-xs text-danger mt-1">{errors.password.message}</p>
            )}
          </div>

          {/* Remember me (login only) */}
          {mode === 'login' && (
            <div className="flex items-center justify-between">
              <label className="flex items-center gap-2 text-xs text-muted-foreground cursor-pointer">
                <input
                  type="checkbox"
                  {...register('remember')}
                  className="w-3.5 h-3.5 rounded border-border accent-primary"
                />
                Remember me
              </label>
              <button type="button" className="text-xs text-primary hover:text-primary/80 transition-colors">
                Forgot password?
              </button>
            </div>
          )}

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full py-2.5 rounded-xl bg-primary text-primary-foreground text-sm font-semibold btn-press hover:bg-primary/90 transition-colors disabled:opacity-60 flex items-center justify-center gap-2"
          >
            {loading ? (
              <>
                <svg className="animate-spin w-4 h-4" fill="none" viewBox="0 0 24 24">
                  <circle className="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" strokeWidth="4" />
                  <path className="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.4 0 0 5.4 0 12h4z" />
                </svg>
                {mode === 'login' ? 'Signing in…' : 'Creating account…'}
              </>
            ) : (
              mode === 'login' ? 'Sign In' : 'Create Account'
            )}
          </button>

          {mode === 'signup' && (
            <p className="text-xs text-muted-foreground text-center">
              By signing up you agree to our{' '}
              <span className="text-primary cursor-pointer hover:underline">Terms of Service</span>
              {' '}and{' '}
              <span className="text-primary cursor-pointer hover:underline">Privacy Policy</span>
            </p>
          )}
        </form>

        {/* Demo credentials */}
        <div className="glass-card rounded-xl border-primary/20 overflow-hidden">
          <div className="px-3 py-2 border-b border-border bg-primary/5">
            <p className="text-xs font-semibold text-primary">Demo Accounts — Click to autofill</p>
          </div>
          <div className="divide-y divide-border">
            {demoCredentials.map((cred) => (
              <div key={`cred-${cred.role}`} className="flex items-center justify-between px-3 py-2.5 hover:bg-muted/20 transition-colors">
                <div className="flex-1 min-w-0">
                  <p className="text-xs font-semibold text-foreground">{cred.label}</p>
                  <p className="text-xs text-muted-foreground truncate">{cred.email}</p>
                </div>
                <div className="flex items-center gap-1.5 flex-shrink-0 ml-2">
                  <button
                    type="button"
                    onClick={() => copyToClipboard(cred.password, `${cred.role}-pw`)}
                    className="p-1.5 rounded-lg hover:bg-muted transition-colors text-muted-foreground hover:text-foreground"
                    title="Copy password"
                  >
                    {copiedField === `${cred.role}-pw` ? <Check size={12} className="text-positive" /> : <Copy size={12} />}
                  </button>
                  <button
                    type="button"
                    onClick={() => autofillCredentials(cred)}
                    className="px-2.5 py-1 rounded-lg bg-primary/10 text-primary text-xs font-semibold hover:bg-primary/20 transition-colors btn-press"
                  >
                    Use
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        <p className="text-xs text-center text-muted-foreground">
          {mode === 'login' ? "Don't have an account? " : 'Already have an account? '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'signup' : 'login')}
            className="text-primary hover:text-primary/80 font-semibold transition-colors"
          >
            {mode === 'login' ? 'Sign Up' : 'Sign In'}
          </button>
        </p>
      </div>
    </div>
  );
}