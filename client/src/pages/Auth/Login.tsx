// Login.tsx
// Authentication page for all user types

import { useState, type FormEvent, type ChangeEvent } from 'react';
import { Link } from 'react-router-dom';
import Button from '../Home/Button';
import Tag from '../Home/Tag';
import RevealOnScroll from '../Home/RevealOnScroll';

interface FormData {
  email: string;
  password: string;
  rememberMe: boolean;
}

interface FormErrors {
  email?: string;
  password?: string;
}

export default function Login() {
  const [formData, setFormData] = useState<FormData>({
    email: '',
    password: '',
    rememberMe: false,
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [isSubmitting, setIsSubmitting] = useState(false);

  const validateForm = (): boolean => {
    const newErrors: FormErrors = {};
    if (!formData.email.trim()) {
      newErrors.email = 'Email is required';
    } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(formData.email)) {
      newErrors.email = 'Please enter a valid email';
    }
    if (!formData.password) {
      newErrors.password = 'Password is required';
    }
    setErrors(newErrors);
    return Object.keys(newErrors).length === 0;
  };

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    if (validateForm()) {
      setIsSubmitting(true);
      setTimeout(() => {
        setIsSubmitting(false);
        alert('Login successful!');
      }, 1500);
    }
  };

  const handleChange = (e: ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
    if (errors[name as keyof FormErrors]) {
      setErrors(prev => ({ ...prev, [name]: undefined }));
    }
  };

  return (
    <div className="min-h-screen bg-paper text-ink pt-[54px]">
      {/* Header */}
      <header className="fixed top-0 left-0 right-0 z-[100] flex items-center justify-between h-[54px] border-b border-ink-15 bg-paper/90 backdrop-blur-[14px]">
        <Link to="/" className="font-serif text-[22px] tracking-[-0.02em] text-ink absolute left-1/2 -translate-x-1/2">
          Course<span className="text-red italic">Craft</span>
        </Link>
        <div className="flex items-center h-full ml-auto">
          <span className="font-mono text-[11px] uppercase tracking-[0.1em] px-[1.4rem] text-ink-45 hidden sm:block">
            New here?
          </span>
          <Link to="/signup">
            <Button variant="primary" style={{ height: '54px', borderRadius: 0 }}>
              Get started →
            </Button>
          </Link>
        </div>
      </header>

      {/* Main Content */}
      <main className="min-h-[calc(100vh-54px)] flex">
        {/* Left Side - Form */}
        <div className="flex-1 flex items-center justify-center p-6 sm:p-12">
          <div className="w-full max-w-[420px]">
            <RevealOnScroll instant>
              <Tag className="block mb-4">Welcome Back</Tag>
              <h1 className="font-serif text-[clamp(32px,5vw,48px)] leading-[1.05] tracking-[-0.03em] mb-3">
                Sign in to <em className="text-red">CourseCraft</em>
              </h1>
              <p className="text-[14px] text-ink-45 mb-8 leading-[1.6]">
                Continue your learning journey or manage your courses
              </p>
            </RevealOnScroll>

            {/* Social Login */}
            <RevealOnScroll delay={1}>
              <div className="grid grid-cols-2 gap-3 mb-6">
                <SocialButton icon="G">Google</SocialButton>
                <SocialButton icon="in">LinkedIn</SocialButton>
              </div>

              <div className="flex items-center gap-4 mb-6">
                <div className="flex-1 h-px bg-ink-15"></div>
                <span className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-30">or</span>
                <div className="flex-1 h-px bg-ink-15"></div>
              </div>
            </RevealOnScroll>

            {/* Form */}
            <RevealOnScroll delay={2}>
              <form onSubmit={handleSubmit} className="space-y-5">
                <FormInput
                  label="Email Address"
                  name="email"
                  type="email"
                  value={formData.email}
                  onChange={handleChange}
                  error={errors.email}
                  placeholder="john@example.com"
                />

                <div>
                  <div className="flex items-center justify-between mb-2">
                    <label className="font-mono text-[10px] uppercase tracking-[0.1em] text-ink-45">
                      [ Password ]
                    </label>
                    <Link to="/forgot-password" className="text-[11px] text-red hover:underline">
                      Forgot password?
                    </Link>
                  </div>
                  <input
                    type="password"
                    name="password"
                    value={formData.password}
                    onChange={handleChange}
                    placeholder="••••••••"
                    className={`w-full bg-transparent border-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-30 outline-none transition-colors duration-150 ${
                      errors.password ? 'border-red' : 'border-ink-15 hover:border-ink-30 focus:border-red'
                    }`}
                  />
                  {errors.password && (
                    <p className="text-red text-[11px] font-mono mt-1.5">{errors.password}</p>
                  )}
                </div>

                {/* Remember Me */}
                <div className="flex items-center gap-3">
                  <input
                    type="checkbox"
                    id="rememberMe"
                    name="rememberMe"
                    checked={formData.rememberMe}
                    onChange={handleChange}
                    className="w-4 h-4 accent-red"
                  />
                  <label htmlFor="rememberMe" className="text-[13px] text-ink-70">
                    Remember me for 30 days
                  </label>
                </div>

                {/* Submit Button */}
                <div className="pt-2">
                  <button
                    type="submit"
                    disabled={isSubmitting}
                    className="w-full font-mono text-[12px] tracking-[0.1em] uppercase bg-red text-white border-2 border-red px-6 py-4 transition-all duration-150 hover:bg-transparent hover:text-red disabled:opacity-50 disabled:cursor-not-allowed"
                  >
                    {isSubmitting ? 'Signing in...' : 'Sign In →'}
                  </button>
                </div>

                {/* Signup Link */}
                <p className="text-center text-[13px] text-ink-45 pt-4">
                  Don't have an account?{' '}
                  <Link to="/signup" className="text-red hover:underline">Create one</Link>
                </p>
              </form>
            </RevealOnScroll>
          </div>
        </div>

        {/* Right Side - Visual (hidden on mobile) */}
        <div className="hidden lg:flex flex-1 bg-ink relative overflow-hidden">
          <div className="absolute inset-0 opacity-20">
            <img
              src="https://images.unsplash.com/photo-1522202176988-66273c2fd55f?w=1200&q=80"
              alt="Learning"
              className="w-full h-full object-cover grayscale"
            />
          </div>
          <div className="relative z-10 flex flex-col justify-end p-12">
            <Tag className="block mb-4 text-paper-45">[ Success Story ]</Tag>
            <blockquote className="font-serif text-[28px] leading-[1.3] text-ink mb-6">
              "CourseCraft transformed my career. I went from zero coding knowledge to a full-time developer role in 6 months."
            </blockquote>
            <div className="flex items-center gap-4">
              <img
                src="https://images.unsplash.com/photo-1507003211169-0a1dd7228f2d?w=100&q=80"
                alt="User"
                className="w-12 h-12 rounded-full object-cover border-2 border-paper-20"
              />
              <div>
                <p className="font-mono text-[12px] uppercase tracking-[0.08em] text-ink">Marcus Chen</p>
                <p className="text-[12px] text-paper-40">Full-Stack Developer @ Stripe</p>
              </div>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
}

interface SocialButtonProps {
  icon: string;
  children: React.ReactNode;
}

function SocialButton({ icon, children }: SocialButtonProps) {
  const [hov, setHov] = useState(false);

  return (
    <button
      type="button"
      onMouseEnter={() => setHov(true)}
      onMouseLeave={() => setHov(false)}
      className={`flex items-center justify-center gap-2 px-4 py-3 border-2 font-mono text-[11px] uppercase tracking-[0.08em] transition-all duration-150 ${
        hov ? 'bg-ink text-paper border-ink' : 'bg-transparent text-ink border-ink-15'
      }`}
    >
      <span className="font-bold">{icon}</span>
      {children}
    </button>
  );
}

interface FormInputProps {
  label: string;
  name: string;
  type?: string;
  value: string;
  onChange: (e: ChangeEvent<HTMLInputElement>) => void;
  error?: string;
  placeholder: string;
}

function FormInput({ label, name, type = 'text', value, onChange, error, placeholder }: FormInputProps) {
  const [isFocused, setIsFocused] = useState(false);

  return (
    <div>
      <label className="block font-mono text-[10px] uppercase tracking-[0.1em] text-ink-45 mb-2">
        [ {label} ]
      </label>
      <input
        type={type}
        name={name}
        value={value}
        onChange={onChange}
        onFocus={() => setIsFocused(true)}
        onBlur={() => setIsFocused(false)}
        placeholder={placeholder}
        className={`w-full bg-transparent border-2 px-4 py-3 text-[15px] text-ink placeholder:text-ink-30 outline-none transition-colors duration-150 ${
          error
            ? 'border-red'
            : isFocused
            ? 'border-red'
            : 'border-ink-15 hover:border-ink-30'
        }`}
      />
      {error && (
        <p className="text-red text-[11px] font-mono mt-1.5">{error}</p>
      )}
    </div>
  );
}
